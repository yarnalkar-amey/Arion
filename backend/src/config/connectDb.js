import mongoose from "mongoose";
import getEnv from "./getEnv.js";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(getEnv.MONGO_URI);
    console.log("Database connected: " + conn.connection.host);
  } catch (error) {
    console.log("Error Connecting Database: " + error);
    process.exit(1);
  }
};

export default connectDb;
