import { Routes, Route} from 'react-router-dom';
import MainStudentSideBar from '../StudentPage/MainStudentSideBar';
import defaultPP from "../StudentPage/defaultPP.jpeg"
import '../StudentCSS/StudentProfile.css';
import { useState } from 'react';

function Profile(){
    const [student, setStudent] = useState({
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
                    <img src={defaultPP} alt="Profile"/>
                    <p>{student.firstName} {student.lastName}</p>
                    <hr />
                    <p>{student.role}</p>
                </div>
            </div>
           <div className="details-section">
            <p><b>Student Details</b></p><br />
            <p>First Name: {student.firstName}</p><br />
            <p>Last Name: {student.lastName}</p><br />
            <p>Student ID: {student.studentId}</p><br />
            <p>Email Address: {student.email}</p><br />
        </div>
    </div>
    
    );
}
function Assesments(){
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
    setAssessments(assessments.filter(item => item.id !== id));
  }


  function handleEdit(item) {
    setEditingId(item.id);
    setEditedEarned(item.earned || "");
  }

  function handleSave(id) {
    const updated = assessments.map(item => {
      if (item.id === id) {
        const newEarned = Number(editedEarned);
        return {
          ...item,
          earned: newEarned,
          status: newEarned ? "Completed" : "Pending"
        };
      }
      return item;
    });

    setAssessments(updated);
    setEditingId(null);
    setEditedEarned("");
  }

  return (
    <div className="details-section">
      <h2>Assessments</h2>

      {assessments.map(item => {
        return (
          <div key={item.id} className="course-card">
            <h3>{item.course}</h3>
            <p>{item.title}</p>

            {editingId === item.id ? (
              <>
                <input
                  type="number"
                  value={editedEarned}
                  onChange={e => setEditedEarned(e.target.value)}
                  placeholder="Enter marks"
                />
                <button onClick={() => handleSave(item.id)}>Save</button>
              </>
            ) : (
              <>
                {item.earned !== null ? (
                  <p>
                    {item.earned}/{item.total} 
                  </p>
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
        );
      })}
    </div>
  );
}

function Progress(){
  const courses = [
    { name: "SOEN 287", average: 82 },
    { name: "COMP 248", average: 74 }
  ];

  const overall =
    courses.reduce((sum, course) => sum + course.average, 0) /
    courses.length;

  return (
    <div className="details-section">
      <h2>Progress Overview</h2>

      <h3>Overall Average: {Math.round(overall)}%</h3>

      {courses.map(course => (
        <div key={course.name} className="chart-bar">
          <span>{course.name} - {course.average}%</span>
          <div
            className="chart"
            style={{ width: `${course.average}%` }}
          ></div>
        </div>
      ))}
    </div>
  );
}


function StudentProfile(){

    return(
        <div className='student-container'>
            <MainStudentSideBar />
            <Routes>
                <Route path ="profile" element={<Profile/>}/>
                <Route path="assesments" element={<Assesments/>}/>
               
                <Route path="progress" element={<Progress/>}/>
            </Routes>
        </div>
    );
    
}

export default StudentProfile;
