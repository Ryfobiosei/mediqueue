import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        userType: "patient",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "confirmPassword" && value !== formData.password) {
            setPasswordsMatch(false);
        } else if (name === "confirmPassword") {
            setPasswordsMatch(true);
        }
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordsMatch || formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
        if (!formData.agreeTerms) {
            alert("Please agree to the terms and conditions");
            return;
        }
        setLoading(true);
        try {
            // TODO: Add API call to backend for registration
            console.log("Registration attempt:", formData);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            alert("Registration failed: " + error.message);
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
            <div className="relative z-10 w-[420px] bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800 mb-2">Create Account</h2>
                    <p className="text-sm text-gray-500">Join MediQueue today</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">
                            Full Name
                        </label>
                        <span className="absolute left-3 top-9 text-gray-400">👤</span>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none transition"
                            required
                        />
                    </div>

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

                    {/* Phone */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">
                            Phone Number
                        </label>
                        <span className="absolute left-3 top-9 text-gray-400">📱</span>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* User Type */}
                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-3 block">
                            Account Type
                        </label>
                        <div className="flex gap-3">
                            {["patient", "doctor", "admin"].map((type) => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value={type}
                                        checked={formData.userType === type}
                                        onChange={handleChange}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm text-gray-600 capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">
                            Password
                        </label>
                        <span className="absolute left-3 top-9 text-gray-400">🔒</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none transition"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? "👁️" : "👁️"}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">
                            Confirm Password
                        </label>
                        <span className="absolute left-3 top-9 text-gray-400">🔒</span>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? "👁️" : "👁️"}
                        </button>
                    </div>

                    {/* Password Match Error */}
                    {!passwordsMatch && (
                        <p className="text-xs text-red-500 font-semibold">
                            Passwords do not match!
                        </p>
                    )}

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="w-4 h-4 mt-1"
                            required
                        />
                        <label htmlFor="agreeTerms" className="text-xs text-gray-600">
                            I agree to the{" "}
                            <a href="#" className="text-blue-800 hover:underline">
                                Terms & Conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-800 hover:underline">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-2.5 rounded-lg font-semibold transition duration-200"
                    >
                        {loading ? "Creating Account..." : "CREATE ACCOUNT"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-800 font-semibold hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
