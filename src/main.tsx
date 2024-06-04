import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { AuthProvider, useAuth } from './Auth/AuthProvider/AuthProvider';

// Create a new router instance
const router = createRouter({ routeTree, context: { auth: null } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const RouterProviderWrapper = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

enableMocking().then(() => {
  const rootElement = document.getElementById('root')!;
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <AuthProvider>
          <RouterProviderWrapper />
        </AuthProvider>
      </React.StrictMode>
    );
  }
});
