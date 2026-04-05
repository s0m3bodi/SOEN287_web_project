import { createContext, useContext } from 'react';

export const CoursesContext = createContext([]);

export const useCoursesContext = () => useContext(CoursesContext);
