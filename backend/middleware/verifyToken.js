import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT SecretKey not defined")
}

const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7)
    }
    return null;
}

const verifyToken = (req, res, next) => {

    const token = extractToken(req)

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // اطلاعات کاربر را به درخواست می‌چسبانیم
        next(); // ادامه به روت بعدی
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

}


export default verifyToken