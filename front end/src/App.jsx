import { useState } from "react";
import  Login  from "./pages/Login.jsx";
import  Register  from "./pages/Register.jsx";
import  HomePage  from "./pages/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export const App = () => {
  return (
    <>
     <Router>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
     </Router>
    </>
  );
};
