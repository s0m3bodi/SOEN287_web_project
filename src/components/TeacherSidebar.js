import { Link, useNavigate } from "react-router-dom";
import '../pagesCSS/TeacherSidebar.css'

const TeacherSidebar = ({courses}) => {//courses are the hardcoded ones, onAddCourse is for the new ones
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('authUser');
        navigate('/', { replace: true });
    };

    return(
        <div className="sidebar">
            <h2>Courses</h2>
                {/*goes through array of courses(hardcoded) and does whats inside the ()*/} 
                {courses.map(course =>(
                    <Link key={course.id} to={`/course/${course.id}`}> {/*creates a link for each array id to= is how its gonna appear on the search bar on the top key so they have different ids*/}
                        <div>{course.name}</div> 
                    </Link>
                ))}
            {/*
            <div>
                <button onClick={onAddCourse}>Add Course</button> {/*button to add a course
            </div>
            */}
            
            <div className="signOut">
                <button onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}



export default TeacherSidebar;