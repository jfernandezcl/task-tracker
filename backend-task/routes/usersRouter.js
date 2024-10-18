import { Router } from "express";
import { UsersController } from '../controllers/usersControllers.js'

export const usersRouter = ({ usersModel }) => {
  const myUsersRouter = Router()

  const usersController = new UsersController({ usersModel })
}