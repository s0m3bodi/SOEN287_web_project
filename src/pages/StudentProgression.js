import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import SecondaryTNavbar from '../components/SecondaryTNavbar'
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import '../pagesCSS/ManageAssessments.css'

const StudentProgress = ({ courses }) => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const foundCourse = courses.find(e => e.id === Number(id));
        if (foundCourse) {
            setCourse(foundCourse);
        }
    }, [id, courses]);

    if (!course) return <div>Course not found</div>;

    const COLORS = ['#008000', '#FF6347'];

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
                        const isOpen = activeIndex === realIndex;

                        const completed = a.completed || 0;
                        const notCompleted = Math.max(0, course.totalStudents - completed); // To prevent having negative numbers, though it shouldn't be possible

                        const data = [
                            { name: "Completed", value: completed },
                            { name: "Not Completed", value: notCompleted}
                        ];

                        return (
                            <div key={realIndex} className={`AssessCard ${!a.isActive ? "inactive" : ""}`} 
                                 onClick={() => {
                                    if (a.isActive) {
                                        setActiveIndex(isOpen ? null : realIndex);
                                    }
                                 }}>
                                <div className="ClosedAssessCard">
                                    <strong>{a.type || ""} - {a.name || "New Assessment"}</strong>
                                    <p>{completed}/{course.totalStudents} completed</p>
                                </div>
                            

                                {isOpen && (
                                    <div className="EditAssessCard" onClick={(e) => e.stopPropagation()}> {/*Prevents the card from closing just by clicking anywhere*/}

                                    <PieChart width={300} height={250}>
                                        <Pie
                                            data={data}
                                            dataKey="value"
                                            outerRadius={80}
                                            fill="green"
                                            style={{cursor: 'pointer', outline: 'none'}}>

                                            {data.map((entry, realIndex) => (
                                                <Cell key={`cell-${realIndex}`} fill={COLORS[realIndex % COLORS.length]}/>
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default StudentProgress;