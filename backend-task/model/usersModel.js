import connection from "../dataBase/dataBase.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class UsersModel {
  static async create({ username, email, password }) {
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      throw new Error("The username already exists, choose another one.");
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const id = Buffer.from(uuidv4().replace(/-/g, ""), "hex");

    try {
      const [result] = await connection.query(
        "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
        [id, username, email, hashedPassword]
      );
    } catch (err) {
      throw new Error("Error inserting user into database.");
    }

    const [newUser] = await connection.query(
      "SELECT id, username, email FROM users WHERE id = ?;",
      [id]
    );

    return newUser[0];
  }

  static async login({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required for login.");
    }

    const [user] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      throw new Error("Incorrect login or password");
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    console.log("¿Contraseña correcta?:", isMatch);
    if (!isMatch) {
      throw new Error("Incorrect login or password");
    }
    return user[0];
  }
}
