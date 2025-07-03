// src/routes/loginRoutes.js
import { Router } from "express";
import { findUserByEmail, verifyPassword } from "../models/userModel.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const match = await verifyPassword(password, user.password_hash);
    if (!match || user.role_name !== role) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Authentication successful
    req.session.user = {
      id: user.user_id,
      email: user.email,
      role: user.role_name,
    };
    res.json({ success: true, role: user.role_name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

export default router;
