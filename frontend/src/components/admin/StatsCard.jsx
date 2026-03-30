export default function StatsCard({ title, value, color }) {
    const colorVariants = {
        blue: {
            bg: "from-blue-500/20 to-blue-400/20",
            border: "border-blue-400/50",
            text: "text-blue-300",
            label: "text-blue-100",
        },
        green: {
            bg: "from-green-500/20 to-green-400/20",
            border: "border-green-400/50",
            text: "text-green-300",
            label: "text-green-100",
        },
        yellow: {
            bg: "from-yellow-500/20 to-yellow-400/20",
            border: "border-yellow-400/50",
            text: "text-yellow-300",
            label: "text-yellow-100",
        },
        red: {
            bg: "from-red-500/20 to-red-400/20",
            border: "border-red-400/50",
            text: "text-red-300",
            label: "text-red-100",
        },
    };

    const variant = colorVariants[color] || colorVariants.blue;

    return (
        <div className={`bg-gradient-to-br ${variant.bg} backdrop-blur-xl rounded-2xl shadow-xl p-6 border ${variant.border}`}>
            <p className="text-blue-100 text-sm font-medium">{title}</p>
            <p className={`text-4xl font-bold mt-3 ${variant.text}`}>
                {value}
            </p>
        </div>
    );
}
