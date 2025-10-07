import { Router } from "express";
import { authCallbackController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/callback", authCallbackController)

export default authRouter;