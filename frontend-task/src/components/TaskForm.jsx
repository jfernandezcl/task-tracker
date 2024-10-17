import { useState } from "react";
import '../styles/TaskForm.css'
import icon from '../images/iconEnter.svg'
import Navbar from "./Navbar";


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
        const response = await fetch('http://localhost:3000/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newTask.text }), // Asegurar que es texto
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

      <div>
        <Navbar />
      </div>

      <div className="form">
        <h1 className="form-label">
          Task Tracker
        </h1>
        <form
          onSubmit={handleSubmit}>
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
      </div>


    </>
  )
}

export default TaskForm;