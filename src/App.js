import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/student/*" element={<StudentPage/>}/>
        <Route path="/teacher" element={<TeacherPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;