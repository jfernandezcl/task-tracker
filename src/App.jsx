import './App.css'
import TaskList from './components/TaskList.jsx'

function App() {


  return (
    <>
      <div className='container-main'>
        <h1 className='main-title'>Task Tracker</h1>
        <TaskList />
      </div>
    </>
  )
}

export default App
