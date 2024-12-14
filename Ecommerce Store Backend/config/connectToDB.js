import mongoose from "mongoose";

// Async function to connect to MongoDB
async function connectToDB() {
    try {
        // Attempt to connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(process.env.MONGODB_URL); 
        console.log('Connected To DB');
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB;  // Export the connectDB function for use in other files