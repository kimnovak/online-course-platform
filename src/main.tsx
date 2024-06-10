import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider, useAuth } from './Auth/AuthProvider/AuthProvider';
import { CoursesProvider } from './Courses/CoursesProvider/CoursesProvider';
import { CartProvider } from './Cart/CartProvider/CartProvider';

import './index.css';

const router = createRouter({ routeTree, context: { auth: undefined } });

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
          <CartProvider>
            <CoursesProvider>
              <RouterProviderWrapper />
            </CoursesProvider>
          </CartProvider>
        </AuthProvider>
      </React.StrictMode>
    );
  }
});
