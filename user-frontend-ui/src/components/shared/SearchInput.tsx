"use client";

import { FC, FormEvent } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Search submitted", e.currentTarget.searchValue.value);
    // Handle search logic here
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <div className="relative w-full lg:w-[80%]">
        <input
          type="text"
          name="searchValue"
          className="block p-2.5 pr-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-primary outline-0"
          placeholder="Search for products here..."
          required
        />
        <button
          type="submit"
          className="absolute top-0 end-0 px-4 py-2.5 text-sm font-medium h-full text-primary-foreground bg-primary rounded-e-lg z-50 hover:cursor-pointer"
        >
          <IoSearch className="size-5.5" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
