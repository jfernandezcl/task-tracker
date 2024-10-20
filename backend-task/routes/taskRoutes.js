import { Router } from "express";
import { TaskControllers } from "../controllers/taskControllers.js";
import { authenticateToken } from "../middlewares/usersMiddlewares.js";


export const taskRouter = ({ taskModel }) => {
  const taskRouter = Router() // definir rutas y asociarlas con funciones (GET, POST...)

  const taskController = new TaskControllers({ taskModel })

  taskRouter.get('/', authenticateToken, taskController.getAll)
  taskRouter.post('/', authenticateToken, taskController.create)
  taskRouter.delete('/:id', authenticateToken, taskController.delete)
  taskRouter.patch('/:id/completed', authenticateToken, taskController.updateTaskCompleted)

  return taskRouter
}
