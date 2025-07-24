import express from "express";
import { taskRouter } from "./routes/taskRoutes.js";
import { corsMiddlewares } from "./middlewares/corsMiddlewares.js";
import dotenv from "dotenv";
import { usersRouter } from "./routes/usersRouter.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRouter.js";

dotenv.config();

export const createApp = ({ taskModel }, usersModel) => {
  const app = express();

  app.use(corsMiddlewares());
  app.use(cookieParser());
  app.use(express.json());
  app.use((req, res, next) => {
    next();
  });
  app.disable("x-powered-by");

  app.use("/api/auth", authRouter);

  app.use("/users", usersRouter(usersModel));

  app.use("/task", taskRouter({ taskModel }));

  return app;
};
