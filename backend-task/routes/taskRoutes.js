import { Router } from "express";
import { TaskControllers } from "../controllers/taskControllers.js";
import { authenticateToken } from "../middlewares/usersMiddlewares.js";

export const taskRouter = ({ taskModel }) => {
  const taskRouter = Router();

  const taskController = new TaskControllers({ taskModel });

  taskRouter.get(
    "/",
    authenticateToken,
    taskController.getAll.bind(taskController)
  );
  taskRouter.post(
    "/",
    authenticateToken,
    taskController.create.bind(taskController)
  );
  taskRouter.delete(
    "/:id",
    authenticateToken,
    taskController.delete.bind(taskController)
  );
  taskRouter.patch(
    "/:id/completed",
    authenticateToken,
    taskController.updateTaskCompleted.bind(taskController)
  );
  return taskRouter;
};
