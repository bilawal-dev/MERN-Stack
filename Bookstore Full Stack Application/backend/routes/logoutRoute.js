import express from "express";

const router = express.Router();

// Logout route to clear the cookie
// A POST request is meant for actions that change the server’s state, like creating, updating, or deleting resources. Logging out is an action that involves changing the state by invalidating a session or removing a token, so a POST is more appropriate.
router.post('/', (req, res) => {
    // Clear the token from the cookies
    console.log('lun mera');

    res.clearCookie('token', { httpOnly: true });
    
    // Send a response to confirm logout
    res.status(200).json({ message: 'User logged out successfully' });
});

export default router;