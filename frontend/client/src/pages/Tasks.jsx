import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Tasks() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        dueDate: ""
    });

    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    /* Fetch Projects + Users + Tasks */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectRes = await API.get("/projects/all");
                const userRes = await API.get("/auth/all-users");
                const taskRes = await API.get("/tasks/all");

                setProjects(projectRes.data.projects);
                setUsers(userRes.data.users);
                setTasks(taskRes.data.tasks);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    /* Handle Input Change */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /* Create Task */
    const handleCreateTask = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/tasks/create",
                formData
            );

            alert("Task Created Successfully");

            setTasks([...tasks, res.data.task]);

            setFormData({
                title: "",
                description: "",
                project: "",
                assignedTo: "",
                dueDate: ""
            });

        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    /* Update Status */
    const handleStatusChange = async (
        taskId,
        newStatus
    ) => {
        try {
            const res = await API.put(
                `/tasks/update-status/${taskId}`,
                {
                    status: newStatus
                }
            );

            const updatedTasks = tasks.map((task) =>
                task._id === taskId
                    ? res.data.task
                    : task
            );

            setTasks(updatedTasks);

        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8">
                    Task Management
                </h1>

                {/* Create Task Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Create New Task
                    </h2>

                    <form
                        onSubmit={handleCreateTask}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <textarea
                            name="description"
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        {/* Project Dropdown */}
                        <select
                            name="project"
                            value={formData.project}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >
                            <option value="">
                                Select Project
                            </option>

                            {projects.map((project) => (
                                <option
                                    key={project._id}
                                    value={project._id}
                                >
                                    {project.title}
                                </option>
                            ))}
                        </select>

                        {/* User Dropdown */}
                        <select
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >
                            <option value="">
                                Assign Team Member
                            </option>

                            {users.map((user) => (
                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <button className="bg-black text-white px-6 py-3 rounded-lg">
                            Create Task
                        </button>
                    </form>
                </div>

                {/* Task List */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Recent Tasks
                    </h2>

                    {tasks.length === 0 ? (
                        <p>No tasks created yet</p>
                    ) : (
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="border rounded-lg p-4"
                                >
                                    <h3 className="font-bold text-lg">
                                        {task.title}
                                    </h3>

                                    <p>{task.description}</p>

                                    <p className="text-sm text-gray-500 mt-2">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>

                                    {/* Status Dropdown */}
                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                task._id,
                                                e.target.value
                                            )
                                        }
                                        className="border p-2 rounded mt-3"
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>
                                        <option value="In Progress">
                                            In Progress
                                        </option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tasks;