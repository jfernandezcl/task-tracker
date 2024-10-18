import { Router } from "express";
import { UsersController } from '../controllers/usersControllers.js'

export const usersRouter = ({ usersModel }) => {
  const myUsersRouter = Router()

  const usersController = new UsersController({ usersModel })

  usersRouter.get('/login', usersController.getAll)
  usersRouter.post('/register', usersController.create)

  return usersRouter
} 