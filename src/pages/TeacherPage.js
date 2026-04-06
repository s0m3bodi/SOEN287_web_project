import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import { useTheme } from '../context/ThemeContext';
import '../pagesCSS/TeacherPage.css'

//the on update is important so when something is changed it also shows on the homepage and side bar



const TeacherPage = ({ courses, onUpdateCourse }) => { //home page with hardcoded + added courses(onUpdate)
   
    const [newCourse, setNewCourse] = useState({ code: '', name: '', term: '', assessments: [] }); //new courses
    const [showAddModal, setShowAddModal] = useState(false); //shows a menu when click on addcourse to add a course
    
    const { theme, toggleTheme } = useTheme();
    
    const [teacher, setTeacher] = useState({
        firstName: "",
        lastName: "",
        email: "",
        id: ""
    });
    const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
const [unsaved, setUnsaved] = useState(false);


    useEffect(() => {
        const stored = localStorage.getItem("currentTeacher");
        if (stored) {
      const profile = JSON.parse(stored);
      setTeacher({
        firstName: profile.firstName,
        lastName: profile.lastName,
        id: profile.id,
        email: profile.email
      });
    }
  }, []);

   const handleEdit = () => {
    setForm({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email
    });
    setEditing(true);
    setUnsaved(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
   setUnsaved(true);
};
   
   const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      alert("All fields are required.");
      return;
    }

     // update currentTeacher in localStorage
    const stored = JSON.parse(localStorage.getItem("currentTeacher") || "{}");
    const updated = {
      ...stored,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email
    };
    localStorage.setItem("currentTeacher", JSON.stringify(updated));

    // if registered teacher, also update in registeredTeachers array
    const registeredTeachers = JSON.parse(localStorage.getItem("registeredTeachers") || "[]");
    const updatedTeachers = registeredTeachers.map(t =>
      t.id === stored.id ? { ...t, firstName: form.firstName, lastName: form.lastName, email: form.email } : t
    );
    localStorage.setItem("registeredTeachers", JSON.stringify(updatedTeachers));

    setTeacher(prev => ({
      ...prev,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email
    }));
    setUnsaved(false);
    setEditing(false);
     alert("Profile saved successfully!");
  };

  const handleCancel = () => {
    if (unsaved) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (!confirm) return;
    }
    setEditing(false);
    setUnsaved(false);
  };


    const handleInputChange = (e) => { //handles the input for new courses (like set in java)
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value }); 
    };

    const addCourse = () => { //adds new course to array
        const newId = courses.length > 0 ? Math.max(courses.map(course => course.id)) + 1 : 1; //resizes array to fit 1 more 
        const courseToAdd = { id: newId, ...newCourse, isActive: true, totalStudents: 300 }; //creates new array object then copies new course in it, sets active to true and total students to 300 by default
    
        onUpdateCourse(courseToAdd); //updates everything

        setNewCourse({ code: '', name: '', term: '', assessments: [] }); //resets newcourse if want to add more
        setShowAddModal(false); //closes the menu for adding courses
    };

    const toggleActive = (courseId) => { //to make it active/inactive goes by array index
        onUpdateCourse({ //so it updates
            ...courses.find(course => course.id === courseId), //searches array for index then copies the info on the updated
            isActive: !courses.find(course => course.id === courseId).isActive  //makes it active/inactive if found
        });
   
    };


    return (
        <div className={`theme-${theme}`} style={{ display: "flex", minHeight: "100vh" }}> {/*anything on style can be moved to future css file*/}
            <TeacherSidebar courses={courses}/> {/*courses={course} prints the array and onAddCourse={( ... makes the menu for adding a course show by setting it active*/}
            <main style={{ flex: 1, position: 'relative' }}> {/* the filter goes though the array to only print the active ones on the main page*/}
                <button className="theme-toggle-btn" onClick={toggleTheme} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    Toggle Theme
                </button>
                <h1>Courses</h1>
                 {/* Teacher profile info */}
        <div className="teacher-profile-box">
            {editing ? (
            <>
              <div className="teacher-edit-field">
                <label>First Name:</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} />
              </div>
              <div className="teacher-edit-field">
                <label>Last Name:</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} />
              </div>
              <div className="teacher-edit-field">
                <label>Email:</label>
                <input name="email" value={form.email} onChange={handleChange} />
              </div>
              <p className="teacher-profile-id">Teacher ID: {teacher.id}</p>
               {unsaved && (
                <p style={{ color: "#A9445A", fontSize: "13px", marginBottom: "8px" }}>
                  ● Unsaved changes
                </p>
              )}

              <div className="teacher-button-group">
                <button className="teacher-save-btn" onClick={handleSave}>Save</button>
                <button className="teacher-cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="teacher-profile-name">{teacher.firstName} {teacher.lastName}</p>
              <p className="teacher-profile-meta">Teacher ID: {teacher.id}</p>
              <p className="teacher-profile-meta">Email: {teacher.email}</p>
              <button className="teacher-edit-btn" onClick={handleEdit}>Edit Profile</button>
            </>
          )}
        </div>

        {/* Add course button/modal */}
        {!showAddModal ? (
          <button id="add" onClick={() => setShowAddModal(true)}>
            Add Course +
          </button>
        ) : (
          <div className="addMenu">
            <h2>Add New Course</h2>
            <div className="new-courseinfo">
              <label>Enter course code:
                <input
                  className="boxforcode"
                  name="code"
                  value={newCourse.code}
                  onChange={handleInputChange}
                  placeholder="Course Code e.g. SOEN 287"
                />
              </label>
              <label>Enter course name:
                <input
                  className="boxforname"
                  name="name"
                  value={newCourse.name}
                  onChange={handleInputChange}
                  placeholder="Course Name"
                />
              </label>
              <label>Enter course term:
                <input
                  className="boxforterm"
                  name="term"
                  value={newCourse.term}
                  onChange={handleInputChange}
                  placeholder="Term"
                />
              </label>
            </div>
            <button onClick={addCourse}>Add Course</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        )}

        {/* Course grid */}
        <div className="course-grid">
          {courses.filter(course => course.isActive).map(course => (
            <Link key={course.id} to={`/course/${course.id}`} className="course-link">
              <div className="course">
                <h2>{course.code}</h2>
                <p>{course.name}</p>
                <p>{course.term}</p>
                <div className="coursecontent">
                  <button onClick={(e) => {
                    e.preventDefault();
                    toggleActive(course.id);
                  }}>
                    Mark as {course.isActive ? "Inactive" : "Active"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeacherPage;
         
    



 