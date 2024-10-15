import './App.css'
import Login from './components/Login.jsx';
import TaskList from './components/TaskList.jsx'
import { Router, Route } from "wouter";

function App() {

  return (
    <>
      <Router base="/">
        <Route path="/app" component={TaskList} />
        <Route path="/login" component={Login} />
      </Router>
    </>
  )
}

export default App
