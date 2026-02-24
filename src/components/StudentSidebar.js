import { Link } from "react-router-dom";

function StudentSidebar() {
    return (
        <div style={{
            width: "250px",
            height: "100vh",
            backgroundColor: "#590016",
            color: "white",
            padding: "20px",
            marginRight:"30px"
        
        }}>
            <h2>My Courses</h2>

            <nav>
                <p><Link to="/student" style={{color: "white"}}>Home</Link></p>
                <p><Link to="/student/course/SOEN287" style={{ color:"white"}}>SOEN 287</Link></p>
                <p><Link to="/student/course/COMP249" style={{ color: "white"}}>COMP 249</Link></p>
                <p><Link to="/student/calendar" style={{ color: "white" }}>Calendar</Link></p>

            </nav>
        </div>
    );
}

export default StudentSidebar;