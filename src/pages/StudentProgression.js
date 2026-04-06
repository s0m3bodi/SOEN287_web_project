import React, { useState, useEffect } from 'react'; // useState kept for future use
import { useParams } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import SecondaryTNavbar from '../components/SecondaryTNavbar'

import '../pagesCSS/ManageAssessments.css'

const StudentProgress = ({ courses }) => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    useEffect(() => {
        const foundCourse = courses.find(e => e.id === Number(id));
        if (foundCourse) {
            setCourse(foundCourse);
        }
    }, [id, courses]);

    if (!course) return <div>Course not found</div>;

    return (
        <div className="AssessPage"> {/*This page is very similar to the assessments page, so it will use the same css page*/}
            <TeacherSidebar courses={courses} style={{margin:0}} />
            <main className="mainAssessPage" style={{flex: 1}}>
                
                <h1>Student Progress</h1>
                <div className="AssessHeader">
                    <h2>{course.code}</h2>
                    <p>{course.name}</p>
                    <p>{course.term}</p>
                </div>

                <SecondaryTNavbar courseId={course.id} />

                <div className="AssessList">

                    {course.assessments.map((a, realIndex) => {
                        const completed = a.completed || 0;

                        return (
                            <div key={realIndex} className={`AssessCard ${!a.isActive ? "inactive" : ""}`}>
                                <div className="ClosedAssessCard">
                                    <strong>{a.type || ""} - {a.name || "New Assessment"}</strong>
                                    <p>{completed}/{course.totalStudents} completed</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default StudentProgress;