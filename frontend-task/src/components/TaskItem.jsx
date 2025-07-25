import "../styles/TaskItem.css";
import iconDelete from "../images/iconDelete.svg";

function TaskItem({ task, onToggle, onToggleDelete }) {
  return (
    <li className="taskitem">
      <div className="taskitem-checkbox">
        <input
          type="checkbox"
          onChange={onToggle}
          checked={task.completed || false}
        />
      </div>

      <div className="taskitem-text" onClick={onToggle}>
        <span className={task.completed ? "taskitem-completed" : ""}>
          {task.text}
        </span>
      </div>

      <div className="taskitem-delete">
        <button className="taskitem-delete-button" onClick={onToggleDelete}>
          <img
            className="taskitem-delete-icon"
            src={iconDelete}
            alt="delete icon"
          />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
