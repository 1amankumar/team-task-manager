import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Sidebar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = async () => {
        try {
            await API.get("/auth/logout");

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");

            alert("Logout Successful");

            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-64 min-h-screen bg-black text-white p-6">
            <h1 className="text-2xl font-bold mb-10">
                Team Manager
            </h1>

            <div className="space-y-4">
                {/* Dashboard for all */}
                <Link
                    to="/dashboard"
                    className="block hover:text-gray-300"
                >
                    Dashboard
                </Link>

                {/* Admin only → show Projects + Tasks */}
                {role === "Admin" && (
                    <>
                        <Link
                            to="/projects"
                            className="block hover:text-gray-300"
                        >
                            Projects
                        </Link>

                        <Link
                            to="/tasks"
                            className="block hover:text-gray-300"
                        >
                            Tasks
                        </Link>
                    </>
                )}

                {/* Member → no Tasks, no Projects */}

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-white text-black px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;