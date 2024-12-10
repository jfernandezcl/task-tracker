import { usersValidations } from '../validationsRegister/usersValidations.js'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export class UsersControllers {
  constructor({ usersModel }) {
    this.usersModel = usersModel
  }

  //método para regitrar un nuevo usuario
  async register(req, res) {
    console.log('Datos enviados:', req.body);
    try {

      // Realizar las validaciones del usuario
      usersValidations(req.body)

      // crear el nuevo usuario
      const user = await this.usersModel.create(req.body)
      console.log('Usuario devuelto:', user)
      res.status(201).json(user) // devolver el nuevo usuario creado
    } catch (error) {
      console.error("Error durante el registro:", error);
      res.status(400).json({ error: error.message || "Error desconocido" }); // devolver el mensaje de error
    }
  }

  // método para iniciar sesión
  async login(req, res) {
    try {
      // autenticar al usuario
      const authenticatedUser = await this.usersModel.login(req.body)

      if (!authenticatedUser) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // crear el token
      const token = jwt.sign({ id: authenticatedUser.id }, jwtSecret, { expiresIn: '1h' })

      // almacenar el token en una cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 36000000 }) // 1 hora
      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  }

  // método para cerrar sesión
  async logout(req, res) {
    try {
      res.clearCookie('token') // limpiar cookie del token
      res.status(200).json('Logged out successfully')
    } catch (error) {
      res.status(500).json({ error: 'Error logging out.' })
    }
  }
}