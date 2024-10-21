import { Router } from "express";
import { UsersControllers } from '../controllers/usersControllers.js'

export const usersRouter = ({ usersModel }) => {
  const myUsersRouter = Router()

  const usersController = new UsersControllers({ usersModel })

  myUsersRouter.post('/register', usersController.create.bind(usersController))
  myUsersRouter.post('/login', usersController.login.bind(usersController))

  return myUsersRouter
}