import { Routes, Route} from 'react-router-dom';
import MainStudentSideBar from '../components/MainStudentSideBar';
import defaultPP from "../pages/defaultPP.jpeg"
import '../pagesCSS/StudentCSS/StudentProfile.css';
import { useState } from 'react';

function Dashboard() {
  const courses = [
    { id: 1, name: "SOEN 287", average: 82 },
    { id: 2, name: "COMP 248", average: 74 }
  ];

  const upcoming = [
    { id: 1, title: "Assignment 2", course: "SOEN 287", due: "March 10" },
    { id: 2, title: "Quiz 3", course: "COMP 248", due: "March 12" }
  ];

  const overall =
    courses.reduce((sum, course) => sum + course.average, 0) /
    courses.length;

  const sectionStyle = {
    backgroundColor: "#f5f5f5",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px"
  };

  const progressBarContainer = {
    width: "100%",
    height: "24px",
    backgroundColor: "#d3d3d3",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px"
  };

  return (
    <div className="details-section">
      <h2>Dashboard</h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={sectionStyle}>
          <h3>Overall Average</h3>
          <div style={progressBarContainer}>
            <div
              style={{
                width: `${Math.round(overall)}%`,
                height: "100%",
                backgroundColor: "black",
                color: "white",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "8px"
              }}
            >
              {Math.round(overall)}%
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3>My Courses</h3>
          {courses.map((course) => (
            <p key={course.id}>
              {course.name} - {course.average}%
            </p>
          ))}
        </div>

        <div style={sectionStyle}>
          <h3>Upcoming Assessments</h3>
          {upcoming.length === 0 ? (
            <p>No upcoming assessments</p>
          ) : (
            upcoming.map((item) => (
              <p key={item.id}>
                {item.title} ({item.course}) - Due {item.due}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const [student] = useState({
    firstName: "Veft",
    lastName: "Soen",
    studentId: "40212345",
    email: "veft@email.com",
    role: "Student"
  });

  return (
    <div className="container">
      <div className="profile-section">
        <div>
          <img src={defaultPP} alt="Profile" />
          <p>{student.firstName} {student.lastName}</p>
          <hr />
          <p>{student.role}</p>
        </div>
      </div>

      <div className="details-section">
        <p><b>Student Details</b></p>
        <p>First Name: {student.firstName}</p>
        <p>Last Name: {student.lastName}</p>
        <p>Student ID: {student.studentId}</p>
        <p>Email Address: {student.email}</p>
      </div>
    </div>
  );
}

function Assessments() {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      course: "SOEN 287",
      title: "Assignment 1",
      earned: 85,
      total: 100,
      status: "Completed"
    },
    {
      id: 2,
      course: "SOEN 287",
      title: "Lab 1",
      earned: null,
      total: 10,
      status: "Pending"
    },
    {
      id: 3,
      course: "COMP 248",
      title: "Midterm Exam",
      earned: null,
      total: 100,
      status: "Pending"
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedEarned, setEditedEarned] = useState("");

  function handleDelete(id) {
    setAssessments(assessments.filter((item) => item.id !== id));
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setEditedEarned(item.earned !== null ? item.earned : "");
  }

  function handleSave(id) {
    const updated = assessments.map((item) => {
      if (item.id === id) {
        const newEarned = editedEarned === "" ? null : Number(editedEarned);

        return {
          ...item,
          earned: newEarned,
          status: editedEarned !== "" ? "Completed" : "Pending"
        };
      }
      return item;
    });

    setAssessments(updated);
    setEditingId(null);
    setEditedEarned("");
  }

  const grouped = assessments.reduce((acc, item) => {
    if (!acc[item.course]) {
      acc[item.course] = [];
    }
    acc[item.course].push(item);
    return acc;
  }, {});

  return (
    <div className="details-section">
      <h2>Assessments</h2>

      {Object.keys(grouped).map((courseName) => (
        <div key={courseName}>
          <h3 style={{ marginTop: "30px" }}>{courseName}</h3>

          {grouped[courseName].map((item) => (
            <div key={item.id} className="course-card">
              <p><b>{item.title}</b></p>

              {editingId === item.id ? (
                <>
                  <input
                    type="number"
                    value={editedEarned}
                    onChange={(e) => setEditedEarned(e.target.value)}
                    placeholder="Enter marks"
                  />
                  <button onClick={() => handleSave(item.id)}>Save</button>
                </>
              ) : (
                <>
                  {item.earned !== null ? (
                    <p>{item.earned}/{item.total}</p>
                  ) : (
                    <p>Not graded yet</p>
                  )}

                  <span
                    className={
                      item.status === "Completed"
                        ? "status completed"
                        : "status pending"
                    }
                  >
                    {item.status}
                  </span>

                  <br />

                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Progress() {
  const courses = [
    { name: "SOEN 287", average: 82 },
    { name: "COMP 248", average: 74 }
  ];

  return (
    <div className="details-section">
      <h2>Progress Overview</h2>

      {courses.map((course) => (
        <div key={course.name} style={{ marginBottom: "15px" }}>
          <div
            style={{
              width: "100%",
              height: "25px",
              backgroundColor: "#d3d3d3",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${course.average}%`,
                height: "100%",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "10px",
                fontWeight: "bold"
              }}
            >
              {course.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  return (
    <div className="details-section">
      <h2>Calendar</h2>
      <p>No upcoming events.</p>
    </div>
  );
}

function StudentProfile() {
  return (
    <div>
      <MainStudentSideBar />

      <div
        style={{
          marginLeft: "250px",
          padding: "20px",
          minHeight: "100vh",
          boxSizing: "border-box"
        }}
      >
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="progress" element={<Progress />} />
          <Route path="calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentProfile;
