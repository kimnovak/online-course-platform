import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Link } from '@tanstack/react-router';
import logo from '../assets/logo.webp';
import { useAuth } from '../Auth/AuthProvider/AuthProvider';
import { UserSettings } from './UserSettings/UserSettings';
import { Categories } from './Categories/Categories';
import { Search } from './Search/Search';

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-4" />
        </Link>
        <Categories />
        <Search />
        {isAuthenticated ? (
          <>
            <Link
              to="/enrollments"
              className="text-gray-700 hover:text-gray-900 mr-4"
            >
              My Courses
            </Link>
            <Link to="/cart" className="[&.active]:font-bold">
              <ShoppingCartIcon className="h-8 w-8 p-1" />
            </Link>
            <UserSettings />
          </>
        ) : (
          <>
            <Link to="/signup" className="text-gray-700 hover:text-gray-900 mr-4">
              Sign up
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              Log in
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
