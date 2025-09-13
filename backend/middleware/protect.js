import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ First check cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // 2️⃣ Then check Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ If no token found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Get user without password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user; // attach user to request
    next(); // pass control to next middleware
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
