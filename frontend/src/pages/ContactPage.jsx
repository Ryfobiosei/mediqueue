import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
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
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Get In Touch</p>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-xl text-blue-100">Have questions? We'd love to hear from you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Info Cards */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                <FiMail size={24} className="text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Email</h3>
                        </div>
                        <p className="text-blue-100">support@mediqueue.com</p>
                        <p className="text-blue-100 text-sm mt-2">We'll respond within 24 hours</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-cyan-500/20 p-3 rounded-lg">
                                <FiPhone size={24} className="text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Phone</h3>
                        </div>
                        <p className="text-blue-100">+1 (555) 123-4567</p>
                        <p className="text-blue-100 text-sm mt-2">Monday - Friday, 9AM - 6PM</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <FiMapPin size={24} className="text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Location</h3>
                        </div>
                        <p className="text-blue-100">123 Health Street</p>
                        <p className="text-blue-100">Medical City, MC 12345</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
                    <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>

                    {submitted && (
                        <div className="mb-6 bg-green-500/20 border border-green-400/50 text-green-200 px-4 py-3 rounded-xl flex items-center gap-3">
                            <FiCheckCircle size={20} className="flex-shrink-0" />
                            <span>Thanks for your message! We'll get back to you soon.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-3">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition backdrop-blur-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-white mb-3">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition backdrop-blur-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-3">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-3">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your inquiry..."
                                rows="5"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition backdrop-blur-sm resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2"
                        >
                            <FiSend size={20} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
