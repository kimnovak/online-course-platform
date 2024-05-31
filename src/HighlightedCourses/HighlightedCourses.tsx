import { useState } from 'react';

interface Course {
  title: string;
  description: string;
  image: string;
}

const trendingCourses: Course[] = [
  {
    title: 'React for Beginners',
    description:
      'Learn the basics of React.js and build your first application.',
    image: 'https://via.placeholder.com/300',
  },
  {
    title: 'Advanced TypeScript',
    description:
      'Deep dive into TypeScript with advanced concepts and techniques.',
    image: 'https://via.placeholder.com/300',
  },
  {
    title: 'NextJS Mastery',
    description:
      'Master NextJS and build server-side rendered React applications.',
    image: 'https://via.placeholder.com/300',
  },
  // Add more courses as needed
];

export const HighlightedCourses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % trendingCourses.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex =>
        (prevIndex - 1 + trendingCourses.length) % trendingCourses.length
    );
  };
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Trending Courses This Week
      </h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {trendingCourses.map((course, index) => (
            <div key={index} className="min-w-full p-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#8594;
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {trendingCourses.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`mx-2 w-4 h-4 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};
