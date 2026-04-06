// GPA Calculator utility on 4.3 scale
// Converts percentage grades to GPA points and calculates overall GPA

/**
 * Convert percentage grade to GPA on 4.3 scale
 * @param {number} percentage - Grade as percentage (0-100)
 * @returns {number} - GPA point value (0-4.3)
 */
export const percentageToGPA = (percentage) => {
  if (percentage >= 97) return 4.3; // A+
  if (percentage >= 93) return 4.0; // A
  if (percentage >= 90) return 3.7; // A-
  if (percentage >= 87) return 3.3; // B+
  if (percentage >= 83) return 3.0; // B
  if (percentage >= 80) return 2.7; // B-
  if (percentage >= 77) return 2.3; // C+
  if (percentage >= 73) return 2.0; // C
  if (percentage >= 70) return 1.7; // C-
  if (percentage >= 67) return 1.3; // D+
  if (percentage >= 63) return 1.0; // D
  return 0.0; // F
};

/**
 * Convert GPA point to letter grade
 * @param {number} gpaPoint - GPA point value (0-4.3)
 * @returns {string} - Letter grade (A+, A, A-, B+, etc.)
 */
export const gpaToLetterGrade = (gpaPoint) => {
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

/**
 * Calculate overall GPA from course averages
 * @param {Array} courses - Array of courses with 'average' property
 * @returns {number} - Overall GPA (0-4.3)
 */
export const calculateOverallGPA = (courses) => {
  if (!courses || courses.length === 0) return 0;

  const totalGPA = courses.reduce((sum, course) => {
    const gpaPoint = percentageToGPA(course.average || 0);
    return sum + gpaPoint;
  }, 0);

  return (totalGPA / courses.length).toFixed(2);
};

/**
 * Calculate GPA for a single course
 * @param {number} courseAverage - Course average percentage
 * @returns {object} - Object with gpaPoint and letterGrade
 */
export const calculateCourseGPA = (courseAverage) => {
  const gpaPoint = percentageToGPA(courseAverage);
  const letterGrade = gpaToLetterGrade(gpaPoint);
  return {
    gpaPoint: gpaPoint.toFixed(2),
    letterGrade
  };
};
