import { useState, useEffect } from 'react';
import { CourseItem } from '../CourseItem/CourseItem';
import type { Course } from './types';

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Course[] = await response.json();
        setCourses(data ?? []);
      } catch (error: any) {
        // setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => {
          return <CourseItem key={course.id} course={course} />;
        })}
      </div>
    </div>
  );
};
