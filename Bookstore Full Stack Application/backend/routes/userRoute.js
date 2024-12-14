import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const cookies = req.cookies;  // Access cookies

    // You can use the user data to fetch further information if needed
    try {
        const user = await User.findById(req.user.id);  // Get user from database by ID
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User is authenticated',
            user: { id: user._id, email: user.email },  // Sending back some user details
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;