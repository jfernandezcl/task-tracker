export class TaskControllers {
  constructor({ taskModel }) {
    this.taskModel = taskModel
  }

  getAll = async (req, res) => {
    try {
      const tasks = await this.taskModel.getAll()
      res.json(tasks)
    } catch (error) {
      console.log('Error fetching task:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
