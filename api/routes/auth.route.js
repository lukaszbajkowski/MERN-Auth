import express from "express";
import {
    confirmEmail,
    google,
    requestPasswordReset,
    resetPassword,
    resetPasswordVerifyToken,
    signin,
    signout,
    signup
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout);
router.get("/confirm-email/:token", confirmEmail);
router.post("/reset-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);
router.get("/reset-password/:token", resetPasswordVerifyToken);

export default router;
