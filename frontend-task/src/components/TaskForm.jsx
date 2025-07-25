import { useState } from "react";
import "../styles/TaskForm.css";
import icon from "../images/iconEnter.svg";
import Navbar from "./Navbar";

function TaskForm({ onAddTask }) {
  const [addForm, setAddForm] = useState("");

  const handleInputChange = (event) => {
    setAddForm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addForm.trim() !== "") {
      const newTask = { text: addForm, completed: false };

      try {
        const response = await fetch("http://localhost:3000/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text: newTask.text }),
        });

        if (response.ok) {
          const createdTask = await response.json();
          onAddTask(createdTask);
          setAddForm("");
        } else {
          console.error("Error adding task:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="taskform-container">
          <h1 className="taskform-title">Add a new task</h1>
          <form className="taskform-form" onSubmit={handleSubmit}>
            <div className="taskform-input-wrapper">
              <input
                className="taskform-input"
                type="text"
                value={addForm}
                onChange={handleInputChange}
                placeholder="Write the task"
              />
              <button className="taskform-button" type="submit">
                <img className="taskform-button-icon" src={icon} alt="enter" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default TaskForm;
