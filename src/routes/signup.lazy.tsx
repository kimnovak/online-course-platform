import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUp } from '../Auth/SignUp/SignUp';

export const Route = createLazyFileRoute('/signup')({
  component: () => <SignUp />,
});
