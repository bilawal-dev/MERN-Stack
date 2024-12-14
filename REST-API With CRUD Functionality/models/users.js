import mongoose from "mongoose"; // Importing Mongoose to interact with MongoDB

// Defining the schema for a User
const productSchema = mongoose.Schema({
    firstName: {
        type: String, // Specifies that the firstName field should be a string
    },
    lastName: {
        type: String, // Specifies that the lastName field should be a string
    },
    age: {
        type: Number, // Specifies that the age field should be a number
    },
});

// Creating a model for the User schema
const User = mongoose.model('Users', productSchema); // The first argument is the name of the collection in MongoDB while second-one is schema 

// Exporting the User model for use in other parts of the application
export default User;