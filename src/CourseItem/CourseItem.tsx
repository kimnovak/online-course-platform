import { Button } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../useCart';

export const CourseItem = ({ lastCourseElementRef, course }) => {
  const { addItem } = useCart();
  return (
    <div
      ref={lastCourseElementRef}
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
    >
      <Button onClick={() => addItem(course)}>
        <ShoppingCartIcon className="h-8 w-8 p-1 absolute right-0" />
      </Button>
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
};
