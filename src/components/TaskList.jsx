import { useState } from 'react';
import TaskForm from './components/TaskForm.jsx'

const TaskList = () => {
  const [displayList, setDisplayList] = useState([]);

  const addTask = (newTask) => {
    setDisplayList([...displayList, newTask])
  }

  return (
    <>
      <TaskForm onAddTask={addTask} />
      <ul>
        {displayList.map((task, index) => {
          <li key={index}>{task}</li>
        })}
      </ul>
    </>
  )
}

export default TaskList;