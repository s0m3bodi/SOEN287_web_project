import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import { courses as hardcodedCourses } from "./components/Data";
function App(){
    const [courses, setCourses] = useState(hardcodedCourses);

    const updateCourse = (updatedCourse) => {
        setCourses(prevCourses => {
          const existingCourse = prevCourses.find(course => course.id === updatedCourse.id);
           if (existingCourse) {
            // Update existing course
            return prevCourses.map(course =>
                course.id === updatedCourse.id ? updatedCourse : course
            );
        } else {
            // Add new course
            return [...prevCourses, updatedCourse];
        }
        });    
    };

  

  return(
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/student/*" element={<StudentPage/>}/>
        <Route path="/teacher" element={<TeacherPage courses={courses} onUpdateCourse={updateCourse}/>}/>
        <Route path="/course/:id" element={<CourseManagementPage courses={courses} onUpdateCourse={updateCourse} />} />
      </Routes>
    </Router>
  );
}

export default App;