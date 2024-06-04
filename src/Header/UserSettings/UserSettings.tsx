import {
  Menu,
  MenuItems,
  MenuItem,
  Transition,
  MenuButton,
} from '@headlessui/react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid';

export const UserSettings = () => {
  return (
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
  );
};
