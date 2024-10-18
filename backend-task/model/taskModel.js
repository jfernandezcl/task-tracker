import connection from '../dataBase/dataBase.js'

// Métodos de la clase
export class TaskModel {
  // obtener todas las tareas
  static async getAll() {
    const [tasks] = await connection.query('SELECT id, text, completed FROM task')
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

  static async updateTaskCompleted(id, completed) {
    try {
      const query = 'UPDATE task SET completed = ? WHERE id = ?'
      const [result] = await connection.query(query, [completed, id])
      return result
    } catch (error) {
      console.error('Error updating task in database:', error)
    }
  }
}