import { useState } from "react";


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
      <form onSubmit={handleSubmit}>
        <label>
          Enter task:
          <input
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