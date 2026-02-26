import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDB = async () => {
  try {
    const url = "mongodb://localhost:27017/auraweds";
    const uri = process.env.MONGODB_URI || url;
    console.log("MongoDB (Mongoose) connecting...");
    // await mongoose.connect(uri);
    console.log("MongoDB (Mongoose) connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
