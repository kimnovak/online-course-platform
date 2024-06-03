import { Courses } from '../Courses/Courses';
import { HighlightedCourses } from '../Courses/HighlightedCourses/HighlightedCourses';

export const Dashboard = () => {
  return (
    <>
      <HighlightedCourses />
      <Courses />
    </>
  );
};
