import Project from "../models/Project.js";

/* Create Project */
export const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const project = await Project.create({
            title,
            description,
            createdBy: req.userId,
            members: []
        });

        return res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        console.log("Create Project Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

/* Get All Projects */
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("members", "name email");

        return res.status(200).json({
            projects
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

/* Add Members To Project */
export const addMembersToProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (!project.members.includes(userId)) {
            project.members.push(userId);
            await project.save();
        }

        return res.status(200).json({
            message: "Member added successfully",
            project
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};