import express from "express";
import {
    signUp,
    sigIn,
    signOut,
    getAllUsers
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", sigIn);
router.get("/logout", signOut);
router.get("/all-users", getAllUsers);

export default router;