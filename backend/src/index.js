import express from "express";
import "dotenv/config";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

//router imports
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import songsRouter from "./routes/songs.route.js";
import albumsRouter from "./routes/albums.route.js";
import statsRouter from "./routes/stats.routes.js";

//utils
import getEnv from "./config/getEnv.js";
import connectDb from "./config/connectDb.js";

const app = express();
const __dirname = path.resolve()

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

//allow json data
app.use(express.json());

//aloow usage of clerk
app.use(clerkMiddleware())

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:path.join(__dirname,"tmp"),
  createParentPath:true,
  limits:{
    fileSize: 10 * 1024 * 1024 //10mb
  }
}));



//Routes
app.use("/api/auth", authRouter); // routes for the authentication
app.use("/api/users", userRouter); // routes for the users
app.use("/api/admin", adminRouter); //routes for the admin
app.use("/api/songs", songsRouter); // routes for the songs
app.use("/api/albums", albumsRouter); // routes for the albums
app.use("/api/stats", statsRouter); // routes statastics

//error handler middleware
app.use((err,req,res,next) => {
  res.status(500).json({message: getEnv.NODE_ENV === "production" ? "Internal Server Error" : err.message});
})

connectDb().then(() => {
  app.listen(getEnv.PORT,() => {
    console.log("Connected to the server: " + getEnv.PORT)
  })
})
