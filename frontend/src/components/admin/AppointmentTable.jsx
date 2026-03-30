import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export default function AppointmentTable({ appointments, onStatusChange, onUpdate }) {
    const [updating, setUpdating] = useState(null);

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        setUpdating(appointmentId);
        try {
            await onUpdate(appointmentId, { status: newStatus });
            onStatusChange();
        } catch (error) {
            alert("Failed to update appointment");
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Appointment ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Patient ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Doctor ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Reason
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Queue Position
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {appointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 text-sm text-gray-800 font-mono">
                                    {apt.id.substring(0, 8)}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600 font-mono">
                                    {apt.patientId.substring(0, 8)}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600 font-mono">
                                    {apt.doctorId.substring(0, 8)}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-800">
                                    {apt.date} {apt.time}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600 max-w-xs truncate">
                                    {apt.reason}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-800">
                                    {apt.queuePosition || "-"}
                                </td>
                                <td className="px-6 py-3 text-sm space-x-2 flex">
                                    {apt.status !== "cancelled" && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(apt.id, "confirmed")}
                                                disabled={updating === apt.id || apt.status === "confirmed"}
                                                className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded hover:bg-green-100 disabled:opacity-50 transition"
                                                title="Confirm"
                                            >
                                                <FiCheck size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(apt.id, "cancelled")}
                                                disabled={updating === apt.id}
                                                className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 disabled:opacity-50 transition"
                                                title="Cancel"
                                            >
                                                <FiX size={16} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
