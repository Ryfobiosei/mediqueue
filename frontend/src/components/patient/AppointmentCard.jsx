import { FiTrash2, FiCheckCircle, FiClock } from "react-icons/fi";
import { appointmentService } from "../../services/appointmentService";
import { useState } from "react";

export default function AppointmentCard({ appointment, onStatusChange }) {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            setLoading(true);
            try {
                await appointmentService.cancelAppointment(appointment.id);
                onStatusChange();
            } catch (error) {
                alert("Failed to cancel appointment: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const statusColors = {
        confirmed: "bg-green-50 border-green-200 text-green-700",
        pending: "bg-yellow-50 border-yellow-200 text-yellow-700",
        cancelled: "bg-red-50 border-red-200 text-red-700",
    };

    return (
        <div className={`rounded-lg border-l-4 p-6 ${statusColors[appointment.status] || statusColors.pending}`}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-lg font-semibold">Dr. [Doctor Name]</h3>
                    <p className="text-sm opacity-75">Appointment #{appointment.id.substring(0, 8)}</p>
                </div>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
                    {appointment.status.toUpperCase()}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2">
                    <span>📅</span> {appointment.date}
                </p>
                <p className="flex items-center gap-2">
                    <span>⏰</span> {appointment.time}
                </p>
                {appointment.queuePosition && (
                    <p className="flex items-center gap-2">
                        <FiClock /> Queue Position: {appointment.queuePosition}
                    </p>
                )}
                <p className="flex items-center gap-2">
                    <span>📝</span> Reason: {appointment.reason}
                </p>
            </div>

            {appointment.status !== "cancelled" && (
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-white text-red-600 py-2 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                >
                    <FiTrash2 /> {loading ? "Cancelling..." : "Cancel Appointment"}
                </button>
            )}
        </div>
    );
}
