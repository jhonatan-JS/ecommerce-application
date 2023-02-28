import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />;
      <Route path="/home" element={<Home />} />;
      <Route path="/register" element={<Register />} />;
    </Routes>
  );
};

export default RoutesApp;
