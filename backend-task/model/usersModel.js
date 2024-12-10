import connection from '../dataBase/dataBase.js'
import bcrypt from 'bcrypt'

export class UsersModel {
  static async create({ username, password }) {
    // verificar nombre de usuario
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    console.log('Usuario existente:', existingUser)
    if (existingUser.length > 0) {
      throw new Error('The username already exists, choose another one.')
    }

    // cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await connection.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword] // Usar la contraseña cifrada
    );

    const [newUser] = await connection.query(
      'SELECT id, username FROM users WHERE id = ?;',
      [result.insertId]
    );
    return newUser[0]
  }

  // Iniciar sesión
  static async login({ username, password }) {
    // Buscar el usuario en la base de datos
    const [user] = await connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (user.length === 0) {
      throw new Error('Incorrect login or password')
    }
    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user[0].password)
    if (!isMatch) {
      throw new Error('Incorrect login or password')
    }
    return user[0] // Retornar el usuario encontrado
  }
}