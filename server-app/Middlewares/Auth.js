import jwt from "jsonwebtoken";
import User from "../Models/User.js";

async function protectRoute(request, response, next) {
    try {
        const accessToken = request.cookies.accessToken;

        if (!accessToken) return response.status(401).json({ message: "Unauthorized - No access token provided" });

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) return response.status(401).json({ message: "User not found" });

            request.user = user;

            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") return response.status(401).json({ message: "Unauthorized - Access token expired" });
            throw error;
        }
    } catch (error) {
        console.log("Error in protectRoute middlewares", error.message);
        return response.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
}

async function adminRoute(request, response, next) {
    if (request.user && request.user.role === "admin") next();
    else return response.status(403).json({ message: "Access denied - Admin only" });
}

export { protectRoute, adminRoute };