import mongoose from "mongoose";
console.log("Connecting to MongoDB...");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
