import express from "express";
import {
  register,
  login,
  logout,
  currentUser,
  sendTestEmail,
  forgotPassword
} from "../controllers/auth";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.get("/send-email", sendTestEmail);
router.post("/forgot-password", forgotPassword);

module.exports = router;
