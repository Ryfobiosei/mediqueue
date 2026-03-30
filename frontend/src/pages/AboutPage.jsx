import { FiTarget, FiAward, FiUsers, FiHeart } from "react-icons/fi";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full px-4 py-2 mb-4">
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">About Us</p>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">MediQueue</h1>
                    <p className="text-xl text-blue-100">Revolutionizing Healthcare Appointment Management</p>
                </div>

                {/* Mission Section */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 mb-12 border border-white/20">
                    <div className="flex gap-6 items-start">
                        <FiTarget size={40} className="text-cyan-400 flex-shrink-0 mt-2" />
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-3">Our Mission</h2>
                            <p className="text-blue-100 leading-relaxed">
                                At MediQueue, we're dedicated to streamlining the healthcare appointment experience. Our platform helps patients book appointments effortlessly and enables healthcare providers to manage their schedules efficiently, reducing wait times and improving patient satisfaction.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 mb-12 border border-white/20">
                    <div className="flex gap-6 items-start">
                        <FiAward size={40} className="text-green-400 flex-shrink-0 mt-2" />
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-3">Our Vision</h2>
                            <p className="text-blue-100 leading-relaxed">
                                We envision a world where quality healthcare is accessible to everyone, with minimal friction in the appointment booking process. By leveraging modern technology, we aim to create a seamless bridge between patients and healthcare providers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-400/20 backdrop-blur-xl rounded-2xl p-8 border border-blue-400/50">
                            <FiUsers size={30} className="text-blue-400 mb-3" />
                            <h3 className="text-xl font-bold text-white mb-2">Patient-Centric</h3>
                            <p className="text-blue-100">We prioritize user experience and make healthcare accessible to everyone.</p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/50">
                            <FiHeart size={30} className="text-cyan-400 mb-3" />
                            <h3 className="text-xl font-bold text-white mb-2">Reliability</h3>
                            <p className="text-blue-100">Trust is paramount. We ensure our platform is secure and always available.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-400/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-400/50">
                            <FiTarget size={30} className="text-purple-400 mb-3" />
                            <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                            <p className="text-blue-100">We continuously improve our platform to meet evolving healthcare needs.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-green-400/20 backdrop-blur-xl rounded-2xl p-8 border border-green-400/50">
                            <FiAward size={30} className="text-green-400 mb-3" />
                            <h3 className="text-xl font-bold text-white mb-2">Integrity</h3>
                            <p className="text-blue-100">We maintain the highest standards of data privacy and ethical practices.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                    <p className="text-blue-100 text-lg">
                        Ready to experience better healthcare management? <span className="font-semibold text-cyan-300">Join us today</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
