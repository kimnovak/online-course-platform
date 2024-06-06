import { createFileRoute } from '@tanstack/react-router';
import { CourseDetails } from '../Courses/CourseDetails/CourseDetails';

export const Route = createFileRoute('/courses/$courseId')({
  component: () => <CourseDetails />,
});
