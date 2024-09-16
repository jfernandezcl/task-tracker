import { useState } from "react";

const TaskForm = () => {
  const [addForm, setAddForm] = useState("")

  const handleInputChange = (event) => {
    setAddForm(event.target.value);
  }

  return (
    <>
      <div>
        <label>
          Enter task:
          <input
            type="text"
            value={addForm}
            onChange={handleInputChange}
            placeholder="Writing the task"
          />
        </label>
        <button>Enter</button>
      </div>
    </>
  )
}

export default TaskForm;