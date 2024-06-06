import { CourseItem } from './CourseItem/CourseItem';
import { useCourses } from './CoursesProvider/CoursesProvider';

export const Courses = () => {
  const { courses, isLoading } = useCourses();

  if (isLoading) {
    return (
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Loading courses...
        </h2>
      </div>
    );
  }

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
