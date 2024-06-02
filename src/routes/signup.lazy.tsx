import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUp } from '../SignUp/SignUp';

export const Route = createLazyFileRoute('/signup')({
  component: () => <SignUp />,
});
