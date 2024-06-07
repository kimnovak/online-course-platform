import { useParams } from '@tanstack/react-router';
import { useCourses } from '../CoursesProvider/CoursesProvider';
import defaultImage from '../../assets/default-image.webp';
import { CourseItemCTAs } from '../CourseItemCTAs/CourseItemCTA';

export const CourseDetails: React.FC = () => {
  const params = useParams({ from: '/courses/$courseId' });
  const { getCourseById } = useCourses();
  const course = getCourseById(Number(params.courseId));

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
          src={course.image || defaultImage}
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-800 mb-4">{course.description}</p>
          <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
        </div>
        <div className="p-4">
          <CourseItemCTAs course={course} />
        </div>
      </div>
    </div>
  );
};
