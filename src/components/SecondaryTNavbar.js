import React from 'react';
import { NavLink } from "react-router-dom";
import '../pagesCSS/SecondaryTNavbar.css'

const SecondaryTNavbar= ({ courseId }) => {
    return (
        <div className="bar">
                <NavLink 
                    to={`/course/${courseId}`} end // So that the routed doen't match with the sub-pages
                    className={({isActive}) => isActive ? "active" : ""}>
                    Classroom
                </NavLink>
                <NavLink 
                    to={`/course/${courseId}/assessments`}
                    className={({isActive}) => isActive ? "active" : ""}>
                    Assessments
                </NavLink>
                <NavLink 
                    to={`/course/${courseId}/studentprogress`}
                    className={({isActive}) => isActive ? "active" : ""}>
                    Student progress
                </NavLink>
        </div> 
    );
}
export default SecondaryTNavbar;