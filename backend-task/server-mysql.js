import { createApp } from './app.js'
import { TaskModel } from './model/taskModel.js'

// crea la aplicación pasandole las tareas
createApp({ taskModel: TaskModel })