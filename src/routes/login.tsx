import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from '../Auth/Login/Login';

export const Route = createFileRoute('/login')({
  component: () => <Login />,
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
});
