import { Courses } from '../Courses/Courses';
import { Header } from '../Header/Header';
import { HighlightedCourses } from '../HighlightedCourses/HighlightedCourses';

export const Dashboard = () => {
  return (
    <>
      <Header />
      <main>
        <HighlightedCourses />
        <Courses />
      </main>
    </>
  );
};
