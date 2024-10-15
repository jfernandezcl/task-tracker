import '../styles/TaskItem.css'
import iconDelete from '../images/iconDelete.svg'

function TaskItem({ task, onToggle, onToggleDelete }) {

  return (
    <li className="container-task">
      <div className='container-checkbox'>
        <input
          type="checkbox"
          onChange={onToggle}
          checked={task.completed || false}

        />
      </div>

      <div className='container-text'>
        <span
          className="task-marking"
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
          onClick={onToggle}
        >
          {task.text}
        </span>
      </div>

      <div className='container-button'>
        <button
          className="button-delete"
          onClick={onToggleDelete}
        >
          <img
            className='img-delete'
            src={iconDelete} alt="icon delete" />
        </button>
      </div>
    </li>
  )
}


export default TaskItem;