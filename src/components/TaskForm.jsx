import { useState } from "react";
import PropTypes from 'prop-types';


const TaskForm = ({ onAddTask }) => {
  const [addForm, setAddForm] = useState("")

  const handleInputChange = (event) => {
    setAddForm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (addForm.trim() !== '') {
      onAddTask(addForm)
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
        <button type="submit">Enter</button>
      </form>
    </>
  )
}

// Validación de las props 
TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default TaskForm;