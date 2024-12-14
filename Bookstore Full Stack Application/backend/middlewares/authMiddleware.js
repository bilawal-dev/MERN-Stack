import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token;


    
    if (!token) {
        return res.status(400).json({ message: "No token provided, authorization denied" });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info (id, and email) to the request object to use in booksRoute
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;