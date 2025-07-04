import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;
