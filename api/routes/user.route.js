import express from "express";
import {
    deleteUser,
    deleteUserMessage,
    updateEmail,
    updatePassword,
    updateUserAbout,
    updateUsername,
    updateUserProfilePicture,
} from "../controllers/user.controller.js";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/email/:id", verifyToken, updateEmail);
router.post("/update/password/:id", verifyToken, updatePassword);
router.post("/update/username/:id", verifyToken, updateUsername);
router.post("/update/image/:id", verifyToken, updateUserProfilePicture);
router.post("/update/about/:id", verifyToken, updateUserAbout);
router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/delete/email", verifyToken, deleteUserMessage);

export default router;
