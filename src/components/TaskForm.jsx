import { useState } from "react";

const TaskList = () => {
  const [addList, setAddList] = useState(null)

  const handleInputChange = (event) => {
    setAddList(event.target.value);
  }

  return (
    <>
      <div>
        <label>
          Enter task:
          <input
            type="text"
            value={addList}
            onChange={handleInputChange}
            placeholder="Writing the task"
          />
        </label>
        <button>Enter</button>
      </div>
    </>
  )
}

export default TaskList;