export const courses = [ //just the hardcoded course
    {
        id: 1,
        code: 'SOEN 287',
        name: 'Intro to web-development',
        term: 'Fall 2024',
        isActive: true,
        totalStudents:243, //because i wanted a percentage might change later
        assessments:[
            {type: 'Quiz', weight: 20, completed: 70 }, //hardcoded assignments comnpleted is supposed to be the number of students who did it
            {type: 'Assignment', weight:10, completed: 45},
            {type: 'Midterm', weight:30, completed: 95},
            {type: 'Final', weight: 40, completed: 99},
        ],
    },
    {
        id: 2,
        code: 'ENGR 233',
        name: 'Applied advanced calculus',
        term: 'Winter 2026',
        isActive: true,
        totalStudents: 180,
        assessments: [
            {type: 'Quiz', weight: 10, completed: 120 },
            {type: 'Assignment', weight: 10, completed: 38},
            {type: 'Midterm', weight: 20, completed: 168},
            {type: 'Final', weight: 60, completed: 178},
        ],
    },
    {
        id: 3,
        code: 'COMP 249',
        name: 'Object-oriented programming II',
        term: 'Winter 2026',
        isActive: true,
        totalStudents: 127,
        assessments: [
            {type: 'Quiz', weight: 10, completed: 120},
            {type: 'Assignment', weight: 20, completed: 50},
            {type: 'Midterm', weight: 20, completed: 127},
            {type: 'Final', weight: 50, completed: 0},
        ],
    },
];
