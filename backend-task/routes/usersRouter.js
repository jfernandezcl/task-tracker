import { Router } from "express";
import { UsersControllers } from '../controllers/usersControllers.js'

export const usersRouter = (usersModel) => {
  const myUsersRouter = Router()

  const usersController = new UsersControllers(usersModel)

  myUsersRouter.post('/register', (req, res, next) => {
    console.log('Datos recibidos register:', req.body)
    next()
  }, usersController.register.bind(usersController));
  myUsersRouter.post('/login', usersController.login.bind(usersController));
  myUsersRouter.post('/logout', usersController.logout.bind(usersController));

  return myUsersRouter;
};