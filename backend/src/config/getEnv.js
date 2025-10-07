import dotenv from "dotenv";
dotenv.config();

const getEnv = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ADMIN_EMAIL:process.env.ADMIN_EMAIL
};

export default getEnv;
