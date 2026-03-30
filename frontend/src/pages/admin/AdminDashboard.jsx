import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { queueService } from "../../services/queueService";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import StatsCard from "../../components/admin/StatsCard";
import { FiLogOut, FiCheckCircle, FiClock, FiSettings, FiEye } from "react-icons/fi";

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await queueService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    if (loading && !stats) return <Spinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
                            <p className="text-xl text-blue-100">Welcome back, <span className="font-semibold text-cyan-300">{user?.name}</span></p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-400/50 text-red-200 px-6 py-3 rounded-xl transition transform hover:scale-105"
                        >
                            <FiLogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <StatsCard title="Total Bookings" value={stats.totalBookings} color="blue" />
                        <StatsCard title="Confirmed" value={stats.confirmed} color="green" />
                        <StatsCard title="Pending" value={stats.pending} color="yellow" />
                        <StatsCard title="Cancelled" value={stats.cancelled} color="red" />
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <FiSettings size={24} className="text-cyan-400" />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="group bg-gradient-to-br from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/50 text-white font-semibold py-4 px-6 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2">
                            <FiCheckCircle size={20} className="text-blue-400" />
                            <a href="/admin/appointments" className="contents">
                                Manage Appointments
                            </a>
                        </button>
                        <button className="group bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/50 text-white font-semibold py-4 px-6 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2">
                            <FiClock size={20} className="text-purple-400" />
                            <a href="/admin/schedule" className="contents">
                                Doctor Schedule
                            </a>
                        </button>
                        <button className="group bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-400/50 text-white font-semibold py-4 px-6 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2">
                            <FiEye size={20} className="text-green-400" />
                            <a href="/queue" className="contents">
                                View Queue Status
                            </a>
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-blue-100">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <p>System is running normally</p>
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <p>Last refresh: {new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <p>For more details, check the Appointments or Schedule sections</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
