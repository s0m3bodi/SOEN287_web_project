import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "../components/TeacherSidebar";
import SecondaryTNavbar from "../components/SecondaryTNavbar";
import { useTheme } from '../context/ThemeContext';
import '../pagesCSS/CourseManagement.css';

const ParticipantsPage = ({ courses }) => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [courseData, setCourseData] = useState({ code: "", name: "", term: "" });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // load course info
    const selected = courses.find(c => c.id === parseInt(id));
    if (selected) setCourseData(selected);

    // load all students — hardcoded + registered
    const hardcodedStudent = {
      id: "STU-40212345",
      firstName: "Veft",
      lastName: "Soen",
      email: "veft@email.com",
      username: "usernameReal"
    };

    const registeredStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
    setStudents([hardcodedStudent, ...registeredStudents]);

    // load all teachers — hardcoded + registered
    const hardcodedTeacher = {
      id: "TCH-00000001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@school.com",
      username: "usernameEReal"
    };

    const registeredTeachers = JSON.parse(localStorage.getItem("registeredTeachers") || "[]");
    setTeachers([hardcodedTeacher, ...registeredTeachers]);
  }, [id, courses]);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
    fontSize: "14px"
  };

  const thStyle = {
    backgroundColor: theme === 'dark' ? '#444' : '#590016',
    color: "white",
    padding: "10px 14px",
    textAlign: "left",
    fontWeight: "600"
  };

  const tdStyle = {
    padding: "10px 14px",
    borderBottom: "1px solid #eee",
    color: theme === 'dark' ? '#fff' : '#333'
  };

  const trHoverStyle = {
    backgroundColor: theme === 'dark' ? '#555' : "#f9f9f9"
  };

  const badgeStyle = (type) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "50px",
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: type === "Teacher" ? (theme === 'dark' ? '#666' : '#590016') : (theme === 'dark' ? '#777' : '#A9445A'),
    color: "white"
  });

  return (
    <div className={`theme-${theme}`} style={{ display: "flex", minHeight: "100vh" }}>
      <TeacherSidebar courses={courses} />
      <main style={{ flex: 1 }}>
        <h1>Course Manager</h1>

        <div className="Header">
          <div>
            <h2>{courseData.code}</h2>
            <p>{courseData.name}</p>
            <p>{courseData.term}</p>
          </div>
        </div>

        <SecondaryTNavbar courseId={parseInt(id)} />

        <div style={{ padding: "20px 0" }}>
          <h2>Participants</h2>

          {/* Teachers table */}
          <h3 style={{ color: "#590016", marginBottom: "10px" }}>
            Teachers ({teachers.length})
          </h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Role</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} style={trHoverStyle}>
                  <td style={tdStyle}>{t.firstName} {t.lastName}</td>
                  <td style={tdStyle}>{t.id}</td>
                  <td style={tdStyle}>{t.email}</td>
                  <td style={tdStyle}>{t.username}</td>
                  <td style={tdStyle}>
                    <span style={badgeStyle("Teacher")}>Teacher</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Students table */}
          <h3 style={{ color: "#590016", marginBottom: "10px" }}>
            Students ({students.length})
          </h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Role</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} style={trHoverStyle}>
                  <td style={tdStyle}>{s.firstName} {s.lastName}</td>
                  <td style={tdStyle}>{s.id}</td>
                  <td style={tdStyle}>{s.email}</td>
                  <td style={tdStyle}>{s.username}</td>
                  <td style={tdStyle}>
                    <span style={badgeStyle("Student")}>Student</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && teachers.length === 0 && (
            <p style={{ color: "#888" }}>No participants found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParticipantsPage;