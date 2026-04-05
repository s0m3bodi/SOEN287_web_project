import { Routes, Route} from 'react-router-dom';
import MainStudentSideBar from '../components/MainStudentSideBar';
import StudentCourseManagement from './StudentCourseManagement';
import defaultPP from "../pages/defaultPP.jpeg"
import '../pagesCSS/StudentCSS/StudentProfile.css';
import '../pagesCSS/StudentCSS/Calendar.css';
// import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { useEffect } from 'react'; 
import StudentCourseManagement from '../pages/StudentCourseManagement';
// helper to get current student ID
function getStudentId() {
  return localStorage.getItem("userId") || "Unknown";
}

// hardcoded student defaults
const hardcodedCourses = [
  { id: 1, name: "SOEN 287", average: 82 },
  { id: 2, name: "COMP 249", average: 74 },
  { id: 3, name: "SOEN 228", average: 84 },
  { id: 4, name: "COMP 232", average: 98 }
];

const hardcodedAssessments = [
  { id: 1, course: "SOEN 287", title: "Assignment 1", earned: 85, total: 100, status: "Completed" },
  { id: 2, course: "SOEN 287", title: "Lab 1", earned: null, total: 10, status: "Pending" },
  { id: 3, course: "COMP 248", title: "Midterm Exam", earned: null, total: 100, status: "Pending" }
];

const hardcodedEnrolledCourses = [
  { code: "SOEN 287", name: "Web Programming", instructor: "Ulrich Smith", term: "Winter 2026" },
  { code: "COMP 249", name: "Object-Oriented Programming II", instructor: "Lee Chang", term: "Winter 2026" },
  { code: "MATH 205", name: "Differential and Integral Calculus II", instructor: "Brown Patel", term: "Winter 2026" }
];

const hardcodedUpcoming = [
  { id: 1, title: "Assignment 2", course: "SOEN 287", due: "March 10" },
  { id: 2, title: "Quiz 3", course: "COMP 248", due: "March 12" },
  { id: 3, title: "Lab Report", course: "SOEN 228", due: "March 17" }
];

// empty defaults for new registered students
const defaultCourses = [];
const defaultAssessments = [];
const defaultEnrolledCourses = [];
const defaultUpcoming = [];

const HARDCODED_STUDENT_ID = "STU-40212345";

function getDefaultForStudent(key) {
  const id = getStudentId();
  const isHardcoded = id === HARDCODED_STUDENT_ID;

  if (key === "dashboard_courses") return isHardcoded ? hardcodedCourses : defaultCourses;
  if (key === "assessments") return isHardcoded ? hardcodedAssessments : defaultAssessments;
  if (key === "enrolled_courses") return isHardcoded ? hardcodedEnrolledCourses : defaultEnrolledCourses;
  if (key === "upcoming") return isHardcoded ? hardcodedUpcoming : defaultUpcoming;
  return [];
}

function loadStudentData(key) {
  const id = getStudentId();
  const stored = localStorage.getItem(`${key}_${id}`);
  return stored ? JSON.parse(stored) : getDefaultForStudent(key);
}

function saveStudentData(key, data) {
  const id = getStudentId();
  localStorage.setItem(`${key}_${id}`, JSON.stringify(data));
}

function Dashboard() {

  const [studentName, setStudentName] = useState("");
  const [courses, setCourses] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("currentStudent");
    if (stored) {
      const profile = JSON.parse(stored);
      setStudentName(profile.firstName);
    }
    setCourses(loadStudentData("dashboard_courses"));
    setUpcoming(loadStudentData("upcoming"));
  }, []);

  const overall =
    courses.length > 0
      ? courses.reduce((sum, course) => sum + course.average, 0) / courses.length
      : 0;

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
    <div className='details-section' >
      <h2>Hi {studentName} 👋</h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className='dashboard-card'>
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
        </div>
        <div className='dashboard-card'>
        <div style={sectionStyle}>
          <h3>My Courses</h3>
          {courses.length === 0 ? (
            <p>No courses enrolled.</p>
          ) : (
           courses.map((course) => (
            <p key={course.id}>
              {course.name} - {course.average}%
            </p>
          ))
        )}
        </div>
        </div>
        <div className='dashboard-card'>
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
    </div>
  );
}

function Profile() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    studentId: "", //starts empty
    email: "",
    role: "Student"
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("currentStudent");
    if (stored) {
      const profile = JSON.parse(stored);
      setStudent({
        firstName: profile.firstName,
        lastName: profile.lastName,
        studentId: profile.id,
        email: profile.email,
        role: "Student"
      });
    }
  }, []);
 
  const handleEdit = () => {
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email
    });
    setEditing(true);
  };

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      alert("All fields are required.");
      return;
    }

      // update currentStudent in localStorage
    const stored = JSON.parse(localStorage.getItem("currentStudent") || "{}");
    const updated = {
      ...stored,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email
    };
    localStorage.setItem("currentStudent", JSON.stringify(updated));

     // if registered student, also update in registeredStudents array
    const registeredStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
    const updatedStudents = registeredStudents.map(s =>
      s.id === stored.id ? { ...s, firstName: form.firstName, lastName: form.lastName, email: form.email } : s
    );
    localStorage.setItem("registeredStudents", JSON.stringify(updatedStudents));

    setStudent(prev => ({
      ...prev,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email
    }));
    setEditing(false);
  };

const handleCancel = () => {
    setEditing(false);
  };


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

         {editing ? (
          <>
            <div style={{ marginBottom: "10px" }}>
              <label>First Name:</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                style={{ display: "block", padding: "8px", width: "100%", marginTop: "4px", borderRadius: "6px", border: "1px solid #ddd" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Last Name:</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                style={{ display: "block", padding: "8px", width: "100%", marginTop: "4px", borderRadius: "6px", border: "1px solid #ddd" }}
              />
              </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Email Address:</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{ display: "block", padding: "8px", width: "100%", marginTop: "4px", borderRadius: "6px", border: "1px solid #ddd" }}
              />
            </div>
<p>Student ID: {student.studentId}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={handleSave}
                style={{ backgroundColor: "#590016", color: "white", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer" }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{ backgroundColor: "#aaa", color: "white", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
          
        <p>First Name: {student.firstName}</p>
        <p>Last Name: {student.lastName}</p>
        <p>Student ID: {student.studentId}</p>
        <p>Email Address: {student.email}</p>
        <button
              onClick={handleEdit}
              style={{ marginTop: "10px", backgroundColor: "#590016", color: "white", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer" }}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Courses(){ 
   const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);

    const [form, setForm] = useState({
    code: "",
    name: "",
    instructor: "",
    term: ""
  });

  useEffect(() => {
    setCourses(loadStudentData("enrolled_courses"));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
    saveStudentData("enrolled_courses", courses);
    // sync dashboard_courses to match enrolled courses
      const dashboardCourses = courses.map((c, index) => {
        // keep existing average if course already exists in dashboard
        const existing = loadStudentData("dashboard_courses");
        const match = existing.find(d => d.name === c.code);
        return {
          id: index + 1,
          name: c.code,
          average: match ? match.average : 0
        };
      });
      saveStudentData("dashboard_courses", dashboardCourses);
    
    }
  }, [courses, loaded]);


  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addCourse = (e) => {
    e.preventDefault();

    if (!form.code || !form.name) {
      alert("Course code and name required");
      return;
    }

    setCourses([...courses, form]);

    setForm({
      code: "",
      name: "",
      instructor: "",
      term: ""
    });
  };

  const deleteCourse = (index) => {
   const courseToDelete = courses[index];

   const updatedCourses = courses.filter((_, i) => i !== index);
  setCourses(updatedCourses);

    const existingAssessments = loadStudentData("assessments");
    saveStudentData("assessments", existingAssessments.filter(a => a.course !== courseToDelete.code));

    const existingUpcoming = loadStudentData("upcoming");
    saveStudentData("upcoming", existingUpcoming.filter(u => u.course !== courseToDelete.code));

    const existingDashboard = loadStudentData("dashboard_courses");
  saveStudentData("dashboard_courses", existingDashboard.filter(d => d.name !== courseToDelete.code));

  };

  return (
    <div className="details-section">

      <h2>My Courses</h2>

      <form onSubmit={addCourse}>
        <input
          name="code"
          placeholder="Course Code"
          value={form.code}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Course Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="instructor"
          placeholder="Instructor"
          value={form.instructor}
          onChange={handleChange}
        />

        <input
          name="term"
          placeholder="Term"
          value={form.term}
          onChange={handleChange}
        />

        <button>Add Course</button>
      </form>

      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
      courses.map((c, index) => (
        <div key={index} className="course-card">
          <h3>{c.code}</h3>
          <p>{c.name}</p>
          <p>{c.instructor}</p>
          <p>{c.term}</p>

          <button onClick={() => deleteCourse(index)}>
            Delete
          </button>
        </div>
      ))
      )}

    </div>
  );
}



function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [loaded, setLoaded] = useState(false); 
  const [editingId, setEditingId] = useState(null);      // missing
  const [editedEarned, setEditedEarned] = useState("");  // missing

  useEffect(() => {
    setAssessments(loadStudentData("assessments"));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
    saveStudentData("assessments", assessments);
    // recalculate average per course and sync to dashboard_courses
      const dashboardCourses = loadStudentData("dashboard_courses");
      const updatedDashboard = dashboardCourses.map(dc => {
        const courseAssessments = assessments.filter(
          a => a.course === dc.name && a.earned !== null
        );
        if (courseAssessments.length === 0) return dc;
        const avg = courseAssessments.reduce(
          (sum, a) => sum + (a.earned / a.total) * 100, 0
        ) / courseAssessments.length;
        return { ...dc, average: Math.round(avg) };
      });
      saveStudentData("dashboard_courses", updatedDashboard);
    }
  }, [assessments, loaded]);

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

      {assessments.length === 0 ? (
        <p>No assessments yet.</p>
      ) : (
      Object.keys(grouped).map((courseName) => (
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
      ))
    )}
    </div>
  );
}

function Progress() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(loadStudentData("dashboard_courses"));
  }, []);

  return (
    <div className="details-section">
      <h2>Progress Overview</h2>

    {courses.length === 0 ? (
        <p>No course data available.</p>
      ) : (
      courses.map((course) => (
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
      ))
    )}
    </div>
  );
}

function Calendar() {
  const [upcoming, setUpcoming] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    course: "",
  });

  useEffect(() => {
    setUpcoming(loadStudentData("upcoming"));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      saveStudentData("upcoming", upcoming);
    }
  }, [upcoming, loaded]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day) => {
    const dateStr = `${monthNames[month]} ${day}`;
    return upcoming.filter(event => event.due === dateStr);
  }

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowForm(false);
    setForm({ title: "", course: "" });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!form.title || !form.course) {
      alert("Title and course are required.");
      return;
    }
    const newItem = {
      id: upcoming.length > 0 ? Math.max(...upcoming.map(u => u.id)) + 1 : 1,
      title: form.title,
      course: form.course,
      due: `${monthNames[month]} ${selectedDay}`
    };
    setUpcoming([...upcoming, newItem]);
    setShowForm(false);
    setForm({ title: "", course: "" });
  };

    const handleDelete = (id) => {
    setUpcoming(upcoming.filter(u => u.id !== id));
  };
 
const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

 

  
  return (
    <div className="details-section">
      <h2>Calendar</h2>
           <div className="calendar-wrapper">
        {/* Header */}
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={prevMonth}>&#8249;</button>
          <span>{monthNames[month]} {year}</span>
          <button className="calendar-nav-btn" onClick={nextMonth}>&#8250;</button>
        </div>
{/* Grid */}
        <div className="calendar-grid">
          {dayNames.map(d => (
            <div key={d} className="calendar-day-header">{d}</div>
          ))}

          {cells.map((day, i) => (
            <div
              key={i}
              className={`calendar-cell ${!day ? "empty" : ""} ${selectedDay === day ? "selected" : ""}`}
              onClick={() => day && handleDayClick(day)}
            >
              {day && (
                <>
                  <div className={`calendar-day-number ${isToday(day) ? "today" : ""} ${selectedDay === day && !isToday(day) ? "selected-day" : ""}`}>
                    {day}
                     </div>
                  {getEventsForDay(day).map(ev => (
                    <span key={ev.id} className="calendar-event-tag" title={ev.title}>
                      {ev.title}
                    </span>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>


        {/* Selected day panel */}
        {selectedDay && (
          <div className="calendar-panel">
            <div className="calendar-panel-header">
              <h3>{monthNames[month]} {selectedDay}, {year}</h3>
              <button
                className="calendar-add-btn"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "+ Add Event"}
              </button>
            </div>

            {showForm && (
              <form className="calendar-form" onSubmit={handleAddEvent}>
                <input
                  placeholder="Assessment Title"
                  value={form.title}
                   onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <input
                  placeholder="Course Code"
                  value={form.course}
                  onChange={e => setForm({ ...form, course: e.target.value })}
                />
                <button className="calendar-save-btn">Save</button>
              </form>
            )}

            <div className="calendar-events-list">
              {selectedEvents.length === 0 ? (
                <p className="calendar-no-events">No events. Click "+ Add Event" to add one.</p>
              ) : (
                selectedEvents.map(ev => (
                  <div key={ev.id} className="calendar-event-item">
                    <div>
                      <span className="event-title">{ev.title}</span>
                      <span className="event-course">{ev.course}</span>
                    </div>
                    <button
                      className="calendar-delete-btn"
                      onClick={() => handleDelete(ev.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
                  

function StudentProfile() {
  // const { theme, toggleTheme } = useTheme(); 
  const [enrolledCourses, setEnrolledCourses] = useState(loadStudentData("enrolled_courses") || []);
  const updateEnrolledCourses = (updated) => { setEnrolledCourses(updated); saveStudentData("enrolled_courses", updated); };
  return (
    <div>
     {/* <div className={theme === "light" ? "light-section" : "dark-section"}>
      <button 
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          zIndex: 1000
        }}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button> */}
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
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<StudentCourseManagement />} />
          <Route path="progress" element={<Progress />} />
          <Route path="Calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentProfile;
