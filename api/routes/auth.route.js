import express from "express";
import {
    checkHasRelatedAccount,
    confirmEmail,
    deleteRelatedAccount,
    google,
    relatedAccount,
    requestPasswordReset,
    resetPassword,
    signin,
    signout,
    signup
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout);
router.post("/confirm-email/:token", confirmEmail);
router.post("/reset-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);
router.post("/related-account", relatedAccount);
router.post('/check-related-account', checkHasRelatedAccount);
router.post('/remove-related-account', deleteRelatedAccount);
export default router;
