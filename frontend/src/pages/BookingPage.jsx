import { useState, useEffect } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { useAuth } from "../hooks/useAuth";
import { queueService } from "../services/queueService";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import { FiUser, FiCalendar, FiClock, FiFileText, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function BookingPage() {
    const { createAppointment, loading: appointmentLoading } = useAppointments();
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        doctorId: "",
        date: "",
        time: "",
        reason: "",
    });
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const data = await queueService.getDoctors();
                setDoctors(data || []);
            } catch (err) {
                setError("Failed to load doctors");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);
    const availableSlots =
        selectedDoctor?.availability?.find((a) => a.day === getDayName(formData.date))?.slots || [];

    function getDayName(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getDay()];
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.doctorId || !formData.date || !formData.time || !formData.reason) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await createAppointment({
                patientId: user.id,
                doctorId: formData.doctorId,
                date: formData.date,
                time: formData.time,
                reason: formData.reason,
            });
            setSuccess("Appointment booked successfully!");
            setFormData({ doctorId: "", date: "", time: "", reason: "" });
            setTimeout(() => window.location.href = "/dashboard", 2000);
        } catch (err) {
            setError(err.message || "Failed to book appointment");
        }
    };

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split("T")[0];
    };

    if (loading) return <Spinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full px-4 py-2 mb-4">
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Schedule Your Visit</p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Book Your Appointment</h1>
                    <p className="text-lg text-blue-100">Quick, easy, and secure. Get expert medical care on your schedule.</p>
                </div>

                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20">
                    {/* Progress Steps */}
                    <div className="mb-8 flex items-center justify-between">
                        {[
                            { num: 1, label: "Doctor", icon: FiUser },
                            { num: 2, label: "Date & Time", icon: FiCalendar },
                            { num: 3, label: "Details", icon: FiFileText },
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1 relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold text-sm transition ${(step.num <= (formData.doctorId ? 1 : 0) ? "bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900" : "bg-white/20 text-white")
                                    }`}>
                                    {step.num}
                                </div>
                                <span className="text-xs text-blue-100 hidden sm:block">{step.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3">
                            <FiAlertCircle size={20} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Alert */}
                    {success && (
                        <div className="mb-6 bg-green-500/20 border border-green-400/50 text-green-200 px-4 py-3 rounded-xl flex items-center gap-3">
                            <FiCheckCircle size={20} className="flex-shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Doctor Selection */}
                        <div>
                            <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <FiUser size={18} className="text-blue-400" />
                                Select Doctor
                            </label>
                            <select
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition backdrop-blur-sm"
                                required
                            >
                                <option value="" className="bg-slate-900">Select a doctor...</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id} className="bg-slate-900">
                                        👨‍⚕️ {doctor.name} - {doctor.specialty}
                                    </option>
                                ))}
                            </select>
                            {formData.doctorId && selectedDoctor && (
                                <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                                    <p className="text-sm text-blue-100">✓ Selected: <span className="font-semibold">{selectedDoctor.name}</span></p>
                                </div>
                            )}
                        </div>

                        {/* Date Selection */}
                        <div>
                            <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <FiCalendar size={18} className="text-cyan-400" />
                                Select Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={getMinDate()}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition backdrop-blur-sm"
                                required
                            />
                            {formData.date && (
                                <p className="mt-2 text-sm text-cyan-100">✓ {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            )}
                        </div>

                        {/* Time Slot Selection */}
                        {formData.date && (
                            <div>
                                <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                    <FiClock size={18} className="text-purple-400" />
                                    Select Time ({getDayName(formData.date)})
                                </label>
                                {availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                        {availableSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setFormData((prev) => ({ ...prev, time: slot }))}
                                                className={`py-2 px-3 rounded-lg font-medium text-sm transition transform hover:scale-105 ${formData.time === slot
                                                    ? "bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 shadow-lg shadow-blue-400/50"
                                                    : "bg-white/10 text-blue-100 border border-white/20 hover:bg-white/20 hover:border-white/40"
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-blue-100 text-center py-4">No available slots for this date. Please try another date.</p>
                                )}
                            </div>
                        )}

                        {/* Reason */}
                        <div>
                            <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <FiFileText size={18} className="text-orange-400" />
                                Reason for Visit
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Describe your symptoms or reason for the visit..."
                                rows="4"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition backdrop-blur-sm resize-none"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={appointmentLoading}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 shadow-lg shadow-blue-500/50 disabled:shadow-none"
                            >
                                {appointmentLoading ? "Booking..." : "Confirm Appointment"}
                            </button>
                            <Button
                                to="/dashboard"
                                title="Cancel"
                                className="flex-1 bg-white/10 border border-white/20 text-white hover:bg-white/20"
                            />
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-blue-100 text-sm text-center">
                        ℹ️ Your appointment will be confirmed immediately. You'll receive a confirmation email shortly.
                    </p>
                </div>
            </div>
        </div>
    );
}
