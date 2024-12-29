// lib/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { errorHandler } from "@/lib/handlers";  


const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req) => {

    const cookies = req.headers.get('cookie');
    const token = cookies?.split(';').find(c => c.trim().startsWith('token='));

    if (!token) {
        return errorHandler('Authentication token is missing', 404);
    }

    const tokenValue = token.split('=')[1];

    try {
        const decoded = jwt.verify(tokenValue, JWT_SECRET);
        req.user = decoded; 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return errorHandler("Session ended!")
        }
        throw errorHandler('Invalid or expired token');
    }
};
