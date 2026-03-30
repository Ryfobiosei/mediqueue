import { useState, useEffect } from "react";
import { queueService } from "../../services/queueService";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import ScheduleManager from "../../components/admin/ScheduleManager";
import { FiArrowLeft, FiLogOut, FiUser } from "react-icons/fi";

export default function DoctorSchedule() {
    const { logout } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const data = await queueService.getDoctors();
                setDoctors(data || []);
                if (data && data.length > 0) {
                    setSelectedDoctor(data[0]);
                }
            } catch (error) {
                console.error("Failed to load doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

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

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-2">Doctor Schedule Management</h1>
                        <p className="text-blue-100">Manage doctor availability and time slots</p>
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

                {/* Doctor Selection Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                    <label className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <FiUser size={20} className="text-cyan-400" />
                        Select Doctor
                    </label>
                    <select
                        value={selectedDoctor?.id || ""}
                        onChange={(e) => setSelectedDoctor(doctors.find((d) => d.id === e.target.value))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition backdrop-blur-sm"
                    >
                        <option value="" className="bg-slate-900">Choose a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id} className="bg-slate-900">
                                👨‍⚕️ {doctor.name} - {doctor.specialty}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Schedule Manager */}
                {selectedDoctor && <ScheduleManager doctor={selectedDoctor} />}
            </div>
        </div>
    );
}
