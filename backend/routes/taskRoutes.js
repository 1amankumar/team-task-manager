import express from "express";
import {
    createTask,
    updateTaskStatus,
    getDashboardData,
    getAllTasks
} from "../controllers/taskController.js";

import isAuth from "../middleware/isAuth.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

/* Admin only */
router.post(
    "/create",
    isAuth,
    checkRole("Admin"),
    createTask
);

/* Admin + Member */
router.put(
    "/update-status/:taskId",
    isAuth,
    checkRole("Admin", "Member"),
    updateTaskStatus
);

/* Dashboard access for both */
router.get(
    "/dashboard",
    isAuth,
    checkRole("Admin", "Member"),
    getDashboardData
);

/* Get all tasks */
router.get(
    "/all",
    isAuth,
    checkRole("Admin", "Member"),
    getAllTasks
);

export default router;