import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentProfile from "./pages/StudentProfile";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import ManageAssessments from "./pages/ManageAssessments";
import { courses as hardcodedCourses } from "./components/Data";
import { CoursesContext } from "./context/CoursesContext";
// import { ThemeProvider, useTheme } from './context/ThemeContext';

// Protected route for role-based access
const ProtectedRoute = ({ role, children }) => {
    const auth = localStorage.getItem('authUser');
    if (auth !== role) return <Navigate to="/" replace />;
    return children;
};



function App() {
    const [courses, setCourses] = useState(hardcodedCourses); // Initiate courses

    const updateCourse = (updatedCourse) => {
        setCourses(prevCourses => {
            const existingCourse = prevCourses.find(course => course.id === updatedCourse.id);
            if (existingCourse) {
                return prevCourses.map(course =>
                    course.id === updatedCourse.id ? updatedCourse : course
                );
            } else {
                return [...prevCourses, updatedCourse];
            }
        });
    };

    const deleteCourse = (courseId) => {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    };

    return (
        
            <CoursesContext.Provider value={courses}>
                <Router>
                     
                    <Routes>
                        <Route path="/" element={<LoginPage />} />

                        <Route path="/student/*" element={
                            <ProtectedRoute role="student">
                                <StudentProfile />
                            </ProtectedRoute>
                        }/>

                        <Route path="/teacher" element={
                            <ProtectedRoute role="teacher">
                                <TeacherPage courses={courses} onUpdateCourse={updateCourse} />
                            </ProtectedRoute>
                        }/>

                        <Route path="/course/:id" element={
                            <ProtectedRoute role="teacher">
                                <CourseManagementPage
                                    courses={courses}
                                    onUpdateCourse={updateCourse}
                                    onDeleteCourse={deleteCourse}
                                />
                            </ProtectedRoute>
                        }/>

                        <Route path="/course/:id/assessments" element={
                            <ProtectedRoute role="teacher">
                                <ManageAssessments
                                    courses={courses}
                                    onUpdateCourse={updateCourse}
                                />
                            </ProtectedRoute>
                        }/>
                    </Routes>
                </Router>
            </CoursesContext.Provider>
       
    );
}
// Optional: Dark/Light Mode Toggle Button
// function ThemeToggle() {
//     const { theme, toggleTheme } = useTheme();
//     return (
//         <button 
//             onClick={toggleTheme} 
//             style={{
//                 position: "fixed",
//                 top: "10px",
//                 right: "10px",
//                 padding: "8px 12px",
//                 backgroundColor: theme === "dark" ? "#333" : "#eee",
//                 color: theme === "dark" ? "#fff" : "#000",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 zIndex: 1000
//             }}
//         >
//             {theme === "dark" ? "Light Mode" : "Dark Mode"}
//         </button>
//     );
// }

export default App;