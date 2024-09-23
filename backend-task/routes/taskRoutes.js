import { Router } from "express";
import { TaskController } from "../controllers/taskControllers";

export const createTaskRouter = ({ taskModel }) => {
  const taskRouter = Router() // definir rutas y asociarlas con funciones (GET, POST...)

  const newTaskController = new TaskController({ taskModel })

  taskRouter.get('/', newTaskController.getAll)

}
