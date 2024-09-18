import '../styles/TaskItem.css'

function TaskItem({ task, onToggle, onToggleDelete }) {

  return (
    <li className="container-task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}

      />
      <span
        className="task-marking"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
        onClick={onToggle}
      >
        {task.text}
      </span>
      <button
        className="button-delete"
        onClick={onToggleDelete}>Delete</button>
    </li>
  )
}


export default TaskItem;