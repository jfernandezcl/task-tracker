import { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import '../styles/TaskList.css';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [displayLists, setDisplayLists] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // redirigir

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token no definido. El usuario no está autenticado.'); // Manejar si no hay token
      navigate('/login');
      return; // Detener la ejecución si no hay token
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const tasks = await response.json();

        if (Array.isArray(tasks)) {
          setDisplayLists(tasks);
        } else {
          console.error('Expected tasks to be an array:', tasks);
          setError('Error al cargar tareas: formato inesperado');
        }
      } catch (error) {
        console.error('Error when loading tasks:', error);
        setError('Error al cargar tareas. Por favor, inténtalo de nuevo más tarde.');
      }
    };
    fetchTasks();
  }, [navigate]);

  // Función para agregar una tarea a la lista
  const addTask = (newTask) => {
    setDisplayLists([...displayLists, newTask]);
    console.log(newTask);
  };

  // Función para alternar: completado o no
  const handleToggleTask = async (index) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no definido. No se puede completar la acción.');
      navigate('/login');
      return;
    }

    const taskToUpdate = displayLists[index];
    const updatedCompleted = !taskToUpdate.completed;

    // Actualizar el estado local
    const updatedTask = displayLists.map((task, i) => {
      return i === index ? { ...task, completed: updatedCompleted } : task;
    });

    setDisplayLists(updatedTask);

    // Hacer la llamada a la API para actualizar base de datos
    try {
      const response = await fetch(`http://localhost:3000/task/${taskToUpdate.id}/completed`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: updatedCompleted }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea en la base de datos');
      }
    } catch (error) {
      console.error('Error updating task in database:', error);
      setError('Error al actualizar la tarea. Por favor, inténtalo de nuevo.');
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (index, taskId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no definido. No se puede completar la acción.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const taskslist = displayLists.filter((_, i) => i !== index);
        setDisplayLists(taskslist); // Actualizar la lista después de eliminar
      } else {
        throw new Error('Error al eliminar la tarea');
      }
    } catch (error) {
      console.error('Error when deleting the task:', error);
      setError('Error al eliminar la tarea. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
      <TaskForm onAddTask={addTask} />
      {error && <p className='error-message'>{error}</p>}
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
  );
}

export default TaskList;
