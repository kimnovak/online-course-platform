import {
  Menu,
  MenuItems,
  MenuItem,
  Transition,
  MenuButton,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export const Categories = () => {
  return (
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
  );
};
