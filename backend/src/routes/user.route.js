import { Router } from "express";
import {protectRoute} from "../middlewares/auth.middleware.js"
import { getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", protectRoute, getAllUsers)
//TODO: get messages between two users

export default userRouter;