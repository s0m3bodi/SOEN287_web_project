import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import TeacherSidebar from "../components/TeacherSidebar";
import '../pagesCSS/TeacherPage.css'

//the on update is important so when something is changed it also shows on the homepage and side bar


const TeacherPage = ({ courses, onUpdateCourse }) => { //home page with hardcoded + added courses(onUpdate)
   
    const [newCourse, setNewCourse] = useState({ code: '', name: '', term: '', assessments: [] }); //new courses
    const [showAddModal, setShowAddModal] = useState(false); //shows a menu when click on addcourse to add a course
    const navigate = useNavigate(); 
    

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
        <div style={{ display: "flex", minHeight: "100vh" }}> {/*anything on style can be moved to future css file*/}
            <TeacherSidebar courses={courses} onAddCourse={() => setShowAddModal(true)} /> {/*courses={course} prints the array and onAddCourse={( ... makes the menu for adding a course show by setting it active*/}
            <main style={{ padding: "10px", flex: 1 }}> {/* the filter goes though the array to only print the active ones on the main page*/}
            
                {courses.filter(course => course.isActive).map(course => ( 
                    <div key={course.id} className="course"> 
                        <h2>{course.name}</h2> {/*prints the name can be changed to also have code and session*/}
                            
                        <div className='coursecontent'>
                            <h3>Assessments</h3> {/*print assessments with the completion percent*/}
                            {/*checks if there is any assessments creates a list of them if yes*/}
                            {course.assessments.length > 0 ? (  
                                <ul> 
                                {/* checks if the assessment is completed and there are students enrolled then computes percentage formated 2 decimal places*/}
                                    {course.assessments.map((assessment, index) => {
                                        const completionPercentage = assessment.completed && course.totalStudents > 0 
                                                    ? ((assessment.completed / course.totalStudents) * 100).toFixed(2): 0;
                                                    {/*return the list of assignment with the type and percentage*/}
                                        return ( 
                                            <li key={index}>
                                                {assessment.type}: {completionPercentage}% of students completed ({assessment.completed}/{course.totalStudents} students)
                                            </li>
                                            );                
                                    })}        
                                </ul>
                            ) : (<p>No assessments available.</p>)} {/* if no assignments*/}

                            <button onClick={() => toggleActive(course.id)}> {/* button for actice status*/}
                                Mark as {course.isActive ? "Inactive" : "Active"}
                            </button>
                        </div>
                    </div>
                ))}

                {/*menu for new course add */}
                {showAddModal && (
                    <div className="addMenu">
                        <h2>Add New Course</h2>
                        <div className="new-courseinfo">
                            <label>Enter course code:
                                <input className="boxforcode" name="code" value={newCourse.code} onChange={handleInputChange} placeholder="Course Code e.g. SOEN 287" />
                            </label>

                            <label>Enter course name:
                                <input  className="boxforname" name="name" value={newCourse.name} onChange={handleInputChange} placeholder="Course Name" />
                            </label>

                            <label>Enter course term:
                                <input className="boxforterm" name="term" value={newCourse.term} onChange={handleInputChange} placeholder="Term" />
                            </label>
                        </div>
                            <button onClick={addCourse}>Add Course</button>  {/*button at the end to confirm*/}
                            <button onClick={() => setShowAddModal(false)}>Cancel</button>  {/*in case give up on adding*/}
                    </div>
                )}
            </main>
        </div>
    );
};
    

export default TeacherPage;

 