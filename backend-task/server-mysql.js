import { createApp } from './app.js'
import { TaskModel } from './model/taskModel.js'
import { UsersModel } from './model/usersModel.js'

// crea la aplicación pasandole las tareas y usuarios
createApp({ taskModel: TaskModel, usersModel: UsersModel })