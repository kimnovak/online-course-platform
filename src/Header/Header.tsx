import {
  Menu,
  MenuItems,
  MenuItem,
  Transition,
  MenuButton,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-10 mr-4" />
          <span className="font-bold text-xl">CourseApp</span>
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <Menu>
            {({ open }) => (
              <>
                <MenuButton className="flex items-center text-gray-700 hover:text-gray-900">
                  Categories
                  <ChevronDownIcon className="h-5 w-5 ml-1" />
                </MenuButton>
                <Transition
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Category 1
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Category 2
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </>
            )}
          </Menu>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 mx-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search courses..."
          />
        </div>

        {/* My Courses Link */}
        <a href="#" className="text-gray-700 hover:text-gray-900">
          My Courses
        </a>

        {/* Avatar Dropdown */}
        <div className="relative">
          <Menu>
            {({ open }) => (
              <>
                <MenuButton className="flex items-center ml-4 text-gray-700 hover:text-gray-900">
                  <UserIcon className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                  <ChevronDownIcon className="h-5 w-5 ml-1" />
                </MenuButton>
                <Transition
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Account Settings
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Logout
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
};
