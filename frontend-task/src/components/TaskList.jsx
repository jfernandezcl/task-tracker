import { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx'
import TaskItem from './TaskItem.jsx';
import '../styles/TaskList.css'


function TaskList() {
  const [displayLists, setDisplayLists] = useState([]);

  useEffect(() => {
    // Hacer la petición GET para cargar las tareas del backend
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/task')
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
  const handleToggleTask = async (index) => {
    const taskToUpdate = displayLists[index]
    const updatedCompleted = !taskToUpdate.completed

    // actualizar el estado local
    const updatedTask = displayLists.map((task, i) => {
      return i === index ? { ...task, completed: updatedCompleted } : task
    })

    setDisplayLists(updatedTask);

    // hacer la llamada a la API para actualizar base de datos
    try {
      await fetch(`http://localhost:3000/task/${taskToUpdate.id}/completed`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: updatedCompleted })
      })
    } catch (error) {
      console.error('Error updating task in database:', error)
    }
  }

  // Función para eliminar una tarea
  const handleDeleteTask = async (index, taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const taskslist = displayLists.filter((_, i) => i !== index)
        setDisplayLists(taskslist) // Actualizar la lista después de eliminar
      }
    } catch (error) {
      console.error('Error when deleting the task:', error)
    }
  }

  return (
    <>
      <TaskForm onAddTask={addTask} />
      <ul className='task-list'>
        {displayLists.map((task, index) => (
          <TaskItem
            key={task.id || index}
            task={task}
            onToggle={() => handleToggleTask(index)}
            onToggleDelete={() => handleDeleteTask(index, task.id)}
          />
        ))}
      </ul>
    </>
  )
}

export default TaskList;