import mysql from 'mysql2/promise'

// PAra hacer la conexión
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
    const [tasks] = await connection.query('SELECT BIN_TO_UUID(id) AS id, task FROM task')
    return tasks
  }
  // crear una tarea
  static async created({ input }) {
    const { task } = input
    const [uuidResult] = await connection.query('SELECT UUID() AS uuid')
    const [{ uuid }] = uuidResult

    await connection.query(
      'INSERT INTO task (id, task) VALUES (UUID_TO_BIN(?), ?',
      [uuid, task]
    )
    const [newTask] = await connection.query(
      'SELECT BIN_TO_UUID(id) AS id, task FROM task WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )
    return newTask[0]
  }

  static async delete({ id }) {
    await connection.query('SELLECT FROM task WHERE id = UUID_TO_BIN(?)', [id])
  }
}