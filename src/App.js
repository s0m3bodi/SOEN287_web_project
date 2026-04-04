import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentProfile from "./pages/StudentProfile";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import ManageAssessments from "./pages/ManageAssessments";
import { courses as hardcodedCourses } from "./components/Data";

function App(){
    const [courses, setCourses] = useState(hardcodedCourses); //initiates the array with the data stored in Data.js needs to be here so updates work

    const updateCourse = (updatedCourse) => { //function to update courses
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

    const deleteCourse = (courseId) => {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    };

  
// needs to have both courses and onUpdateCourses to work since it has hardcoded and not values
    
  return(
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/student/*" element={<StudentProfile/>}/>
        <Route 
          path="/teacher"
          element={<TeacherPage courses={courses} onUpdateCourse={updateCourse}/>}
        />
        <Route 
          path="/course/:id" 
          element={
            <CourseManagementPage 
              courses={courses} 
              onUpdateCourse={updateCourse}
              onDeleteCourse={deleteCourse} 
            />
          } 
        />
        <Route 
          path="/course/:id/assessments" 
          element={
            <ManageAssessments
              courses={courses}
              onUpdateCourse={updateCourse}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
