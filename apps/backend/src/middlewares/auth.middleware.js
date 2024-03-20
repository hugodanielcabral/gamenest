import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token, "token");

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user_id = decoded.id;
    next();
  });
};
