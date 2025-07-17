import { usersValidations } from "../validationsRegister/usersValidations.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
console.log("🔐 JWT_SECRET en controller:", jwtSecret);

export class UsersControllers {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async register(req, res) {
    try {
      usersValidations(req.body);

      const user = await this.usersModel.create(req.body);

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message || "Error desconocido" });
    }
  }

  async login(req, res) {
    try {
      const authenticatedUser = await this.usersModel.login(req.body);

      if (!authenticatedUser) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log("🧑 Usuario autenticado:", authenticatedUser);
      console.log("🆔 ID del usuario:", authenticatedUser.id);

      const userId = authenticatedUser.id.toString("hex");
      console.log("🆔 ID como hex string:", userId);

      const token = jwt.sign({ id: userId }, jwtSecret, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ Poner en true si usas HTTPS en producción
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      });
      console.log("JWT_SECRET:", jwtSecret);

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).json("Logged out successfully");
    } catch (error) {
      res.status(500).json({ error: "Error logging out." });
    }
  }
}
