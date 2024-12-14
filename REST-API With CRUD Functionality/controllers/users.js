import { v4 as uuidv4 } from 'uuid'; // Importing UUID library to generate unique IDs
import User from '../models/users.js'; // Importing the User model

// Controller to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users from the database
        res.status(200).json({ users }); // Send the list of users as the response in JSON format
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
    }
}

// Controller to create a new user
const createUser = async (req, res) => {
    const { firstName, lastName, age } = req.body; // Extract the user data from the request body
    const user = {
        id: uuidv4(), // Generate a unique ID for the new user
        firstName,
        lastName,
        age
    };

    try {
        const newUser = await User.create(user); // Create a new user in the database
        res.status(200).json({ message: `New User Added: ${newUser.firstName} ${newUser.lastName}` }); // Send a confirmation response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
    }
};

// Controller to get a user by ID
const getUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters

    try {
        const user = await User.findById(id); // Find the user by ID in the database
        if (user) {
            res.status(200).json(user); // Send the user data as the response if found
        } else {
            res.status(400).json({ message: `User With ID: ${id} Not Found In Database` }); // Send an error message if user not found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
    }
};

// Controller to delete a user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters

    try {
        const result = await User.findByIdAndDelete(id); // Find and delete the user by ID in the database
        if (result) {
            res.status(200).json({ message: `User With ID: ${id} Deleted From Database` }); // Send a confirmation response if user is deleted
        } else {
            res.status(400).json({ message: `User With ID: ${id} Not Found In Database` }); // Send an error message if user not found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
    }
};

// Controller to update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters
    const { firstName, lastName, age } = req.body; // Extract the updated user data from the request body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, age },
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            res.json({ message: `User With ID: ${id} Updated In Database`, updatedUser }); // Send a confirmation response if user is updated
        } else {
            res.status(400).json({ message: `User With ID: ${id} Not Found In Database` }); // Send an error message if user not found
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
    }
};

// Exporting all the controller functions
export {
    getAllUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser
};