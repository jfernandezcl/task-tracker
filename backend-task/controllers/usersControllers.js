import { usersValidations } from '../validationsRegister/usersValidations'

export class usersControllers {
  constructor({ usersModel }) {
    this.usersModel = usersModel
  }

  //método para regitrar un nuevo usuario
  async create(req, res) {
    try {

      // Realizar las validaciones del usuario
      usersValidations(req.body)

      const user = await this.usersModel.create(req.body)
      res.status(201).json(user) // devolver el nuevo usuario creado
    } catch (error) {
      res.status(400).json({ error: error.message }) // devolver el mensaje de error
    }
  }

  // método para iniciar sesión
  async login(req, res) {
    try {
      const authenticatedUser = await this.usersModel.login(req.body)
      res.status(200).json(authenticatedUser)
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  }

}