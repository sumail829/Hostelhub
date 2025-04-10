import jwt from "jsonwebtoken";

const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authorization token", authHeader);

  if (!authHeader) {
    return res.status(404).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("extracted token", token);

  try {
    const decoded = jwt.verify(token, "dasdhajshdash123sasdau213");
    
    // Check if the user is an admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden. Not an admin." });
    }

    req.user = decoded;
    console.log("decoded token", decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyAdminToken;
