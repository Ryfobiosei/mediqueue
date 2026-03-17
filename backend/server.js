const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper to write DB
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// --- API ROUTES ---

// 1. Auth
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await readDB();
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, token: `mock-jwt-${user.role}` });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 2. Doctors
app.get('/api/doctors', async (req, res) => {
  const db = await readDB();
  res.json(db.doctors);
});

// 3. Appointments
app.get('/api/appointments', async (req, res) => {
  const db = await readDB();
  let appointments = db.appointments;
  if (req.query.patientId) appointments = appointments.filter(a => a.patientId === req.query.patientId);
  if (req.query.doctorId) appointments = appointments.filter(a => a.doctorId === req.query.doctorId);
  if (req.query.date) appointments = appointments.filter(a => a.date === req.query.date);
  res.json(appointments);
});

// 4. Smart Booking
app.post('/api/appointments', async (req, res) => {
  const { doctorId, date, time, patientId, reason } = req.body;
  const db = await readDB();

  // Conflict Prevention
  const conflict = db.appointments.find(a => a.doctorId === doctorId && a.date === date && a.time === time && a.status === 'confirmed');
  if (conflict) {
    return res.status(400).json({ message: 'Doctor is already booked for this slot.' });
  }

  // Auto Queue
  const dailyQueue = db.appointments.filter(a => a.doctorId === doctorId && a.date === date);
  const newAppointment = {
    id: 'a' + Date.now(),
    patientId,
    doctorId,
    date,
    time,
    reason,
    status: 'confirmed',
    queuePosition: dailyQueue.length + 1
  };

  db.appointments.push(newAppointment);

  // Auto Notification
  const doctor = db.doctors.find(d => d.id === doctorId);
  db.notifications.push({
    id: 'n' + Date.now(),
    userId: patientId,
    message: `Appointment confirmed with ${doctor.name} on ${date} at ${time}. Queue #${newAppointment.queuePosition}`,
    read: false,
    timestamp: new Date().toISOString()
  });

  await writeDB(db);
  res.status(201).json(newAppointment);
});

// 5. Update Appointment (Cancel/Confirm)
app.patch('/api/appointments/:id', async (req, res) => {
  const db = await readDB();
  const index = db.appointments.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    db.appointments[index] = { ...db.appointments[index], ...req.body };
    await writeDB(db);
    res.json(db.appointments[index]);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

// 6. Stats
app.get('/api/stats', async (req, res) => {
  const db = await readDB();
  const appointments = db.appointments;
  res.json({
    totalBookings: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  });
});

// 7. Notifications
app.get('/api/notifications', async (req, res) => {
  const db = await readDB();
  const userNotifications = db.notifications.filter(n => n.userId === req.query.userId);
  res.json(userNotifications);
});

app.listen(port, () => {
  console.log(`MediQueue Backend running on http://localhost:${port}`);
});
