// middleware/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // ✅ Correct way to read

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "123124asdajsbdahjsbdajsb123", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.log("✅ Decoded token:", decoded); 
    req.user = decoded;
    next();
  });
};
