export class TaskControllers {
  constructor({ taskModel }) {
    this.taskModel = taskModel;
  }

  getAll = async (req, res) => {
    try {
      console.log("📥 Petición recibida en getAll");
      console.log("🧑 Usuario autenticado:", req.user);

      const tasks = await this.taskModel.getAll();
      console.log("✅ Tareas obtenidas:", tasks);
      res.json(tasks);
    } catch (error) {
      console.error("❌ Error en getAll:", error); // Esto es importante
      res.status(500).json({ message: "Internal server error" });
    }
  };

  create = async (req, res) => {
    try {
      if (!req.body.text) {
        return res.status(400).json({ message: "Task text is required" });
      }

      const newTask = await this.taskModel.create({
        input: { text: req.body.text },
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Error creating task" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const cleanedId = id.trim();

      const result = await this.taskModel.delete({ id: cleanedId });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error when deleting" });
    }
  };

  updateTaskCompleted = async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid completed value" });
      }

      if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid completed value" });
      }

      const result = await this.taskModel.updateTaskCompleted(id, completed);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating task" });
    }
  };
}
