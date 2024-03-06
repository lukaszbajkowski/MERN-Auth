import express from "express";
import {updateUser, deleteUser, updateUserProfilePicture, updateUserAbout} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.post("/update/image/:id", verifyToken, updateUserProfilePicture);
router.post("/update/about/:id", verifyToken, updateUserAbout);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
