import { createLazyFileRoute } from '@tanstack/react-router';
import { Login } from '../LogIn/LogIn';

export const Route = createLazyFileRoute('/login')({
  component: () => <Login />,
});
