import connection from "../dataBase/dataBase.js";

export class TaskModel {
  static async getAll() {
    const [tasks] = await connection.query(
      "SELECT id, text, completed FROM tasks"
    );
    return tasks;
  }

  static async create({ input }) {
    const { text } = input;
    const [result] = await connection.query(
      "INSERT INTO tasks (text) VALUES (?)",
      [text]
    );

    const [newTask] = await connection.query(
      "SELECT id, text FROM tasks WHERE id = ?;",
      [result.insertId]
    );
    return newTask[0];
  }

  static async delete({ id }) {
    const [result] = await connection.query("DELETE FROM tasks WHERE id = ?", [
      id,
    ]);
    return result;
  }

  static async updateTaskCompleted(id, completed) {
    try {
      const query = "UPDATE tasks SET completed = ? WHERE id = ?";
      const [result] = await connection.query(query, [completed, id]);
      return result;
    } catch (error) {
      console.error("Error updating task in database:", error);
    }
  }
}
