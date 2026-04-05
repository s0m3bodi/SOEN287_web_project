import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import SecondaryTNavbar from '../components/SecondaryTNavbar';
import Assessment from '../components/Assessment';

const ManageAssessments = ({ courses, onUpdateCourse }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Give initial values
    const [course, setCourse] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [cardIndex, setCardIndex] = useState(null);

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

            if (name === "type") {
                type = value;
            } else if (name === "name") {
                aname = value;
            } else if (name === "deadline") {
                deadline = value;
            } else if (name === "weight") {
                weight = Number(value);
            }
            return new Assessment(type, aname, deadline, weight);
        });
        setAssessments(updatedAssessments);
    };

    const addAssessment = () => { // to add a new assessment
        const newAssessment = new Assessment();
        setAssessments([...assessments, newAssessment])
        setCardIndex(assessments.length);
        setIsEditing(true);
    };

    const deleteAssessment = (index) => { // to delete an assessment
        setAssessments(assessments.filter((a, i) => i !== index));
        if (cardIndex === index) setCardIndex(null);
    };

    const handleSaveChanges = () => { // to save changes made to an assessment
        const updatedCourse = {
            ...course,
            assessments
        };
        onUpdateCourse(updatedCourse);
        setIsEditing(false);
        setCardIndex(null);
    };

    if (!course) return <></>
    return (
        <div className="AssessPage">
            <TeacherSidebar courses={courses}/>
            <main className="mainAssesspage" style={{ flex: 1, padding: "20px"}}>
                {!course && 
                    <div>Course not found</div>}
                
                <div className="AssessHeader">
                    <h1>Assessments Manager</h1>
                    <h2>{course.code}</h2>
                    <h3>{course.name}</h3>
            
                    <button className="edit" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Stop Editing" : "Edit"}
                    </button>
                </div>
                <SecondaryTNavbar courseId={course.id} />
                <div>
                    {assessments.map((a, index) => {
                        const isOpenCard = cardIndex === index;
                        return (
                            <div key={index} onClick={() => isEditing && setCardIndex(isOpenCard ? null : index)}>
                                <h3>{a.name || "Add name"}</h3>

                                {isOpenCard && (
                                    <div>
                                        <label>
                                            Type:
                                            <select name="type" value={a.type} onChange={(e) => handleAssignmentChange(index, e)}>
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
                                            <input type="text" id="assessName" name="name" value={a.name} onChange={(e) => handleAssignmentChange(index, e)}/>
                                        </label>
                                        <label htmlFor="assessDeadline">
                                            Deadline:
                                            <input type="date" id="assessDeadline" name="deadline" value={a.deadline} onChange={(e) => handleAssignmentChange(index, e)}/>
                                        </label>
                                        <label htmlFor="assessWeight">
                                            Weight:
                                            <input type="number" id="assessWeight" name="weight" value={a.weight} onChange={(e) => handleAssignmentChange(index, e)}/>
                                        </label>
                                        <button className="delete" onClick={() => deleteAssessment(index)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {isEditing && <button onClick={addAssessment}>Add Assessment</button>}
                {isEditing && <button onClick={handleSaveChanges}>Save Changes</button>}
                <button onClick={() => navigate("/course/:id")}>Back to Home</button>
            </main>
        </div>
    );
};

export default ManageAssessments;
