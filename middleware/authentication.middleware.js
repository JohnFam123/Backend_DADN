import jwt from "jsonwebtoken";
import connectDB from "../controller/database.controller.js";
import User from "../model/user.model.js";

async function isAuthorized(req, res, next) {
    // Get the JWT token from the request header
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        // Check if the user exists
        const user = await User.findOne({ 'username': decoded.username });
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

export default isAuthorized;
