import connection from "../dataBase/dataBase.js";
import crypto from "crypto";

export class TaskModel {
  static async getAll(userId) {
    const [tasks] = await connection.query(
      "SELECT BIN_TO_UUID(id) AS id, text, completed FROM tasks WHERE user_id = UUID_TO_BIN(?)",
      [userId]
    );
    return tasks;
  }

  static async create({ input }) {
    const { text, userId } = input;
    const taskId = crypto.randomUUID();

    const [result] = await connection.query(
      "INSERT INTO tasks (id, text, user_id) VALUES (UUID_TO_BIN(?), ?, UUID_TO_BIN(?))",
      [taskId, text, userId]
    );

    const [newTask] = await connection.query(
      "SELECT BIN_TO_UUID(id) AS id, text, completed, BIN_TO_UUID(user_id) AS userId FROM tasks WHERE id = UUID_TO_BIN(?)",
      [taskId]
    );
    return newTask[0];
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      "DELETE FROM tasks WHERE id = UUID_TO_BIN(?)",
      [id]
    );
    return result;
  }

  static async updateTaskCompleted(id, completed) {
    try {
      const query = "UPDATE tasks SET completed = ? WHERE id = UUID_TO_BIN(?)";
      const [result] = await connection.query(query, [completed, id]);
      return result;
    } catch (error) {
      console.error("Error updating task in database:", error);
    }
  }
}
