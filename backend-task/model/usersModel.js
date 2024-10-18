import connection from '../dataBase/dataBase.js'

export class UsersModel {
  static async create({ username, password }) {
    // verificar nombre de usuario
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )
    if (existingUser.length > 0) {
      throw new Error('The username already exists, choose another one.')
    }

    const [result] = await connection.query(
      'INSERT INTO users (username, password) VALUES (?, ?'
      [username, password]
    )

    const [newUser] = await connection.query(
      'SELECT id, username FROM users WHERE id = ?;'
      [result.insertId]
    )
    return newUser[0]
  }


}