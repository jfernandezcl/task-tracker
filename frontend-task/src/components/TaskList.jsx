import { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx'
import TaskItem from './TaskItem.jsx';


function TaskList() {
  const [displayLists, setDisplayLists] = useState([]);

  useEffect(() => {
    // Hacer la petición GET para cargar las tareas del backend
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks')
        const tasks = await response.json()
        setDisplayLists(tasks)
      } catch (error) {
        console.error('Error when loading tasks:', error)
      }
    }
    fetchTasks()
  }, []);

  // Función para agregar una tarea a la lista
  const addTask = (newTask) => {
    setDisplayLists([...displayLists, newTask])
    console.log(newTask)
  }

  // Función para alternar: completado o no
  const handleToggleTask = (index) => {
    const updatedTask = displayLists.map((task, i) => {
      return i === index ? { ...task, completed: !task.completed } : task
    })
    setDisplayLists(updatedTask);
  }

  const handleDeleteTask = (index) => {
    const taskslist = displayLists.filter((_, i) => i !== index)
    setDisplayLists(taskslist)
  }

  return (
    <>
      <TaskForm onAddTask={addTask} />
      <ul style={{ padding: "0" }}>
        {displayLists.map((task, index) => (
          <TaskItem
            key={task.id || index}
            task={task}
            onToggle={() => handleToggleTask(index)}
            onToggleDelete={() => handleDeleteTask(index)}
          />
        ))}
      </ul>
    </>
  )
}

export default TaskList;