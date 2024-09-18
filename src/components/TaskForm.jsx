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
        onSubmit={handleSubmit}>
        <label className="form-label">
          Task Tracker
        </label>
        <div>
          <input
            className="form-input"
            type="text"
            value={addForm}
            onChange={handleInputChange}
            placeholder="Writing the task"
          />
          <button
            className="button-save"
            type="submit"
          >
            <img
              className="img-save"
              src={icon} alt="icono enter" />
          </button>

        </div>
      </form>

    </>
  )
}

export default TaskForm;