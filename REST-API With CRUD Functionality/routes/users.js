import express from 'express'; // Importing the Express framework
import { getAllUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.js'; // Importing user controller functions

// Create a new router object
const router = express.Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to create a new user
router.post('/', createUser);

// Route to get a specific user by ID
router.get('/:id', getUser);

// Route to delete a specific user by ID
router.delete('/:id', deleteUser);

// Route to update a specific user by ID
router.patch('/:id', updateUser);

// Export the router object to be used in other parts of the application
export default router;