import connection from '../dataBase/dataBase.js'

export class UsersModel {
  static async getAll() {
    const [users] = await connection.query('SELECT id, username, password FROM users')
    return users
  }
}