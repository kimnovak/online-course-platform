import { Link } from '@tanstack/react-router';
import defaultImage from '../../assets/default-image.webp';
import { Course } from '../types';
import { CourseItemCTAs } from '../CourseItemCTAs/CourseItemCTA';

type CourseItemProps = {
  course: Course;
};

export const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <Link to={`/courses/${course.id}`}>
        <img
          className="w-full h-48 object-cover"
          src={course.image || defaultImage}
          alt={course.title}
        />
        <div className="p-4 min-h-[150px] max-h-[150px]">
          <h3 className="text-xl font-semibold truncate">{course.title}</h3>
          <p className="mt-2 text-gray-600 flex overflow-hidden max-h-[100px]">
            {course.description}
          </p>
        </div>
      </Link>
      <div className="p-4">
        <CourseItemCTAs course={course} />
      </div>
    </div>
  );
};
