import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectToDb = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export the function so it can be used in other parts of the application
export default connectToDb;