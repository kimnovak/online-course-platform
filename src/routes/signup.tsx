import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignUp } from '../Auth/SignUp/SignUp';

export const Route = createFileRoute('/signup')({
  component: () => <SignUp />,
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
});
