import { Router } from "express";
import { TaskControllers } from "../controllers/taskControllers.js";

export const taskRouter = ({ taskModel }) => {
  const taskRouter = Router() // definir rutas y asociarlas con funciones (GET, POST...)

  const taskController = new TaskControllers({ taskModel })

  taskRouter.get('/', taskController.getAll)
  taskRouter.post('/', taskController.create)
  taskRouter.delete('/:id', taskController.delete)
  taskRouter.patch('/:id/completed', taskController.updateTaskCompleted)

  return taskRouter
}
