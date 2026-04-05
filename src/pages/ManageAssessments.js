import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import SecondaryTNavbar from '../components/SecondaryTNavbar';
import Assessment from '../components/Assessment';
import '../pagesCSS/ManageAssessments.css';

const ManageAssessments = ({ courses, onUpdateCourse }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Give initial values
    const [course, setCourse] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const foundCourse = courses.find(e => e.id === Number(id)); // To find the course in the courses array using its id
        if (foundCourse) {
            setCourse(foundCourse);
            const assessmentsList = (foundCourse.assessments || []).map(e =>
                new Assessment(e.type, e.name || "", e.deadline || "", e.weight || 0)
            );
            setAssessments(assessmentsList); // Creates an array containing all assessments with their attributes
        }
    }, [id, courses]); // useEffect hook will run once and if id or courses is updated.

    const handleAssignmentChange = (index, e) => { // Handles changes made to an assessment
        const { name, value } = e.target;
        const updatedAssessments = assessments.map((a, i) => {
            if (i !== index) {
                return a;
            }
            let type = a.type;
            let aname = a.name;
            let deadline = a.deadline;
            let weight = a.weight;
            let isActive = a.isActive;

            if (name === "type") {
                type = value;
            } else if (name === "name") {
                aname = value;
            } else if (name === "deadline") {
                deadline = value;
            } else if (name === "weight") {
                weight = Number(value);
            }
            return new Assessment(type, aname, deadline, weight, isActive);
        });
        setAssessments(updatedAssessments);
    };

    const addAssessment = () => { // to add a new assessment
        const newAssessment = new Assessment();
        setAssessments([newAssessment, ...assessments])
        setIsEditing(true);
    };

    const deleteAssessment = (index) => { // to delete an assessment
        setAssessments(assessments.filter((a, i) => i !== index));
    };

    const toggleActive = (index) => {
        const updatedAssessments = assessments.map((a, i) => {
            if (i !== index){
                return a;
            }
            return new Assessment(a.type, a.name, a.deadline, a.weight, !a.isActive);
        });
        setAssessments(updatedAssessments);
    };

    const handleSaveChanges = () => { // to save changes made to an assessment
        const updatedCourse = {
            ...course,
            assessments
        };
        onUpdateCourse(updatedCourse);
        setIsEditing(false);
    };

    if (!course) return <div>Course not found</div> // Prevent the site from breaking
    return (
        <div className="AssessPage">
            <TeacherSidebar courses={courses} style={{margin: 0}}/>
            <main className="mainAssessPage" style={{ flex: 1}}>
                
                <h1>Assessments Manager</h1>
                <div className="AssessHeader">
                    <div>
                        <h2>{course.code}</h2>
                        <p>{course.name}</p>
                        <p>{course.term}</p>
                    </div>
                    <div>
                        <button className="edit" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Stop Editing" : "Edit"}
                        </button>
                    </div>
                </div>

                <SecondaryTNavbar courseId={course.id} />

                <div className="AssessList">

                    {isEditing && (
                        <button className="AddAssessment" onClick={addAssessment}>
                            Add Assessment +
                        </button>
                    )}

                    {[...assessments].sort((a,b) => b.isActive - a.isActive).map((a) => {
                        const realIndex = assessments.indexOf(a);
                        return (
                            <div key={realIndex} className={`AssessCard ${!a.isActive ? "inactive" : ""}`}>
                                <div className="ClosedAssessCard">
                                    <strong>{a.type || "New Assessment"} {a.name || ""} - ({a.weight}%)</strong>
                                    <span> - Due: {a.deadline || "No deadline"}</span>
                                </div>

                                {isEditing && (
                                    <div className="EditAssessCard">
                                        <label>
                                            Type:
                                            <select name="type" value={a.type} onChange={(e) => handleAssignmentChange(realIndex, e)}>
                                                <option value="">Select type</option>
                                                <option value="Assignment">Assignment</option>
                                                <option value="Project">Project</option>
                                                <option value="Quiz">Quiz</option>
                                                <option value="Midterm">Midterm</option>
                                                <option value="Final">Final</option>
                                            </select>
                                        </label>
                                        <label htmlFor="assessName">
                                            Name:
                                            <input type="text" id="assessName" name="name" value={a.name} onChange={(e) => handleAssignmentChange(realIndex, e)}/>
                                        </label>
                                        <label htmlFor="assessDeadline">
                                            Deadline:
                                            <input type="date" id="assessDeadline" name="deadline" value={a.deadline} onChange={(e) => handleAssignmentChange(realIndex, e)}/>
                                        </label>
                                        <label htmlFor="assessWeight">
                                            Weight:
                                            <input type="number" id="assessWeight" name="weight" value={a.weight} onChange={(e) => handleAssignmentChange(realIndex, e)}/>
                                        </label>
                                        <div className="Editing-buttons">
                                            <button className="activate" onClick={() => toggleActive(realIndex)}>
                                                {a.isActive ? "Mark as Inactive" : "Mark as Active"}
                                            </button>
                                            <button className="Delete" onClick={() => deleteAssessment(realIndex)}>
                                                Delete Assessment
                                            </button>
                                        </div>
                                        
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                {isEditing && (
                    <button className="SaveAssessment" onClick={handleSaveChanges}>
                        Save Changes
                    </button>)
                }
                <button className="BackHome" onClick={() => navigate(`/course/${id}`)}>Back to Home</button>
            </main>
        </div>
    );
};

export default ManageAssessments;
