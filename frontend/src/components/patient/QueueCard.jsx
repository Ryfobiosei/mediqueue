export default function QueueCard({ appointment }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="font-semibold text-gray-800">Queue #{appointment.queuePosition}</p>
                    <p className="text-xs text-gray-500">{appointment.date} at {appointment.time}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    {appointment.status}
                </span>
            </div>
            <p className="text-sm text-gray-600">{appointment.reason}</p>
        </div>
    );
}
