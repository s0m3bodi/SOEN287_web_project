const http = require('http');
const { URL } = require('url');

const percentageToGPA = (percentage) => {
  if (percentage >= 97) return 4.3;
  if (percentage >= 93) return 4.0;
  if (percentage >= 90) return 3.7;
  if (percentage >= 87) return 3.3;
  if (percentage >= 83) return 3.0;
  if (percentage >= 80) return 2.7;
  if (percentage >= 77) return 2.3;
  if (percentage >= 73) return 2.0;
  if (percentage >= 70) return 1.7;
  if (percentage >= 67) return 1.3;
  if (percentage >= 63) return 1.0;
  return 0.0;
};

const gpaToLetterGrade = (gpaPoint) => {
  if (gpaPoint >= 4.25) return 'A+';
  if (gpaPoint >= 3.85) return 'A';
  if (gpaPoint >= 3.5) return 'A-';
  if (gpaPoint >= 3.15) return 'B+';
  if (gpaPoint >= 2.85) return 'B';
  if (gpaPoint >= 2.5) return 'B-';
  if (gpaPoint >= 2.15) return 'C+';
  if (gpaPoint >= 1.85) return 'C';
  if (gpaPoint >= 1.5) return 'C-';
  if (gpaPoint >= 1.15) return 'D+';
  if (gpaPoint >= 0.5) return 'D';
  return 'F';
};

const calculateCourseGPA = (average) => {
  const gpaPoint = percentageToGPA(average);
  return {
    gpaPoint: gpaPoint.toFixed(2),
    letterGrade: gpaToLetterGrade(gpaPoint)
  };
};

const calculateOverallAverage = (courses) => {
  if (!Array.isArray(courses) || courses.length === 0) return 0;
  const total = courses.reduce((sum, course) => sum + (course.average || 0), 0);
  return Math.round(total / courses.length);
};

const calculateOverallGPA = (courses) => {
  if (!Array.isArray(courses) || courses.length === 0) return '0.00';
  const totalGPA = courses.reduce((sum, course) => sum + percentageToGPA(course.average || 0), 0);
  return (totalGPA / courses.length).toFixed(2);
};

const computeCourseAverages = (dashboardCourses, assessments) => {
  if (!Array.isArray(dashboardCourses) || !Array.isArray(assessments)) return dashboardCourses;

  return dashboardCourses.map((course) => {
    const courseAssessments = assessments.filter(
      (assessment) => assessment.course === course.name && assessment.earned !== null
    );

    if (courseAssessments.length === 0) return course;

    const average = courseAssessments.reduce(
      (sum, assessment) => sum + (assessment.earned / assessment.total) * 100,
      0
    ) / courseAssessments.length;

    return {
      ...course,
      average: Math.round(average)
    };
  });
};

const parseJsonBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      resolve(body ? JSON.parse(body) : {});
    } catch (error) {
      reject(error);
    }
  });
  req.on('error', reject);
});

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (url.pathname === '/api/compute-gpa' && req.method === 'POST') {
    try {
      const { courses } = await parseJsonBody(req);
      const overallAverage = calculateOverallAverage(courses);
      const overallGPA = calculateOverallGPA(courses);
      const courseGPAs = {};

      if (Array.isArray(courses)) {
        courses.forEach((course) => {
          courseGPAs[course.id] = calculateCourseGPA(course.average || 0);
        });
      }

      sendJson(res, 200, { overallAverage, overallGPA, courseGPAs });
    } catch (error) {
      sendJson(res, 400, { error: 'Invalid request body' });
    }
    return;
  }

  if (url.pathname === '/api/compute-dashboard' && req.method === 'POST') {
    try {
      const { dashboardCourses, assessments } = await parseJsonBody(req);
      const updatedDashboardCourses = computeCourseAverages(dashboardCourses, assessments);
      sendJson(res, 200, { dashboardCourses: updatedDashboardCourses });
    } catch (error) {
      sendJson(res, 400, { error: 'Invalid request body' });
    }
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
