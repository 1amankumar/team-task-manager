import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "Member"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/signup", formData);

            localStorage.setItem("role", res.data.role);
            localStorage.setItem("isLoggedIn", "true");

            alert("Signup Successful");
            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSignup}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
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

                    <select
                        name="role"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    >
                        <option value="Member">
                            Member
                        </option>

                        <option value="Admin">
                            Admin
                        </option>
                    </select>

                    <button className="w-full bg-black text-white py-3 rounded-lg">
                        Signup
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Signup;