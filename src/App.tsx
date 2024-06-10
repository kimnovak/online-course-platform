import { Outlet } from '@tanstack/react-router';
import { Header } from './Header/Header';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
