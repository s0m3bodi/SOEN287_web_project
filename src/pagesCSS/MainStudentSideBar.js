import { Link } from "react-router-dom";

function MainStudentSideBar() {
    return (
        <div style={{
            width: "250px",
            height: "100vh",
            backgroundColor: "#590016",
            color: "white",
            padding: "20px",
            marginRight:"30px"
        
        }}>
            <h2>Home Page</h2>

            <nav>
                <p><Link to="/student" style={{color: "white"}}>Home</Link></p>
                <p><Link to="/student/Profile" style={{ color:"white"}}>Profile</Link></p>
                <p><Link to="/student/Assesments" style={{ color: "white"}}>Assesments</Link></p>
                <p><Link to="/student/Progress" style={{ color: "white" }}>Progress</Link></p>

            </nav>
        </div>
    );
}

export default MainStudentSideBar;