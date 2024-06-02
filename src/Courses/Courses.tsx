import { useState, useRef, useCallback, useEffect } from 'react';
import { CourseItem } from '../CourseItem/CourseItem';
import type { Course } from './types';

const fetchMoreCourses = (startId: number): Course[] => {
  // Simulate fetching more courses from an API or database
  return Array.from({ length: 3 }, (_, index) => ({
    id: startId + index,
    title: `Course ${startId + index}`,
    description: `Description for course ${startId + index}`,
    image: '',
    price: index * 10,
  }));
};

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

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

  const lastCourseElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          const newCourses = fetchMoreCourses(courses.length + 1);
          setCourses(prevCourses => [...prevCourses, ...newCourses]);
          if (newCourses.length === 0) {
            setHasMore(false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, courses.length]
  );

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const isLastItem = courses.length === index + 1;
          return (
            <CourseItem
              key={course.id}
              lastCourseElementRef={
                isLastItem ? lastCourseElementRef : undefined
              }
              course={course}
            />
          );
        })}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <p>Loading more courses...</p>
        </div>
      )}
    </div>
  );
};
