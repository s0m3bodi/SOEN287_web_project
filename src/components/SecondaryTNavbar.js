import React from 'react';
import { NavLink } from "react-router-dom";
import '../pagesCSS/SecondaryTNavbar.css'

const SecondaryTNavbar= ({ courseId }) => {
    return (
        <div className="bar">
                <NavLink 
                    to={`/course/${courseId}`}
                    className={({isActive}) => isActive ? "active" : ""}>
                    Classroom
                </NavLink>
                <NavLink 
                    to={`/course/${courseId}/assessments`}
                    className={({isActive}) => isActive ? "active" : ""}>
                    Assessments
                </NavLink>
                <NavLink to="/">Student progress</NavLink>
        </div> 
    );
}
export default SecondaryTNavbar;