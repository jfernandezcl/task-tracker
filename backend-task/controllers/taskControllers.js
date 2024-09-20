export class TaskControllers {
  constructor({ taskModel }) {
    this.taskModel = taskModel
  }

  getAll = async (req, res) => {
    const tasks = await this.taskModel.getAll()
    res.json(tasks)
  }
}
