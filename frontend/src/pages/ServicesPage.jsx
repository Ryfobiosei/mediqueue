import { FiClock, FiShield, FiBarChart2, FiBell, FiCheckCircle, FiSmartphone } from "react-icons/fi";

export default function ServicesPage() {
    const services = [
        {
            icon: FiClock,
            title: "Easy Appointment Booking",
            description: "Book medical appointments in seconds with our intuitive interface. Select your doctor, choose your preferred date and time, and confirm instantly.",
            color: "blue"
        },
        {
            icon: FiShield,
            title: "Secure Data Management",
            description: "Your health information is encrypted and protected. We comply with HIPAA standards and maintain the highest security protocols.",
            color: "cyan"
        },
        {
            icon: FiBarChart2,
            title: "Queue Management",
            description: "Real-time queue status updates help you plan your visit. Know exactly where you are in the queue and estimated wait times.",
            color: "purple"
        },
        {
            icon: FiBell,
            title: "Smart Notifications",
            description: "Receive appointment reminders, confirmations, and updates directly to your device. Never miss an appointment again.",
            color: "green"
        },
        {
            icon: FiCheckCircle,
            title: "Schedule Management",
            description: "Healthcare providers can efficiently manage doctor schedules, availability slots, and patient appointments all in one platform.",
            color: "orange"
        },
        {
            icon: FiSmartphone,
            title: "Mobile Friendly",
            description: "Access MediQueue anytime, anywhere. Our responsive design works seamlessly on all devices - desktop, tablet, and mobile.",
            color: "pink"
        }
    ];

    const colorMap = {
        blue: { bg: "from-blue-500/20 to-blue-400/20", border: "border-blue-400/50", text: "text-blue-400" },
        cyan: { bg: "from-cyan-500/20 to-cyan-400/20", border: "border-cyan-400/50", text: "text-cyan-400" },
        purple: { bg: "from-purple-500/20 to-purple-400/20", border: "border-purple-400/50", text: "text-purple-400" },
        green: { bg: "from-green-500/20 to-green-400/20", border: "border-green-400/50", text: "text-green-400" },
        orange: { bg: "from-orange-500/20 to-orange-400/20", border: "border-orange-400/50", text: "text-orange-400" },
        pink: { bg: "from-pink-500/20 to-pink-400/20", border: "border-pink-400/50", text: "text-pink-400" }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full px-4 py-2 mb-4">
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Our Services</p>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">What We Offer</h1>
                    <p className="text-xl text-blue-100">Comprehensive healthcare appointment management solutions</p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {services.map((service, idx) => {
                        const Icon = service.icon;
                        const colors = colorMap[service.color];
                        return (
                            <div key={idx} className={`bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-2xl shadow-xl p-8 border ${colors.border}`}>
                                <Icon size={32} className={`${colors.text} mb-4`} />
                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-blue-100">{service.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Features Section */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose MediQueue?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <p className="font-semibold text-white mb-1">Fast & Efficient</p>
                                <p className="text-blue-100">Reduce patient wait times and improve clinic efficiency</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <p className="font-semibold text-white mb-1">User-Friendly</p>
                                <p className="text-blue-100">Intuitive design that requires minimal training</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <p className="font-semibold text-white mb-1">24/7 Availability</p>
                                <p className="text-blue-100">Access anytime, anywhere from any device</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <p className="font-semibold text-white mb-1">Secure & Compliant</p>
                                <p className="text-blue-100">Enterprise-grade security for patient data</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
