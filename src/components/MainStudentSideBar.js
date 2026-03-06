import { Link } from "react-router-dom";

function MainStudentSideBar() {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100vh",
            backgroundColor: "#590016",
            color: "white",
            padding: "20px",
            boxSizing: "border-box"
            
        
        }}>
            <h2>Home Page</h2>

            <nav>
  <p><Link to="/student" style={{color: "white"}}>Dashboard</Link></p>
  <p><Link to="/student/profile" style={{color: "white"}}>Profile</Link></p>
  <p><Link to="/student/assessments" style={{color: "white"}}>Assessments</Link></p>
  <p><Link to="/student/progress" style={{color: "white"}}>Progress</Link></p>
  <p><Link to="/student/calendar" style={{color: "white"}}>Calendar</Link></p>
</nav>
        </div>
    );
}

export default MainStudentSideBar;
