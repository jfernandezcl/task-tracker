import './App.css'
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TaskList from './components/TaskList.jsx'
import { Router, Route } from "wouter";

function App() {

  return (
    <>
      <Router>
        <Route path="/" component={TaskList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </>
  )
}

export default App
