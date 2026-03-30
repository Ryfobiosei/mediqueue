export default function ScheduleManager({ doctor }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Schedule: {doctor.name}
            </h2>

            <div className="space-y-6">
                {doctor.availability && doctor.availability.map((schedule) => (
                    <div key={schedule.day} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-700 mb-3">{schedule.day}</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {schedule.slots.map((slot) => (
                                <div
                                    key={slot}
                                    className="bg-blue-50 border border-blue-200 p-2 rounded text-center text-sm font-medium text-blue-700"
                                >
                                    {slot}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                    💡 Tip: To modify schedules, contact the system administrator or implement a schedule management interface.
                </p>
            </div>
        </div>
    );
}
