import { useState, useEffect } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskItem from "./TaskItem.jsx";
import "../styles/TaskList.css";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [displayLists, setDisplayLists] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/task", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const tasks = await response.json();

        if (Array.isArray(tasks)) {
          setDisplayLists(tasks);
        } else {
          setError("Error loading tasks: unexpected format");
        }
      } catch {
        setError("Error loading tasks. Please try again later.");
      }
    };
    fetchTasks();
  }, [navigate]);

  const addTask = (newTask) => {
    setDisplayLists([...displayLists, newTask]);
    console.log(newTask);
  };

  const handleToggleTask = async (index) => {
    const taskToUpdate = displayLists[index];
    const updatedCompleted = !taskToUpdate.completed;

    const updatedTask = displayLists.map((task, i) => {
      return i === index ? { ...task, completed: updatedCompleted } : task;
    });

    setDisplayLists(updatedTask);

    try {
      const response = await fetch(
        `http://localhost:3000/task/${taskToUpdate.id}/completed`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: updatedCompleted }),
        }
      );

      if (!response.ok) {
        throw new Error("Error when updating the task in the database");
      }
    } catch (error) {
      console.error("Error updating task in database:", error);
      setError("Error updating the task. Please try again.");
    }
  };

  const handleDeleteTask = async (index, taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const taskslist = displayLists.filter((_, i) => i !== index);
        setDisplayLists(taskslist);
      } else {
        throw new Error("Error deleting the task.");
      }
    } catch (error) {
      console.error("Error when deleting the task:", error);
      setError("Error deleting the task. Please try again.");
    }
  };

  return (
    <div className="tasklist-container">
      <TaskForm onAddTask={addTask} />
      {error && <p className="tasklist-error">{error}</p>}
      <ul className="tasklist">
        {displayLists.map((task, index) => (
          <TaskItem
            key={task.id || index}
            task={task}
            onToggle={() => handleToggleTask(index)}
            onToggleDelete={() => handleDeleteTask(index, task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
