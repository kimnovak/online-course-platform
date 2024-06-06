import { createFileRoute } from '@tanstack/react-router';
import { Enrollments } from '../Enrollments/Enrollments';

export const Route = createFileRoute('/enrollments')({
  component: () => <Enrollments />,
});
