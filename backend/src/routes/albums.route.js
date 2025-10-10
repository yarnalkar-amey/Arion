import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAlbumById, getAlbums } from "../controllers/album.controller.js";
const albumsRouter = Router();

albumsRouter.use(protectRoute);

albumsRouter.get("/",getAlbums);
albumsRouter.get("/:albumId", getAlbumById);

export default albumsRouter;