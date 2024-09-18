import { useState } from "react";
import '../styles/TaskForm.css'
import icon from '../images/iconEnter.svg'


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
        <button
          className="button-save"
          type="submit"
        >
          <img src={icon} alt="icono enter" />
        </button>
      </form>

    </>
  )
}

export default TaskForm;