import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Link } from '@tanstack/react-router';
import logo from '../assets/logo.webp';
import { useAuth } from '../Auth/AuthProvider/AuthProvider';
import { UserSettings } from './UserSettings/UserSettings';
import { Categories } from './Categories/Categories';
import { Search } from './Search/Search';
import { useCart } from '../Cart/CartProvider/CartProvider';

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { itemsCount } = useCart();

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
              <div className="relative inline-block">
                <ShoppingCartIcon className="h-8 w-8 p-1" />
                {itemsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemsCount}
                  </span>
                )}
              </div>
            </Link>
            <UserSettings />
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-gray-900 mr-4"
            >
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
