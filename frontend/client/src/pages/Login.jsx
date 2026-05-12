import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            navigate("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Team Task Manager
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button className="w-full bg-black text-white py-3 rounded-lg">
                        Login
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don’t have an account? <Link to="/signup">Signup</Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;