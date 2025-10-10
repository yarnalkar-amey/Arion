import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { deleteSongController, postAlbumCreation, postCreateSongController, deleteAlbumController, checkAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.use(protectRoute,requireAdmin)

adminRouter.get("/check",checkAdmin)

adminRouter.post("/song", postCreateSongController);
adminRouter.delete("/song/:id",  deleteSongController);

adminRouter.post("/album",postAlbumCreation);
adminRouter.delete("/album/:id",deleteAlbumController);

export default adminRouter;