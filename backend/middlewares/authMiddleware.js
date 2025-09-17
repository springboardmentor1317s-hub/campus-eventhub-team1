import jwt from "jsonwebtoken";

// Check if user is logged in
export const protect = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // If no token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, access denied" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    try {
        // Verify token with secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user data (id, role) into request
        req.user = decoded;

        next(); // continue to the next middleware/route
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Check if user has the correct role
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You are not allowed to access this route" });
        }
        next();
    };
};
