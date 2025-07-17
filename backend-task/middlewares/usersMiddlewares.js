import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  console.log("🔐 Token recibido en middleware:", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided." });
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
