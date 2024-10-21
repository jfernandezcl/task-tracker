import express from 'express'
import { taskRouter } from './routes/taskRoutes.js'
import { corsMiddlewares } from './middlewares/corsMiddlewares.js'
import dotenv from 'dotenv'
import { usersRouter } from './routes/usersRouter.js'
import { json } from 'express'

dotenv.config()

export const createApp = ({ taskModel, usersModel }) => {
  const app = express()

  app.use(json())
  app.use(corsMiddlewares())
  app.disable('x-powered-by')

  // Rutas de usuarios
  app.use('/users', usersRouter({ usersModel }))

  app.use('/task', taskRouter({ taskModel }))

  return app

}

