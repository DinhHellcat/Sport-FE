// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Confirm from "./components/Auth/Confirm";
import User from "./components/User";
import ChangePassword from "./components/Auth/ChangePassword";
import ProdDetail from "./components/ProdDetail";
import AdminLogin from "./components/Auth/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/user" element={<User />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/prod/:id" element={<ProdDetail />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
