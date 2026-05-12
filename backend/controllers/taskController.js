import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

/* Create Task */
export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            project,
            assignedTo,
            dueDate
        } = req.body;

        const task = await Task.create({
            title,
            description,
            project,
            assignedTo,
            dueDate
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.log("Create Task Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

/* Update Task Status */
export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const task = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task status updated",
            task
        });

    } catch (error) {
        console.log("Update Task Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

/* Get Dashboard Data */
export const getDashboardData = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        /* ADMIN DASHBOARD */
        if (user.role === "Admin") {
            const totalTasks = await Task.countDocuments();

            const completedTasks = await Task.countDocuments({
                status: "Completed"
            });

            const pendingTasks = await Task.countDocuments({
                status: {
                    $in: ["Pending", "In Progress"]
                }
            });

            const overdueTasks = await Task.find({
                dueDate: { $exists: true },
                status: { $ne: "Completed" }
            });

            const filteredOverdueTasks = overdueTasks.filter(
                (task) => new Date(task.dueDate) < new Date()
            );

            return res.status(200).json({
                role: "Admin",
                totalTasks,
                completedTasks,
                pendingTasks,
                overdueTasks: filteredOverdueTasks.length
            });
        }

        /* MEMBER DASHBOARD */
        if (user.role === "Member") {
            const assignedTasks = await Task.find({
                assignedTo: req.userId
            })
                .populate("project", "title")
                .populate("assignedTo", "name");

            const assignedProjects = await Project.find({
                members: req.userId
            });

            return res.status(200).json({
                role: "Member",
                assignedTasks,
                assignedProjects
            });
        }

        return res.status(400).json({
            message: "Invalid role"
        });

    } catch (error) {
        console.log("Dashboard Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};
/* Get All Tasks */
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("project", "title")
            .populate("assignedTo", "name email");

        return res.status(200).json({
            tasks
        });

    } catch (error) {
        console.log("Get Tasks Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};