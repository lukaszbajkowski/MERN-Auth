import express from "express";
import {
  signin,
  signup,
  google,
  signout,
  confirmEmail,
  requestPasswordReset,
  resetPassword
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout);
router.get("/confirm-email/:token", confirmEmail);
router.post("/reset-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
