import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="relative w-[35%]  ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full xs:py-2 py-1 bg-[var(--bgColorSecondary)] xs:px-4 px-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
      />
      <button type='button' className='absolute xs:top-3 xs:right-3 right-2 top-2 cursor-pointer bg-[var(--bgColorSecondary)]'>
        <IoSearch />
      </button>
    </div>
  )
}

export default Search
