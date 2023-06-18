import React from "react";
import { FaGlassMartini, FaUser, FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white flex flex-col justify-center items-center overflow-y-scroll">
      <h1 className="text-4xl sm:text-6xl font-bold text-center mb-4 sm:mb-8">
        App<span className="text-blue-300">Title</span>
      </h1>
      <div className="m-5">
        <h2 className="text-lg font-bold m-1">How it works</h2>
        <p>Follow the steps below to get started</p>
      </div>
      <div className="flex justify-around flex-col items-center ">
        <div className="flex space-x-4 mb-10">
          <Link
            className="bg-white mx-5 text-black py-3 px-6 rounded-full hover:bg-gray-300 transition-colors duration-300"
            to="/register"
          >
            signup
          </Link>
          <Link
            className="bg-gray-800 mx-5 text-white py-3 px-6 rounded-full border border-white hover:bg-gray-900 transition-colors duration-300"
            to="/login"
          >
            signin
          </Link>
        </div>
        <div className="flex justify-around w-full max-w-3xl">
          <div className="card bg-white h-52 w-full sm:w-[30%] md:w-[30%] py-6 px-6 text-center border border-gray-300 rounded shadow-lg mb-8 mx-10">
            <p className="text-blue-600 text-4xl mb-4">
              <FaUser className="mx-auto" />
            </p>
            <h3 className="font-semibold text-lg mb-2 text-black">Step 1</h3>
            <p className="text-gray-600 text-sm">Start receiving orders</p>
          </div>
          <div className="card bg-white h-52 w-full sm:w-[30%] md:w-[30%] py-6 px-6 text-center border border-gray-300 rounded shadow-lg mb-8 mx-10">
            <p className="text-blue-600 text-4xl mb-4">
              <FaGlassMartini className="mx-auto" />
            </p>
            <h3 className="font-semibold text-lg mb-2 text-black">Step 2</h3>
            <p className="text-gray-600 text-sm">Start receiving orders</p>
          </div>
          <div className="card bg-white h-52 w-full sm:w-[30%] md:w-[30%] py-6 px-6 text-center border border-gray-300 rounded shadow-lg mb-8 mx-10">
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
