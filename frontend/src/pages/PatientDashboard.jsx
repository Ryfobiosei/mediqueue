import { useState, useEffect } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import AppointmentCard from "../components/patient/AppointmentCard";

export default function PatientDashboard() {
    const { appointments, loading, fetchAppointments } = useAppointments();
    const { user, logout } = useAuth();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (user?.id) {
            fetchAppointments({ patientId: user.id });
        }
    }, [user?.id, fetchAppointments]);

    const filteredAppointments = appointments.filter((apt) => {
        if (filter === "all") return true;
        return apt.status === filter;
    });

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    if (loading) return <Spinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
                        <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button to="/booking" title="Book New Appointment" />
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Total Appointments</p>
                        <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Confirmed</p>
                        <p className="text-2xl font-bold text-green-600">
                            {appointments.filter((a) => a.status === "confirmed").length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {appointments.filter((a) => a.status === "pending").length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Cancelled</p>
                        <p className="text-2xl font-bold text-red-600">
                            {appointments.filter((a) => a.status === "cancelled").length}
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <div className="mb-6 flex gap-2">
                    {["all", "confirmed", "pending", "cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Appointments List */}
                {filteredAppointments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAppointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onStatusChange={() => fetchAppointments({ patientId: user.id })}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600 mb-4">No {filter !== "all" ? filter : ""} appointments found</p>
                        <Button to="/booking" title="Book Your First Appointment" />
                    </div>
                )}
            </div>
        </div>
    );
}
