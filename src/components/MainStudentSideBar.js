import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MainStudentSideBar({theme}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authUser');
        navigate('/', { replace: true });
    };

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
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowX: "hidden"
        }}>
            <div className={theme === "light" ? "sidebar light-sidebar" : "sidebar dark-sidebar"}>
                <h2>Home Page</h2>

                <nav>
                    <p><Link to="/student" style={{color: "white"}}>Dashboard</Link></p>
                    <p><Link to="/student/profile" style={{color: "white"}}>Profile</Link></p>
                    <p><Link to="/student/courses" style={{color: "white"}}>Courses</Link></p>
                    <p><Link to="/student/assessments" style={{color: "white"}}>Assessments</Link></p>
                    <p><Link to="/student/progress" style={{color: "white"}}>Progress</Link></p>
                    <p><Link to="/student/calendar" style={{color: "white"}}>Calendar</Link></p>
                </nav>
            </div>
            
            <button 
                onClick={handleLogout} 
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            
            >
                Sign Out
            </button>
        </div>
    );
}

export default MainStudentSideBar;
