import { Router } from "express";
import { TaskControllers } from "../controllers/taskControllers";

export const createTaskRouter = ({ taskModel }) => {
  const taskRouter = Router() // definir rutas y asociarlas con funciones (GET, POST...)

  const newTaskController = new TaskControllers({ taskModel })

  taskRouter.get('/', newTaskController.getAll)
  taskRouter.post('/', newTaskController.create)
  taskRouter.delete('/', newTaskController.delete)
}
