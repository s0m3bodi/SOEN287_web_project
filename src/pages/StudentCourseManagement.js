// StudentCourseManagement.jsx
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import "../pagesCSS/StudentCSS/StudentProfile.css"; // reuse your CSS

function StudentCourseManagement() {
  const { id } = useParams();
  const location = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const teacherCourses = JSON.parse(localStorage.getItem("teacherCourses") || "[]");
  const course = location.state?.course || teacherCourses.find(c => c.id === Number(id));

  if (!course) {
    return <h2>Course not found</h2>;
  }

  // Handle file uploads (frontend only)
  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  }

  return (
    <div className="details-section">
    <h2>{course.code} : {course.name}</h2>
      {/* Course Overview */}
      <div className="course-section-card">
        <h3>Course Overview</h3>
        <p><b>Term:</b> {course.term}</p>
        <p><b>Instructor:</b> {course.instructor}</p>
        <p><b>Email:</b> <a href={`mailto:${course.instructorEmail}`}>{course.instructorEmail}</a></p>
      </div>

      {/* Announcements */}
      <div className="course-section-card">
        <h3>Announcements</h3>
        {course.announcements && course.announcements.length > 0 ? (
          <ul>
            {course.announcements.map((ann, i) => (
              <li key={i}><b>{ann.date}:</b> {ann.message}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements yet.</p>
        )}
      </div>

      {/* File Upload */}
      <div className="course-section-card">
        <h3>Upload Files</h3>
        <input type="file" multiple onChange={handleFileUpload} />
        {uploadedFiles.length > 0 && (
          <ul>
            {uploadedFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default StudentCourseManagement;