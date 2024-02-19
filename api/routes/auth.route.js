import express from "express";
import {
  signin,
  signup,
  google,
  signout,
  confirmEmail,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout);
router.get("/confirm-email/:token", confirmEmail);

export default router;
