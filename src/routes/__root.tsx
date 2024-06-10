import { createRootRouteWithContext } from '@tanstack/react-router';
import { App } from '../App';

type RouterContext = {
  auth?: { isAuthenticated: boolean };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <App />,
});
