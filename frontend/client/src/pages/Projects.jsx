import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Projects() {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [memberData, setMemberData] = useState({
        projectId: "",
        userId: ""
    });

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    /* Fetch Projects + Users */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectRes = await API.get("/projects/all");
                const userRes = await API.get("/auth/all-users");

                setProjects(projectRes.data.projects);
                setUsers(userRes.data.users);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    /* Create Project */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/projects/create",
                formData
            );

            alert("Project Created Successfully");

            setProjects([...projects, res.data.project]);

            setFormData({
                title: "",
                description: ""
            });

        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    /* Add Member */
    const handleMemberChange = (e) => {
        setMemberData({
            ...memberData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddMember = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                `/projects/add-member/${memberData.projectId}`,
                {
                    userId: memberData.userId
                }
            );

            alert("Member Added Successfully");

            setMemberData({
                projectId: "",
                userId: ""
            });

        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8">
                    Project & Team Management
                </h1>

                {/* Create Project */}
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Create New Project
                    </h2>

                    <form
                        onSubmit={handleCreateProject}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <textarea
                            name="description"
                            placeholder="Project Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <button className="bg-black text-white px-6 py-3 rounded-lg">
                            Create Project
                        </button>
                    </form>
                </div>

                {/* Add Team Member */}
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Add Team Member
                    </h2>

                    <form
                        onSubmit={handleAddMember}
                        className="space-y-4"
                    >
                        {/* Project Dropdown */}
                        <select
                            name="projectId"
                            value={memberData.projectId}
                            onChange={handleMemberChange}
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
                            name="userId"
                            value={memberData.userId}
                            onChange={handleMemberChange}
                            className="w-full border p-3 rounded-lg"
                        >
                            <option value="">
                                Select Team Member
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

                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                            Add Member
                        </button>
                    </form>
                </div>

                {/* Project List */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Recent Projects
                    </h2>

                    {projects.length === 0 ? (
                        <p>No projects yet</p>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div
                                    key={project._id}
                                    className="border rounded-lg p-4"
                                >
                                    <h3 className="font-bold text-lg">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-600">
                                        {project.description}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Members: {project.members?.length || 0}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Projects;