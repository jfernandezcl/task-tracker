function TaskItem({ task, onToggle }) {


  return (
    <li>
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