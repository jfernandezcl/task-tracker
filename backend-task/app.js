import express, { json } from 'express'
import { taskRouter } from './routes/taskRoutes.js'
import { corsMiddlewares } from './middlewares/corsMiddlewares.js'
import dotenv from 'dotenv'

dotenv.config()

export const createApp = ({ taskModel }) => {
  const app = express()

  app.use(json())
  app.use(corsMiddlewares())
  app.disable('x-powered-by')

  app.use('/task', taskRouter({ taskModel }))

  const desiredPort = process.env.PORT ?? 3000

  app.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
  })
}

