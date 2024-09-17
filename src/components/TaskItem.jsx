function TaskItem({ task, onToggle }) {


  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
      />
      <span
        style={{ textDecoration: task.completed ? "line-thoriugh" : "none" }}
        onClick={onToggle}
      >
        {task.text}
      </span>
    </li>
  )
}


export default TaskItem;