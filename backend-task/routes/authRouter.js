import { Router } from "express";
import { authenticateToken } from "../middlewares/usersMiddlewares.js";

export const authRouter = Router();

authRouter.get("/verify", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});
