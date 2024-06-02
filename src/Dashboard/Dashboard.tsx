import { Courses } from '../Courses/Courses';
import { HighlightedCourses } from '../HighlightedCourses/HighlightedCourses';

export const Dashboard = () => {
  return (
    <>
      <HighlightedCourses />
      <Courses />
    </>
  );
};
