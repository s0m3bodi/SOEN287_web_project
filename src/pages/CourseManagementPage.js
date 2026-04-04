import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import '../pagesCSS/CourseManagement.css'
import SecondaryTSidebar from "../components/SecondaryTNavbar";
//this page opens when click on a course in the side bar, it has a place to edit info and to add assessments

const CourseManagementPage = ({ courses, onUpdateCourse, onDeleteCourse }) => { //says which array 
    const { id } = useParams(); //this grabs the ids used on key to know which course was clicked on
    const navigate = useNavigate(); //to go to another page
    
    const [courseData, setCourseData] = useState({ // had to set a default state otherwise .map generates runtime error
        code: "",
        name: "",
        term: "",
        isActive: false,
        totalStudents: 0,
        assessments: [],
    });  //honestly don't know had to search it up doesnt work without it
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const selectedCourse = courses.find(course => course.id === parseInt(id));
        if (selectedCourse) {
            setCourseData({
                ...selectedCourse,
                assessments: selectedCourse.assessments || [],
            });
        } else {
            setCourseData({
                code: "",
                name: "",
                term: "",
                isActive: false,
                totalStudents: 0,
                assessments: [],
            });
        }
    }, [id, courses]);

    const handleInputChange = (e) => { //same as last time it handles the input 
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: name === "totalStudents" ? Number(value) : value }); // To change string inputs into numerical inputs incase of calculations later on
    };

    const toggleActive = () => { //toggle for active inactive again don't know which place is better if in home page or here
        setCourseData({ ...courseData, isActive: !courseData.isActive });
    };

    const addAssignment = () => { //to add assessment
        const newAssignment = {  //the components later want to change so it's automatic the completed 
            type: "", 
            weight: 0, 
            completed: 0 
        };
        setCourseData({ //puts in the array
            ...courseData,
            assessments: [...(courseData.assessments || []), newAssignment]
        });
    };

    const handleAssignmentChange = (index, e) => { //updates the lists to include new/edited assessments
        const { name, value } = e.target;
        const updatedAssessments = [...(courseData.assessments || [])];
        updatedAssessments[index][name] = name === "weight" || name === "completed" ? Number(value) : value; // To change string inputs into numerical inputs incase of calculations later on
        setCourseData({ ...courseData, assessments: updatedAssessments });
    };

    const handleSaveChanges = () => { //saves changes and goes back to teacher homepage
        onUpdateCourse(courseData);
        setIsEditing(false);
    };


    return (
        <div className="course-manager" style={{display: "flex", minHeight: "100vh", padding: 0}}> {/*print a header with the course name and boxes with the current info that can be edited*/}
            <TeacherSidebar courses={courses} style={{margin: 0}}/>
            <main style={{flex: 1}}>
                <h1>Course Manager</h1>
                <div className="Header">
                    <div>
                        <h2>{courseData.code}</h2>
                        <p>{courseData.name}</p>
                        <p>{courseData.term}</p>
                    </div>
                    <div>
                        <button className="edit" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    </div>
                </div>
                <SecondaryTSidebar courseId={courseData.id} />
                <div className="course-info">
                    <h2>Course Info</h2>
                    <div className="course-info-components">
                        <label>
                            Name: 
                            <input
                                className="boxForName"
                                name="name"
                                value={courseData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </label>
                        <label>
                            Code: 
                            <input
                                className="boxForCode" 
                                name="code" 
                                value={courseData.code} 
                                onChange={handleInputChange} 
                                disabled={!isEditing}
                            />
                        </label>
                        <label>
                            Term: 
                            <input 
                                className="boxForTerm"
                                name="term" 
                                value={courseData.term} 
                                onChange={handleInputChange} 
                                disabled={!isEditing}
                            />
                        </label>
                    </div>
                    <p>Status: {courseData.isActive ? "Active" : "Inactive"}</p> {/*shows current status*/}
                    <button onClick={toggleActive} disabled={!isEditing}> {/*button for active inactive*/}
                        Mark as {courseData.isActive ? "Inactive" : "Active"} {/*will show opposite of current state*/}
                    </button>
                </div>
                
                <div className="assignments">
                    <h2>Assessments</h2> {/*prints assessments as boxes that can be edited*/}
                    
                    {/*Column Labels*/}
                    <div className="assessmentHeaders">
                        <span className="boxForType">Type</span>
                        <span className="boxForWeight">Weight</span>
                        <span className="boxForCompletionNumber">Completion</span>
                    </div>
                    
                    {/*Assessment inputs*/}
                    {courseData.assessments.map((assessment, index) => (
                        <div key={index} className="assessmentRow">
                            <input 
                                className="boxForType"
                                name="type" 
                                placeholder="Type" 
                                value={assessment.type} 
                                onChange={(e) => handleAssignmentChange(index, e)} 
                                disabled={!isEditing}
                            />
                        {/*want to change type to a better one so doesnt go one by one same for completed*/}
                            <input 
                                className="boxForWeight"
                                name="weight" 
                                type="number" 
                                placeholder="Weight" 
                                value={assessment.weight} 
                                onChange={(e) => handleAssignmentChange(index, e)} 
                                disabled={!isEditing}
                            />
                            {/*want to change in the future so its automatic*/}
                            <input 
                                className="boxForCompletionNumber"
                                name="completed" 
                                type="number" 
                                placeholder="Completed" 
                                value={assessment.completed} 
                                onChange={(e) => handleAssignmentChange(index, e)} 
                                disabled={!isEditing}
                            />
                        </div>
                    ))}
                    <button onClick={addAssignment} disabled={!isEditing}>Add Assessment</button> {/*button to add an assignment*/}
                    
                </div>
                <div className="end-buttons">
                    {/*Button to delete course, asks for confirmation */}
                    <button onClick={() => {
                        if (window.confirm(`Delete course "${courseData.name}"?`)){
                            onDeleteCourse(courseData.id);
                            navigate("/teacher");
                        }
                    }}>
                        Delete Course
                    </button>
                    
                    {/*button to save changes needs to be here doesnt work otherwise*/}
                    {isEditing && ( /*only shows the save button if editing is true*/
                        <button onClick={handleSaveChanges}>Save Changes</button> 
                    )}
                    <button onClick={() => navigate("/teacher")}>Back to Home</button> {/*goes back to teacher home page */}
                </div>
            </main>
        </div>
    );
};


export default CourseManagementPage;


