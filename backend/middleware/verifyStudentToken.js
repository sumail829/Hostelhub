// middleware/verifyToken.js
import jwt from "jsonwebtoken";
import 'dotenv/config'
export const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // ✅ Correct way to read

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_STUTOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    } 
    req.user = decoded;
    next();
  });
};
