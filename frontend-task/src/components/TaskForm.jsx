import { useState } from "react";
import '../styles/TaskForm.css'
import icon from '../images/iconEnter.svg'


function TaskForm({ onAddTask }) {
  const [addForm, setAddForm] = useState("")

  const handleInputChange = (event) => {
    setAddForm(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addForm.trim() !== '') {
      const newTask = { text: addForm, completed: false }

      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        })

        if (response.ok) {
          const createdTask = await response.json()
          onAddTask(createdTask) // agregar la tarea a la lista visual
          setAddForm("")
        }
      } catch (error) {
        console.error('Error adding task:', error)
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}>
        <label className="form-label">
          Task Tracker
        </label>
        <div className="container-input">
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