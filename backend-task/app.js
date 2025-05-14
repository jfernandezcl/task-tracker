import express from 'express'
import { taskRouter } from './routes/taskRoutes.js'
import { corsMiddlewares } from './middlewares/corsMiddlewares.js'
import dotenv from 'dotenv'
import { usersRouter } from './routes/usersRouter.js'
import { json } from 'express'
import cookieParser from 'cookie-parser'

dotenv.config()

export const createApp = ({ taskModel }, usersModel) => {
  const app = express()

  app.use(express.json())
  app.use((req, res, next) => { // probar si le esta llegando si no borrar
    console.log('Middleware JSON activado. Body recibido:', req.body);
    next();
  });
  app.use(cookieParser());
  app.use(corsMiddlewares())
  app.disable('x-powered-by')

  // Rutas de usuarios
  app.use('/users', usersRouter(usersModel))

  app.use('/task', taskRouter({ taskModel }))

  return app

}

