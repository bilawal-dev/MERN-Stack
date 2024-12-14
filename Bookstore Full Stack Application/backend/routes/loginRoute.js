import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Incomplete Credentials' });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
        return res.status(400).json({ message: "User with this email doesn't exists" });
    }

    try {
        const isPasswordMatch = await bcrypt.compare(password, userExists.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ id: userExists._id, email: userExists.email }, process.env.JWT_SECRET );
        
        res.cookie('token', token, {
            httpOnly: true
        });

        res.status(200).json({ token, message: 'User login successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error, Failed to login user' });
    }
})

export default router;