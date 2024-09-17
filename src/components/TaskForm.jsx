import { useState } from "react";
import '../styles/TaskForm.css'


function TaskForm({ onAddTask }) {
  const [addForm, setAddForm] = useState("")

  const handleInputChange = (event) => {
    setAddForm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (addForm.trim() !== '') {
      onAddTask({ text: addForm, completed: false })
      setAddForm("");
    }
  }

  return (
    <>
      <form
        className="container-form"
        onSubmit={handleSubmit}>
        <label className="form-label">
          <input
            className="form-input"
            type="text"
            value={addForm}
            onChange={handleInputChange}
            placeholder="Writing the task"
          />
        </label>
        <button type="submit">Save</button>
      </form>

    </>
  )
}

export default TaskForm;