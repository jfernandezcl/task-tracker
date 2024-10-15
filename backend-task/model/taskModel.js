import mysql from 'mysql2/promise'

// PAra hacer la conexión DBngin
const SERVER_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 1234,
  password: '',
  database: 'tasktracker'
}

const connectionString = process.env.DATABASE_URL ?? SERVER_CONFIG

const connection = await mysql.createConnection(connectionString)


// Métodos de la clase
export class TaskModel {
  // obtener todas las tareas
  static async getAll() {
    const [tasks] = await connection.query('SELECT id, text FROM task')
    return tasks
  }
  // crear una tarea
  static async create({ input }) {
    const { text } = input
    const [result] = await connection.query(
      'INSERT INTO task (text) VALUES (?)',
      [text]
    )

    const [newTask] = await connection.query(
      'SELECT id, text FROM task WHERE id = ?;',
      [result.insertId]
    )
    return newTask[0]
  }

  static async delete({ id }) {
    const [result] = await connection.query('DELETE FROM task WHERE id = ?', [id])
    return result
  }

  static async updateCompleted(id, completed) {
    const query = 'UPDATE task SET completed = ? WHERE id = ?'
    const [result] = await this.db.query(query, [completed, id])
    return result
  }
}