import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col h-fit bg-gray-100 text-gray-800">
      <div className="flex items-center justify-between rounded-sm py-4 bg-blue-500">
        {isMenuOpen ? (
          <button className="text-white text-2xl" onClick={toggleMenu}>
            <FiX />
          </button>
        ) : (
          <button className="text-white text-2xl" onClick={toggleMenu}>
            <FiMenu />
          </button>
        )}
        <div className="hidden md:flex">
          <span className="text-white text-2xl font-bold">App</span>
          <span className="text-blue-300 text-2xl font-bold">Title</span>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="flex-grow">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
            >
              <FiHome className="mr-2" />
              Dashboard
            </Link>
            <Link
              to="/account"
              className="flex items-center py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
            >
              <FiUser className="mr-2" />
              Account
            </Link>
          </nav>
          <div className="flex justify-center py-4">
            <button
              className="flex items-center py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
              onClick={logout}
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
