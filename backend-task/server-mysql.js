import { createApp } from "./app.js";
import { TaskModel } from "./model/taskModel.js";
import { UsersModel } from "./model/usersModel.js";

const taskModel = new TaskModel();

const app = createApp({ taskModel: new TaskModel() }, UsersModel);

const desiredPort = process.env.PORT ?? 3000;

app.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
