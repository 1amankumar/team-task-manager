import express from "express";
import {
    createProject,
    getAllProjects,
    addMembersToProject
} from "../controllers/projectController.js";

import isAuth from "../middleware/isAuth.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/create",
    isAuth,
    checkRole("Admin"),
    createProject
);

router.get(
    "/all",
    isAuth,
    getAllProjects
);

router.post(
    "/add-member/:projectId",
    isAuth,
    checkRole("Admin"),
    addMembersToProject
);

export default router;