import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeToggle from './ThemeToggle';


import { HiMenuAlt3 } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully', {
          position: "top-center",
          autoClose: 2000,
        });
        navigate('/');
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error.message}`, {
          position: "top-center",
        });
      });
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/auth/all-books", label: "All Books" },
    { path: "/auth/add-book", label: "Add Book" },
    { path: "/auth/borrowed", label: "Borrowed Books" },
    { path: "/auth/myProfile", label: "MyProfile" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/30 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 lg:px-10 py-3">
        <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-0 select-none">
          <h2 className="text-3xl font-extrabold text-gray-900 select-none pb-[6px]">
            <span className="text-blue-600">Library</span><span className="text-red-600">Manage</span>
          </h2>
        </NavLink>

        <nav className="hidden text-purple-600 font-bold lg:flex space-x-10 ">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `relative pb-1 transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                    : "hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="relative group cursor-pointer">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/100"}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500 shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 mt-1 border-[1px] bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                  {user.displayName || "User"}
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Logout
              </button>
              <ThemeToggle />
            </div>
          ) : (
            <>
              <NavLink to="/auth/signIn" onClick={() => setIsMenuOpen(false)}>
                <button className="px-5 py-2 rounded-md border border-gray-500 text-gray-700 bg-emerald-300 font-semibold hover:bg-gray-100 transition">
                  Sign in
                </button>
              </NavLink>
              <NavLink to="/auth/signUp" onClick={() => setIsMenuOpen(false)}>
                <button className="px-5 py-2 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-900 transition">
                  Register
                </button>
              </NavLink>
              <ThemeToggle />
            </>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition"
        >
          {isMenuOpen ? (
            // <svg xmlns="http://www.w3.org/2000/svg" className="h-7  w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <RxCrossCircled className='text-4xl text-fuchsia-500'/>
            //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            // </svg>
          ) : (
            // <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            // </svg>
            <HiMenuAlt3 className='text-4xl text-fuchsia-500' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white/10 backdrop-blur-lg shadow-md border-t border-white/30 px-6 py-6 space-y-4 font-semibold text-purple-600">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 rounded hover:bg-blue-100 transition"
            >
              {label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/100"}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500 shadow-md"
                />
                <span className="font-semibold text-gray-900">{user.displayName || "User"}</span>
              </div>
              <button
                onClick={() => {
                  handleLogOut();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-2xl border border-blue-600 bg-amber-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Logout
              </button>
              <ThemeToggle />
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <NavLink to="/auth/signIn" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-md border border-gray-500 text-gray-700 font-semibold bg-emerald-300 hover:bg-gray-100 transition">
                  Sign in
                </button>
              </NavLink>
              <NavLink to="/auth/signUp" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700 transition">
                  Register
                </button>
              </NavLink>
              <ThemeToggle />
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Nav;
