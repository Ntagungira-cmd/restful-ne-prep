import React from "react";
import {
  FaSearch,
  FaBell,
  FaGlassMartini,
  FaUser,
  FaQrcode,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-8">
        App<span className="text-blue-300">Title</span>
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-4 mb-10">
          <Link
            className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
            to="/register"
          >
            Don't have an account? Register
          </Link>
          <Link
            className="bg-gray-800 text-white py-3 px-6 rounded-full border border-white hover:bg-gray-900 transition-colors duration-300"
            to="/login"
          >
            Already registered? Login
          </Link>
        </div>
        <div className="flex justify-between w-full max-w-3xl">
          <div className="card bg-white h-52 w-[30%] py-6 px-6 text-center border border-gray-300 rounded shadow-lg mb-8">
            <p className="text-blue-600 text-4xl mb-4">
              <FaUser className="mx-auto" />
            </p>
            <h3 className="font-semibold text-lg mb-2 text-black">Step 3</h3>
            <p className="text-gray-600 text-sm">Start receiving orders</p>
          </div>
          <div className="card bg-white h-52 w-[30%] py-6 px-6 text-center border border-gray-300 rounded shadow-lg mb-8">
            <p className="text-blue-600 text-4xl mb-4">
              <FaGlassMartini className="mx-auto" />
            </p>
            <h3 className="font-semibold text-lg mb-2 text-black">Step 3</h3>
            <p className="text-gray-600 text-sm">Start receiving orders</p>
          </div>
          <div className="card bg-white h-52 w-[30%] py-6 px-6 text-center border border-gray-300 rounded shadow-lg mb-8">
            <p className="text-blue-600 text-4xl mb-4">
              <FaQrcode className="mx-auto" />
            </p>
            <h3 className="font-semibold text-lg mb-2 text-black">Step 3</h3>
            <p className="text-gray-600 text-sm">Start receiving orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
