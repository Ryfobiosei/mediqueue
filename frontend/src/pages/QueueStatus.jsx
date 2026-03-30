import { useState, useEffect } from "react";
import { queueService } from "../services/queueService";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/common/Spinner";

export default function QueueStatus() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [statsData, notificationsData] = await Promise.all([
                    queueService.getStats(),
                    queueService.getNotifications(user?.id),
                ]);
                setStats(statsData);
                setNotifications(notificationsData || []);
            } catch (error) {
                console.error("Failed to fetch queue status:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchStats();
            const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
            return () => clearInterval(interval);
        }
    }, [user?.id]);

    if (loading) return <Spinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Queue Status</h1>

                {/* Overall Stats */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm">Total Bookings</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalBookings}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm">Confirmed</p>
                            <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm">Cancelled</p>
                            <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                        </div>
                    </div>
                )}

                {/* Notifications */}
                <div className="bg-white rounded-lg shadow p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Notifications</h2>
                    {notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-lg border-l-4 ${notification.read ? "bg-gray-50 border-gray-300" : "bg-blue-50 border-blue-500"
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-800">{notification.message}</p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(notification.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No notifications yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
