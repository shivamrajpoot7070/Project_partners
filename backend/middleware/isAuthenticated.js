import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const cookieToken = req.cookies.token;
        const headerToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        // Verify the token
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach user ID to request object
        req.id = decode.userId;  // isko req ko de dega taki aage ye use kar sake protected route me
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Internal server error during authentication",
            success: false,
        });
    }
};

export default isAuthenticated;
