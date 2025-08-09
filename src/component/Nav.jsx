import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeToggle from "./ThemeToggle";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import { FiChevronDown, FiUser, FiLogOut, FiBookOpen, FiPlusCircle, FiBook } from "react-icons/fi";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const userMenuRef = useRef();











  

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully", { position: "top-center", autoClose: 2000 });
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error.message}`, { position: "top-center" });
      });
  };

  const homeLink = [{ path: "/", label: "Home", icon: <FiBookOpen className="inline-block mr-2" /> }];
  const extraLinks = [
    { path: "/auth/all-books", label: "All Books", icon: <FiBook className="inline-block mr-2" /> },
    { path: "/auth/add-book", label: "Add Book", icon: <FiPlusCircle className="inline-block mr-2" /> },
    { path: "/auth/borrowed", label: "Borrowed Books", icon: <FiBookOpen className="inline-block mr-2" /> },
  ];

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMore(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-1 z-50 flex justify-center bg-transparent px-5  lg:px-9 ">
      <div className="w-[99%]  mx-auto px-5 py-2 flex justify-between items-center rounded-full backdrop-blur-xl bg-white/60 border border-gray-300 shadow-md">
        
        
        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-2xl font-extrabold shadow-sm select-none hover:brightness-110 transition"
        >
          Library<span className="text-yellow-400">Manage</span>
        </NavLink>

       
        <nav className="hidden lg:flex items-center space-x-4 font-medium text-gray-700 select-none">
          {homeLink.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-300 to-purple-300 text-gray-900 shadow-md"
                    : "hover:bg-blue-100 hover:text-blue-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-teal-300 to-green-300 text-gray-800 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
                aria-haspopup="true"
                aria-expanded={showMore}
              >
                More <FiChevronDown className={`ml-2 transition-transform ${showMore ? "rotate-180" : "rotate-0"}`} />
              </button>
              <div
                className={`absolute top-full mt-2 left-0 min-w-[180px] bg-white rounded-2xl shadow-lg border border-gray-200 p-3 space-y-2
                  transform transition-all duration-200 origin-top
                  ${showMore ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
                role="menu"
              >
                {extraLinks.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => {
                      setShowMore(false);
                      setIsMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition ${
                        isActive ? "font-semibold bg-blue-50 text-blue-800" : "font-normal"
                      }`
                    }
                    role="menuitem"
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

       
        <div className="hidden lg:flex items-center gap-4 relative" ref={userMenuRef}>
          {user ? (
            <>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="focus:outline-none focus:ring-2 focus:ring-teal-300 rounded-full"
                aria-haspopup="true"
                aria-expanded={showUserMenu}
                aria-label="User menu"
              >
                <img
                  src={user.photoURL || "https://i.pravatar.cc/100"}
                  alt="User"
                  className="h-11 w-11 rounded-full border-2 border-purple-200 shadow-sm transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
              </button>

           
              <div
                className={`absolute right-0 top-full mt-3 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 p-3
                  transform transition-all duration-200 origin-top-right
                  ${showUserMenu ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
                role="menu"
              >
                <NavLink
                  to="/auth/myProfile"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-800 font-medium transition flex items-center"
                  role="menuitem"
                >
                  <FiUser className="mr-2" /> My Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleLogOut();
                    setShowUserMenu(false);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 font-semibold transition flex items-center"
                  role="menuitem"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
              <ThemeToggle />
            </>
          ) : (
            <>
              <NavLink to="/auth/signIn" onClick={() => setIsMenuOpen(false)}>
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-teal-300 to-green-300 text-gray-800 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-200 transition">
                  Sign in
                </button>
              </NavLink>
              <NavLink to="/auth/signUp" onClick={() => setIsMenuOpen(false)}>
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 text-gray-800 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-200 transition">
                  Register
                </button>
              </NavLink>
              <ThemeToggle />
            </>
          )}
        </div>

      
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 text-blue-600 hover:text-blue-900 transition focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
        >
          {isMenuOpen ? (
            <RxCrossCircled className="text-4xl text-pink-400" />
          ) : (
            <HiMenuAlt3 className="text-4xl text-blue-600" />
          )}
        </button>
      </div>

      
      <nav
        className={`fixed top-0 left-0 h-full w-72 max-w-full bg-white shadow-xl border-r border-gray-200 flex flex-col px-6 py-8
          transform transition-transform duration-300 z-50
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Mobile Menu"
      >
        <div className="flex items-center justify-between mb-8">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-extrabold text-gray-800 select-none"
          >
            Library<span className="text-yellow-400">Manage</span>
          </NavLink>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
            className="p-1 rounded-full text-gray-700 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          >
            <RxCrossCircled className="text-3xl" />
          </button>
        </div>

       
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
          {homeLink.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg font-medium text-lg transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-blue-300 to-purple-300 text-gray-900 shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}

          {user && (
            <>
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-teal-300 to-green-300 text-gray-800 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
                aria-expanded={showMore}
                aria-controls="more-menu"
              >
                More <FiChevronDown className={`ml-2 transition-transform ${showMore ? "rotate-180" : "rotate-0"}`} />
              </button>
              {showMore && (
                <div
                  id="more-menu"
                  className="flex flex-col gap-3 pl-4 mt-2 border-l border-gray-300"
                >
                  {extraLinks.map(({ path, label, icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={() => {
                        setShowMore(false);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition font-medium"
                    >
                      {icon}
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

    
        {user ? (
          <div className="mt-auto pt-6 border-t border-gray-300 flex flex-col gap-3">
            <NavLink
              to="/auth/myProfile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-800 font-medium transition"
            >
              <FiUser className="mr-3" /> My Profile
            </NavLink>
            <button
              onClick={() => {
                handleLogOut();
                setIsMenuOpen(false);
              }}
              className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-rose-300 to-pink-300 text-gray-900 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-200 transition"
            >
              <FiLogOut className="mr-3" /> Logout
            </button>
            <ThemeToggle />
          </div>
        ) : (
          <div className="mt-auto pt-6 border-t border-gray-300 flex flex-col gap-4">
            <NavLink to="/auth/signIn" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-teal-300 to-green-300 text-gray-800 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-200 transition">
                Sign in
              </button>
            </NavLink>
            <NavLink to="/auth/signUp" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-300 to-indigo-300 text-gray-800 font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-200 transition">
                Register
              </button>
            </NavLink>
            <ThemeToggle />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
