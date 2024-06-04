import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const Search = () => {
  return (
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
  );
};
