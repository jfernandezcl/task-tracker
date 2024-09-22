export class TaskControllers {
  constructor({ taskModel }) {
    this.taskModel = taskModel
  }

  getAll = async (req, res) => {
    try {
      const tasks = await this.taskModel.getAll()
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  create = async (req, res) => {
    try {
      const newTask = await this.taskModel.create({ input: req.body })
      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ message: 'Error creating task' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params
      const result = await this.taskModel.delete({ id })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error when deleting' })
    }
  }
}
