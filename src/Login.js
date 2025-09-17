import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
        if (JSON.parse(localStorage.getItem("isAuthenticated"))) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
            <div className="bg-white rounded-2xl shadow-xl p-10 w-96 sm:w-80">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Login to your account
                </p>
                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 placeholder-transparent"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-sm"
                        >
                            Email Address
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 placeholder-transparent"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-sm"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold shadow hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-5">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-500 font-semibold hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
