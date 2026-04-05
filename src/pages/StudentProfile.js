import { Routes, Route} from 'react-router-dom';
import MainStudentSideBar from '../components/MainStudentSideBar';
import defaultPP from "../pages/defaultPP.jpeg"
import '../pagesCSS/StudentCSS/StudentProfile.css';
import { useState } from 'react';
import { useCoursesContext } from '../context/CoursesContext';

function Dashboard({ enrolledCourses }) {
  const upcoming = [
    { id: 1, title: "Assignment 2", course: "SOEN 287", due: "March 10" },
    { id: 2, title: "Quiz 3", course: "COMP 248", due: "March 12" },
    { id: 3, title: "Lab Report", course: "SOEN 228", due: "March 17" }
  ];

  const overall = 0; // placeholder until student grades are tracked

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
      <h2>Hi 👋</h2>

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
          {enrolledCourses.length === 0 ? (
            <p>No courses enrolled yet.</p>
          ) : (
            enrolledCourses.map((course) => (
              <p key={course.id}>
                {course.code} - {course.name}
              </p>
            ))
          )}
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
function Courses({ enrolledCourses, setEnrolledCourses }) {
  const allCourses = useCoursesContext();
  const [selected, setSelected] = useState("");

  const available = allCourses.filter(
    (c) => !enrolledCourses.some((e) => e.id === c.id)
  );

  const handleEnroll = () => {
    if (!selected) return;
    const course = allCourses.find((c) => c.id === parseInt(selected));
    if (course) {
      setEnrolledCourses([...enrolledCourses, course]);
      setSelected("");
    }
  };

  const handleDrop = (id) => {
    setEnrolledCourses(enrolledCourses.filter((c) => c.id !== id));
  };

  return (
    <div className="details-section">
      <h2>My Courses</h2>

      <div style={{ marginBottom: "16px" }}>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="">-- Select a course to add --</option>
          {available.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} - {c.name} ({c.term})
            </option>
          ))}
        </select>
        <button onClick={handleEnroll} disabled={!selected}>Add Course</button>
      </div>

      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        enrolledCourses.map((c) => (
          <div key={c.id} className="course-card">
            <h3>{c.code}</h3>
            <p>{c.name}</p>
            <p>{c.term}</p>
            <p>Status: {c.isActive ? "Active" : "Inactive"}</p>
            <button onClick={() => handleDrop(c.id)}>Drop Course</button>
          </div>
        ))
      )}
    </div>
  );
}



function Assessments({ enrolledCourses }) {
  // grades keyed by "courseId_assessmentIndex" so they persist across re-renders
  const [grades, setGrades] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [editedEarned, setEditedEarned] = useState("");

  function handleEdit(key, currentEarned) {
    setEditingKey(key);
    setEditedEarned(currentEarned !== null ? currentEarned : "");
  }

  function handleSave(key) {
    const newEarned = editedEarned === "" ? null : Number(editedEarned);
    setGrades({
      ...grades,
      [key]: {
        earned: newEarned,
        status: newEarned !== null ? "Completed" : "Pending"
      }
    });
    setEditingKey(null);
    setEditedEarned("");
  }

  return (
    <div className="details-section">
      <h2>Assessments</h2>

      {enrolledCourses.length === 0 ? (
        <p>Enroll in a course to see its assessments.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div key={course.id}>
            <h3 style={{ marginTop: "30px" }}>{course.code} - {course.name}</h3>

            {(!course.assessments || course.assessments.length === 0) ? (
              <p>No assessments for this course yet.</p>
            ) : (
              course.assessments.map((assessment, index) => {
                const key = `${course.id}_${index}`;
                const grade = grades[key] || { earned: null, status: "Pending" };

                return (
                  <div key={key} className="course-card">
                    <p><b>{assessment.type}</b></p>
                    <p>Weight: {assessment.weight}%</p>

                    {editingKey === key ? (
                      <>
                        <input
                          type="number"
                          value={editedEarned}
                          onChange={(e) => setEditedEarned(e.target.value)}
                          placeholder="Enter marks"
                        />
                        <button onClick={() => handleSave(key)}>Save</button>
                      </>
                    ) : (
                      <>
                        {grade.earned !== null ? (
                          <p>{grade.earned}%</p>
                        ) : (
                          <p>Not graded yet</p>
                        )}

                        <span
                          className={
                            grade.status === "Completed"
                              ? "status completed"
                              : "status pending"
                          }
                        >
                          {grade.status}
                        </span>

                        <br />

                        <button onClick={() => handleEdit(key, grade.earned)}>Edit</button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ))
      )}
    </div>
  );
}

function Progress() {
  const courses = [
    { name: "SOEN 287", average: 82 },
    { name: "COMP 249", average: 74 },
    { name: "SOEN 228", average: 84 },
    { name: "COMP 232", average: 98 }
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
              {course.name}: {course.average}%
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
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("enrolledCourses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const updateEnrolledCourses = (courses) => {
    setEnrolledCourses(courses);
    localStorage.setItem("enrolledCourses", JSON.stringify(courses));
  };

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
          <Route index element={<Dashboard enrolledCourses={enrolledCourses} />} />
          <Route path="dashboard" element={<Dashboard enrolledCourses={enrolledCourses} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<Courses enrolledCourses={enrolledCourses} setEnrolledCourses={updateEnrolledCourses} />} />
          <Route path="assessments" element={<Assessments enrolledCourses={enrolledCourses} />} />
          <Route path="progress" element={<Progress />} />
          <Route path="calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentProfile;
