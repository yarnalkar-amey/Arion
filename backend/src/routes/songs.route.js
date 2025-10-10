import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import {
  getSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/song.controller.js";

const songsRouter = Router();

songsRouter.get("/", protectRoute, requireAdmin, getSongs);
songsRouter.get("/featured", getFeaturedSongs);
songsRouter.get("/made-for-you", getMadeForYouSongs);
songsRouter.get("/trending", getTrendingSongs);

export default songsRouter;
