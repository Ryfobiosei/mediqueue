import { useState, useEffect } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import AppointmentTable from "../../components/admin/AppointmentTable";
import { FiArrowLeft, FiLogOut, FiFilter } from "react-icons/fi";

export default function AppointmentList() {
    const { appointments, loading, fetchAppointments, updateAppointment } = useAppointments();
    const { logout } = useAuth();
    const [filter, setFilter] = useState("confirmed");

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const filteredAppointments = appointments.filter((apt) => apt.status === filter);

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    if (loading) return <Spinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-2">Appointment Management</h1>
                        <p className="text-blue-100">Manage and track all patient appointments</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition transform hover:scale-105">
                            <FiArrowLeft size={18} />
                            <a href="/admin" className="contents">Back to Dashboard</a>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-400/50 text-red-200 px-6 py-3 rounded-xl transition transform hover:scale-105"
                        >
                            <FiLogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Filter */}
                <div className="mb-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FiFilter size={20} className="text-cyan-400" />
                        <h2 className="text-lg font-semibold text-white">Filter by Status</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["confirmed", "pending", "cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2 rounded-lg font-medium transition transform hover:scale-105 ${filter === status
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                                        : "bg-white/10 text-blue-100 border border-white/20 hover:bg-white/20"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)} ({appointments.filter((a) => a.status === status).length})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appointments Table */}
                {filteredAppointments.length > 0 ? (
                    <AppointmentTable
                        appointments={filteredAppointments}
                        onStatusChange={() => fetchAppointments()}
                        onUpdate={updateAppointment}
                    />
                ) : (
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-12 text-center">
                        <p className="text-blue-100 text-lg">No {filter} appointments found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
