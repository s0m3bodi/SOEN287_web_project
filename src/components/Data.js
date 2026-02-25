export const courses = [
    {
        id: 1,
        code: 'SOEN 287',
        name: 'Intro to web-development',
        term: 'Fall 2024',
        isActive: true,
        totalStudents:243,
        assessments:[
            {type: 'Quiz', weight: 20, completed: 70 },
            {type: 'Assignment', weight:10, completed: 45},
            {type: 'Midterm', weight:30, completed: 95},
            {type: 'Final', weight: 40, completed: 99},
        ],
    },
];
