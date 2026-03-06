import { Link, useNavigate, userNavigate } from "react-router-dom";
import '../pagesCSS/TeacherSidebar.css'
import { courses } from "./Data";

const TeacherSidebar = ({courses, onAddCourse}) => {//courses are the hardcoded ones, onAddCourse is for the new ones
    const navigate = useNavigate();
    const handleLogout = () =>{
        navigate('/');
    };

    return(
        <div className="sidebar">
            <h2>Courses</h2> {/*just what appears on top of the sidebar*/}

                <Link to="/teacher"> {/*home button that links to the home page*/}
                    <button>Home</button>
                </Link>

                {/*goes through array of courses(hardcoded) and does whats inside the ()*/} 
                {courses.map(course =>(
                    <Link key={course.id} to={`/course/${course.id}`}> {/*creates a link for each array id to=is how its gonna appear on the search bar on the top key so they have different ids*/}
                        <div>{course.name}</div> {/*whats written on the link*/}
                    </Link>
                ))}

            <div>
                <button onClick={onAddCourse}>Add Course</button> {/*button to add a course needs to stay a button*/}
            </div>
            
            <div className="signOut">
                <button onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}



export default TeacherSidebar;