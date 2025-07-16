import connection from "../dataBase/dataBase.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class UsersModel {
  static async create({ username, email, password }) {
    console.log("🟡 Paso 1: Verificando usuario existente...");
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      console.log("🔴 Usuario ya existe:", existingUser);
      throw new Error("The username already exists, choose another one.");
    }

    console.log("🟡 Paso 2: Hasheando contraseña...");
    const hashedPassword = await bcrypt.hash(password, 15);

    console.log("🟡 Paso 3: Generando UUID...");
    const id = Buffer.from(uuidv4().replace(/-/g, ""), "hex");
    console.log("🟢 UUID generado:", id);

    try {
      console.log("🟡 Paso 4: Insertando usuario en base de datos...");
      const [result] = await connection.query(
        "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
        [id, username, email, hashedPassword]
      );
      console.log("🟢 Resultado inserción:", result);
    } catch (err) {
      console.error("🔴 Error al insertar:", err);
      throw new Error("Error inserting user into database.");
    }

    console.log("🟡 Paso 5: Obteniendo usuario insertado...");
    const [newUser] = await connection.query(
      "SELECT id, username, email FROM users WHERE id = ?;",
      [id]
    );

    console.log("🟢 Usuario insertado correctamente:", newUser[0]);
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
