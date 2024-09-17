function TaskItem({ task, onToggle }) {


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
    </li>
  )
}


export default TaskItem;