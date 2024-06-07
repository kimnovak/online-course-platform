import { Button } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../Cart/useCart';
import defaultImage from '../../assets/default-image.webp';
import { Link } from '@tanstack/react-router';
import { Course } from '../types';

type CourseItemProps = {
  course: Course;
};

export const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <Link to={`/courses/${course.id}`}>
        <img
          className="w-full h-48 object-cover"
          src={course.image || defaultImage}
          alt={course.title}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{course.title}</h3>
          <p className="mt-2 text-gray-600">{course.description}</p>
        </div>
      </Link>
      <div className="p-4">
        <Button
          onClick={() => addItem(course)}
          className="bg-blue-500 w-full relative p-2 text-white"
        >
          <div className="flex items-center justify-center">
            <ShoppingCartIcon className="h-8 w-8 p-1" />
            <span>Add to Cart</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
