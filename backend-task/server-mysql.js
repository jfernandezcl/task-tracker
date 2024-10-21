import { createApp } from './app.js'
import { TaskModel } from './model/taskModel.js'
import { UsersModel } from './model/usersModel.js'

// crear las instancias de los modelos
const taskModel = new TaskModel()
const usersModel = new UsersModel()

// crear la aplicacion pasándole las instancias de los modelos y asigna a una variable
const app = createApp({ taskModel, usersModel })

const desiredPort = process.env.PORT ?? 3000

app.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})