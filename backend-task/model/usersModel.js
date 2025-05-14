import connection from "../dataBase/dataBase.js";
import bcrypt from "bcrypt";

export class UsersModel {
  static async create({ username, password }) {
    console.log("Verificando usuario existente");
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    console.log("Usuario existente:", existingUser);
    if (existingUser.length > 0) {
      throw new Error("The username already exists, choose another one.");
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const [result] = await connection.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    console.log("Resultado de la inserción:", result);

    const [newUser] = await connection.query(
      "SELECT id, username FROM users WHERE id = ?;",
      [result.insertId]
    );
    console.log("ID insertado:", result.insertId);
    return newUser[0];
  }

  static async login({ username, password }) {
    const [user] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (user.length === 0) {
      throw new Error("Incorrect login or password");
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      throw new Error("Incorrect login or password");
    }
    return user[0];
  }
}
