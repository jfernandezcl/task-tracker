// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import TaskList from "../components/TaskList";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
