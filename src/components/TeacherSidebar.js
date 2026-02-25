import React from 'react';
import { Link } from "react-router-dom";

const TeacherSidebar = ({ courses, onAddCourse }) => {
    return (
        <div className="sidebar" style={{
            width: "250px",
            height: "100vh",
            backgroundColor: "#590016",
            color: "white",
            padding: "20px",
            marginRight:"30px"
        
        }}>
        <h2>Courses</h2>
        <Link to="/teacher">
         <button>Home</button>
        </Link>
        {courses.map(course => (
            <Link key={course.id} to={`/course/${course.id}`}>
                <div>{course.name}</div>
            </Link>
        ))}
        <button onClick={onAddCourse}>Add Course</button>
        </div>
    );
};



export default TeacherSidebar;