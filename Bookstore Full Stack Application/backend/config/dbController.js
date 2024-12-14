import mongoose from "mongoose";

function connectDB() {
    // Check if the MONGODB_URI is defined
    console.log(process.env.JWT_SECRET)
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in environment variables.");
        return;
    }

    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        return;
    }
}

export default connectDB;