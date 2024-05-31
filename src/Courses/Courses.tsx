import { useState, useRef, useCallback } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: 'React for Beginners',
    description:
      'Learn the basics of React.js and build your first application.',
    image: '',
  },
  {
    id: 2,
    title: 'Advanced TypeScript',
    description:
      'Deep dive into TypeScript with advanced concepts and techniques.',
    image: '',
  },
  {
    id: 3,
    title: 'NextJS Mastery',
    description:
      'Master NextJS and build server-side rendered React applications.',
    image: '',
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
          if (courses.length === index + 1) {
            return (
              <div
                ref={lastCourseElementRef}
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course.image}
                  alt={course.title}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="mt-2 text-gray-600">{course.description}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course.image}
                  alt={course.title}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="mt-2 text-gray-600">{course.description}</p>
                </div>
              </div>
            );
          }
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
