import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { SLogin } from "./pages/Auth/Students/SLogin.jsx";
import { SRegister } from "./pages/Auth/Students/SRegister.jsx";
import {ALogin} from "./pages/Auth/Admin/ALogin.jsx"
import { ARegister } from "./pages/Auth/Admin/ARegister.jsx";
import {SuLogin} from "./pages/Auth/SuperAdmin/SuLogin.jsx"
import { SuRegister } from "./pages/Auth/SuperAdmin/SuRegister.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentDashboardPage } from "./pages/Auth/StudentDashboardPage.jsx";

export const App = () => {
  return (
    <>
     <Router>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Student-Login" element={<SLogin />} />
        <Route path="/Student-register" element={<SRegister />} />
         <Route path="/Admin-Login" element={<ALogin />} />
        <Route path="/Admin-register" element={<ARegister />} />
         <Route path="/Super-Login" element={<SuLogin />} />
        <Route path="/Super-register" element={<SuRegister />} />
        <Route path = "/Student-dashboard" element = {<StudentDashboardPage/>} />
      </Routes>
     </Router>
    </>
  );
};
