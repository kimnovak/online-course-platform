import { useParams } from '@tanstack/react-router';
import { Course } from '../types';
import { useCourses } from '../CoursesProvider/CoursesProvider';
import defaultImage from '../../assets/default-image.webp';
import { useCart } from '../../Cart/useCart';
import { Button } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails: React.FC<CourseDetailsProps> = () => {
  const params = useParams({ from: '/courses/$courseId' });
  const { getCourseById } = useCourses();
  const course = getCourseById(Number(params.courseId));
  const { addItem, isItemInCart, removeItem } = useCart();

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
          {isItemInCart(course.id) ? (
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
          )}
        </div>
      </div>
    </div>
  );
};
