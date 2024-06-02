import { useState, useRef, useCallback } from 'react';
import { CourseItem } from '../CourseItem/CourseItem';

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: 'React for Beginners',
    description:
      'Learn the basics of React.js and build your first application.',
    image: '',
    price: 50,
  },
  {
    id: 2,
    title: 'Advanced TypeScript',
    description:
      'Deep dive into TypeScript with advanced concepts and techniques.',
    image: '',
    price: 55,
  },
  {
    id: 3,
    title: 'NextJS Mastery',
    description:
      'Master NextJS and build server-side rendered React applications.',
    image: '',
    price: 5,
  },
  // Add more initial courses as needed
];

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
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

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
