import { createLazyFileRoute } from '@tanstack/react-router';
import { Login } from '../Auth/Login/Login';

export const Route = createLazyFileRoute('/login')({
  component: () => <Login />,
});
