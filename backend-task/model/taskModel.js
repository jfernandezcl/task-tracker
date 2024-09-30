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
    const [tasks] = await connection.query('SELECT id, task FROM task')
    console.log(tasks)
    return tasks
  }
  // crear una tarea
  static async create({ input }) {
    const { task } = input
    const [result] = await connection.query(
      'INSERT INTO task (task) VALUES (?)',
      [task]
    )

    const [newTask] = await connection.query(
      'SELECT id, task FROM task WHERE id = ?;',
      [result.insertId]
    )
    return newTask[0]
  }

  static async delete({ id }) {
    const [result] = await connection.query('DELETE FROM task WHERE id = ?', [id])
    return result
  }
}