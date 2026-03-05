import React from 'react';
import { Link } from "react-router-dom";
import '../pagesCSS/TeacherSidebar.css'
//supposed to be the same look as student sidebar to be pretty can change it if you want
const TeacherSidebar = ({ courses, onAddCourse }) => { //courses are the hardcoded ones //onAddCourse is for the new ones
    return (
        <div className="sidebar" style={{ //style copied from the student one so they are cohesive can change
            width: "250px",
            height: "100vh",
            backgroundColor: "#590016",
            color: "white",
            padding: "20px",
            marginRight:"30px"
        
        }}>
        <h2>Courses</h2> {/*just what apeears on top of sidebar */}
        <Link to="/teacher"> {/* this is the home button that links to the home page can change to not be a button but dont change link */}
         <button>Home</button> {/*whats written on the button*/}
        </Link>
        {/*courses.map goes though the array courses(hardcoded) and does whats inside the()*/}
        {courses.map(course => ( 
            <Link key={course.id} to={`/course/${course.id}`}>{/*creates a link for each array id to=is how its gonna appear on the search bar on the top key is just so they have different ids*/}
                <div>{course.name}</div> {/*whats written on the link*/}
            </Link>
        ))}
        <button onClick={onAddCourse}>Add Course</button> {/*button to add a course needs to stay a button*/}
        </div>
    );
};



export default TeacherSidebar;