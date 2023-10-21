import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-500">Lucky</span>
            <span className="text-slate-700">Estate</span>
          </h1>
          <form
            action=""
            className="p-2 md:p-3 rounded-lg bg-slate-100 flex items-center sm:w-72 w-52"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
            <FaSearch />
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden font-medium font-sans sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden font-medium font-sans sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>

            <Link to="/sign-in">
              <li className="hidden font-medium font-sans sm:inline text-slate-700 hover:underline">
                Sign in
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
