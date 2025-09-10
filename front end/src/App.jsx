import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <>
      <div>CampusEventHub</div>
     <Router>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
     </Router>
    </>
  );
};
