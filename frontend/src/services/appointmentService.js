import api from "./api";

export const appointmentService = {
  getAllAppointments: async (filters = {}) => {
    let endpoint = "/appointments";
    const params = new URLSearchParams();
    
    if (filters.patientId) params.append("patientId", filters.patientId);
    if (filters.doctorId) params.append("doctorId", filters.doctorId);
    if (filters.date) params.append("date", filters.date);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return api.get(endpoint);
  },

  getPatientAppointments: async (patientId) => {
    return appointmentService.getAllAppointments({ patientId });
  },

  getDoctorAppointments: async (doctorId) => {
    return appointmentService.getAllAppointments({ doctorId });
  },

  createAppointment: async (appointmentData) => {
    return api.post("/appointments", appointmentData);
  },

  updateAppointment: async (appointmentId, updates) => {
    return api.patch(`/appointments/${appointmentId}`, updates);
  },

  cancelAppointment: async (appointmentId) => {
    return appointmentService.updateAppointment(appointmentId, { status: "cancelled" });
  },

  confirmAppointment: async (appointmentId) => {
    return appointmentService.updateAppointment(appointmentId, { status: "confirmed" });
  },
};
