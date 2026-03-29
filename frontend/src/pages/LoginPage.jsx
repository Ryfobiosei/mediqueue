import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isAdmin: false,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // TODO: Add API call to backend for login
            console.log("Login attempt:", formData);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert("Login successful!");
            // Navigate to dashboard after successful login
            navigate("/");
        } catch (error) {
            alert("Login failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-10"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>

            {/* Card */}
            <div className="relative z-10 w-[380px] bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800 mb-2">MediQueue</h2>
                    <p className="text-sm text-gray-500">Welcome Back</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">
                            Email Address
                        </label>
                        <span className="absolute left-3 top-9 text-gray-400">📧</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">
                            Password
                        </label>
                        <span className="absolute left-3 top-9 text-gray-400">🔒</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none transition"
                            required
                        />
                    </div>

                    {/* Admin Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <label htmlFor="isAdmin" className="text-xs text-gray-600">
                            I am a Clinic Administrator
                        </label>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex justify-between items-center text-xs">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4 rounded" />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-800 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-2.5 rounded-lg font-semibold transition duration-200"
                    >
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-blue-800 font-semibold hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
