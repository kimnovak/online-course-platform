import { createFileRoute } from '@tanstack/react-router';
import { Login } from '../Auth/Login/Login';

export const Route = createFileRoute('/login')({
  component: () => <Login />,
});
