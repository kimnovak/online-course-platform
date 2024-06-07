import React from 'react';
import { Link } from '@tanstack/react-router';
import { useEnrollments } from './useEnrollments';
import defaultImage from '../assets/default-image.webp';

export const Enrollments: React.FC = () => {
  const { purchasedCourses } = useEnrollments();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchased Courses</h1>
      {purchasedCourses.length === 0 ? (
        <p className="text-gray-600">You have not purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {purchasedCourses.map(course => (
            <Link to={`/courses/${course.id}`}>
              <div
                key={course.id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={course.image || defaultImage}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-gray-800 mt-2">{course.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
