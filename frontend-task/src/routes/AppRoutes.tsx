// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import TaskList from "../components/TaskList";
import ProtectedRouter from "../authenticity/ProtectedRouter";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
      path="/" 
      element={
        <ProtectedRouter>
          <TaskList />
        </ProtectedRouter>
      } 
      />
    </Routes>
  );
};

export default AppRoutes;
