import { usersValidations } from "../validationsRegister/usersValidations.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export class UsersControllers {
  constructor(usersModel) {
    console.log(usersModel);
    this.usersModel = usersModel;
  }

  async register(req, res) {
    console.log("Datos enviados:", req.body);
    try {
      usersValidations(req.body);

      const user = await this.usersModel.create(req.body);
      console.log("Datos recibidos para registro:", req.body);

      res.status(201).json(user);
    } catch (error) {
      console.error("Error durante el registro:", error);
      res.status(400).json({ error: error.message || "Error desconocido" });
    }
  }

  async login(req, res) {
    try {
      const authenticatedUser = await this.usersModel.login(req.body);

      if (!authenticatedUser) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: authenticatedUser.id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.cookie("token", token, { httpOnly: true, maxAge: 36000000 });
      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
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
