import { useParams } from '@tanstack/react-router';
import { Course } from '../types';
import { useCourses } from '../CoursesProvider/CoursesProvider';

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails: React.FC<CourseDetailsProps> = () => {
  const params = useParams({ from: '/courses/$courseId' });
  const { courses } = useCourses();
  const course = courses.find(({ id }) => `${id}` === params.courseId);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          Course not found!
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-800 mb-4">{course.description}</p>
          <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
          <ul className="list-disc list-inside">
            {/* {course.content.map((item, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {item}
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </div>
  );
};
