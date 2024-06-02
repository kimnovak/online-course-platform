import { Outlet } from '@tanstack/react-router';
import { Header } from './Header/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
