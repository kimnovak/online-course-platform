import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Course } from '../../Courses/types';
import * as coursesApi from '../../api/courses';

interface CoursesContextType {
  courses: Course[];
  isLoading: boolean;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await coursesApi.getCourses();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Course[] = await response.json();
        setCourses(data ?? []);
      } catch (error: any) {
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, isLoading }}>
      {children}
    </CoursesContext.Provider>
  );
};

const useCourses = (): CoursesContextType => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within an CoursesProvider');
  }
  return context;
};

export { CoursesProvider, useCourses };
