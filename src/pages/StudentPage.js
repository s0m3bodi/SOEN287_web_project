import { Routes, Route} from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';

import '../pagesCSS/StudentPage.css';


//TODO: hardcoded courses

//shows all courses with a list of assessments
function StudentHome(){
    return (
        <div>
            <h1>Welcome to Student Home</h1>
            hi
        </div>
    );
}

//shows course specific information
function CoursePage(){
    
    return <h1>Course content here</h1>
}

//shows all deadlines on a calendar
function CalendarPage(){
    return <h1>Calendar here</h1>
}

function StudentPage(){
    


    return(
        <div className='student-container'>
            <StudentSidebar />
            <Routes>
                <Route path ="/" element={<StudentHome />} />
                <Route path ="course/:id" element={<CoursePage />} />
                <Route path="calendar" element={<CalendarPage />} />
            </Routes>
        </div>
    );
    
}

export default StudentPage;