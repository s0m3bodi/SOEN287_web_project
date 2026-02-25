import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const CourseManagementPage = ({ courses, onUpdateCourse }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const hardcodedCourses = courses.find(course => course.id === parseInt(id)) || {};
    
    const [courseData, setCourseData] = useState(hardcodedCourses);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const toggleActive = () => {
        setCourseData({ ...courseData, isActive: !courseData.isActive });
    };

    const addAssignment = () => {
        const newAssignment = { 
            type: "", 
            weight: 0, 
            completed: 0 
        };
        setCourseData({
            ...courseData,
            assessments: [...courseData.assessments, newAssignment]
        });
    };

    const handleAssignmentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAssessments = [...courseData.assessments];
        updatedAssessments[index][name] = value;
        setCourseData({ ...courseData, assessments: updatedAssessments });
    };

    const handleSaveChanges = () => {
        onUpdateCourse(courseData);
        navigate("/teacher");
    };


    return (
        <div>
            <h1>Manage Course: {courseData.name}</h1>
            <div>
                <h2>Course Info</h2>
                <label>
                    Name: 
                    <input
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Code: 
                    <input name="code" value={courseData.code} onChange={handleInputChange} />
                </label>
                <label>
                    Term: 
                    <input name="term" value={courseData.term} onChange={handleInputChange} />
                </label>
                <button onClick={toggleActive}>
                    Mark as {courseData.isActive ? "Inactive" : "Active"}
                </button>
                <p>Status: {courseData.isActive ? "Active" : "Inactive"}</p>
            </div>
            
            <div>
                <h2>Assignments</h2>
                {courseData.assessments.map((assessment, index) => (
                    <div key={index}>
                        <input 
                            name="type" 
                            placeholder="Type" 
                            value={assessment.type} 
                            onChange={(e) => handleAssignmentChange(index, e)} 
                        />
                        <input 
                            name="weight" 
                            type="number" 
                            placeholder="Weight" 
                            value={assessment.weight} 
                            onChange={(e) => handleAssignmentChange(index, e)} 
                        />
                        <input 
                            name="completed" 
                            type="number" 
                            placeholder="Completed" 
                            value={assessment.completed} 
                            onChange={(e) => handleAssignmentChange(index, e)} 
                        />
                    </div>
                ))}
                <button onClick={addAssignment}>Add Assignment</button>
            </div>
             <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={() => navigate("/teacher")}>Back to Home</button>
        </div>
    );
};

export default CourseManagementPage;