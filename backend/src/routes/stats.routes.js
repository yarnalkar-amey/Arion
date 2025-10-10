import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getStats } from "../controllers/stats.controller.js";

const statsRouter = Router();

statsRouter.get("/",protectRoute, requireAdmin, getStats);

export default statsRouter;
