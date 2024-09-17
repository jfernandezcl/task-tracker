import { useState } from 'react';
import TaskForm from './TaskForm.jsx'
import TaskItem from './TaskItem.jsx';


function TaskList() {
  const [displayList, setDisplayList] = useState([]);

  // Función para agregar una tarea a la lista
  const addTask = (newTask) => {
    setDisplayList([...displayList, newTask])
    console.log(newTask)
  }

  // Función para alternar: completado o no
  const handleToggleTask = (index) => {
    const updatedTask = displayList.map((task, i) => {
      return i === index ? { ...task, completed: !task.completed } : task
    })
    setDisplayList(updatedTask);
  }

  return (
    <>
      <TaskForm onAddTask={addTask} />
      <ul>
        {displayList.map((task, index) => (
          <TaskItem
            key={task.id || index}
            task={task}
            onToggle={() => handleToggleTask(index)}
          />
        ))}
      </ul>
    </>
  )
}

export default TaskList;