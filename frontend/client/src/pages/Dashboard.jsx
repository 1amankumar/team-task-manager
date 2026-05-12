import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await API.get(
                    "/tasks/dashboard"
                );

                setData(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchDashboardData();
    }, []);

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>

                {/* ADMIN DASHBOARD */}
                {data.role === "Admin" && (
                    <div className="grid grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2>Total Tasks</h2>
                            <p className="text-3xl font-bold">
                                {data.totalTasks}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2>Completed</h2>
                            <p className="text-3xl font-bold">
                                {data.completedTasks}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2>Pending</h2>
                            <p className="text-3xl font-bold">
                                {data.pendingTasks}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2>Overdue</h2>
                            <p className="text-3xl font-bold">
                                {data.overdueTasks}
                            </p>
                        </div>
                    </div>
                )}

                {/* MEMBER DASHBOARD */}
                {data.role === "Member" && (
                    <>
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold mb-4">
                                My Assigned Tasks
                            </h2>

                            {data.assignedTasks.length === 0 ? (
                                <p>No assigned tasks</p>
                            ) : (
                                <div className="space-y-4">
                                    {data.assignedTasks.map((task) => (
                                        <div
                                            key={task._id}
                                            className="bg-white p-5 rounded-xl shadow"
                                        >
                                            <h3 className="font-bold text-lg">
                                                {task.title}
                                            </h3>

                                            <p>{task.description}</p>

                                            <p className="text-sm text-gray-500 mt-2">
                                                Project: {task.project?.title}
                                            </p>

                                            <p className="text-sm">
                                                Status: {task.status}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">
                                My Projects
                            </h2>

                            {data.assignedProjects.length === 0 ? (
                                <p>No assigned projects</p>
                            ) : (
                                <div className="space-y-4">
                                    {data.assignedProjects.map((project) => (
                                        <div
                                            key={project._id}
                                            className="bg-white p-5 rounded-xl shadow"
                                        >
                                            <h3 className="font-bold text-lg">
                                                {project.title}
                                            </h3>

                                            <p>{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;