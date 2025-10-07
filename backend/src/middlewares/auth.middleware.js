// middleware/auth.js
import { clerkClient } from "@clerk/express";
import getEnv from "../config/getEnv.js";

export const protectRoute = async (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = getEnv.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next(); // ✅ critical
  } catch (error) {
    console.error("Admin check failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
