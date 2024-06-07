import { Button } from '@headlessui/react';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../Cart/useCart';
import { Course } from '../types';
import { useEnrollments } from '../../Enrollments/useEnrollments';
import { Link } from '@tanstack/react-router';

type CourseItemCTAsProps = {
  course: Course;
};

export const CourseItemCTAs: React.FC<CourseItemCTAsProps> = ({ course }) => {
  const { addItem, isItemInCart, removeItem } = useCart();
  const { isCoursePurchased } = useEnrollments();

  if (isCoursePurchased(course.id)) {
    return (
      <Link
        to={`/courses/${course.id}`}
        className="border solid w-full relative p-2 text-black w-full flex items-center justify-center"
      >
        <EyeIcon className="h-8 w-8 p-1" />
        <span>Watch the course</span>
      </Link>
    );
  }

  return isItemInCart(course.id) ? (
    <Button
      onClick={() => removeItem(course.id)}
      className="border solid w-full relative p-2 text-black"
    >
      <div className="flex items-center justify-center">
        <ShoppingCartIcon className="h-8 w-8 p-1" />
        <span>Remove from Cart</span>
      </div>
    </Button>
  ) : (
    <Button
      onClick={() => addItem(course)}
      className="bg-blue-500 w-full relative p-2 text-white"
    >
      <div className="flex items-center justify-center">
        <ShoppingCartIcon className="h-8 w-8 p-1" />
        <span>Add to Cart</span>
      </div>
    </Button>
  );
};
