import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (formData.username === "") {
      newErrors.username = "Username is required!";
    }

    if (formData.email === "") {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid!";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_URL}/users/add`, formData);
      setIsLoading(false);
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ToastContainer />
      <div className="w-full md:w-1/2 bg-blue-500 flex flex-col justify-center items-center rounded-sm">
        <h1 className="text-white text-4xl md:text-6xl md:font-semibold font-bold mb-8">
          App<span className="text-blue-300">Tittle</span>
        </h1>
      </div>
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="md:w-2/3">
          <div className="mb-6 mx-auto text-center">
            <h3 className="text-2xl font-bold">Signup</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="text-gray-500 text-sm font-bold"
                htmlFor="username"
              >
                USERNAME
              </label>
              <input
                type="text"
                placeholder="last name"
                name="username"
                className="input-field bg-white focus:bg-gray-100 border border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                onChange={handleChange}
                id="text"
              />

              {errors.username && (
                <span className="error-message text-red-500">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                className="text-gray-500 text-sm font-bold"
                htmlFor="email"
              >
                EMAIL
              </label>
              <input
                type="email"
                placeholder="email address"
                name="email"
                className="input-field bg-white focus:bg-gray-100 border border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                onChange={handleChange}
                id="email"
              />

              {errors.email && (
                <span className="error-message text-red-500">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="text-gray-500 text-sm font-bold"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input-field bg-white focus:bg-gray-100 border border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                id="password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-message text-red-500">
                  {errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline-block"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-75"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.418 0 8-3.582 8-8h-4a3.99 3.99 0 01-3.496 3.96l-.27.04-.628-.777A5.969 5.969 0 0112 18a5.968 5.968 0 01-5.606-3.977L5.766 13.37l-.678-.734z"
                  />
                </svg>
              ) : (
                "SIGNUP"
              )}
            </button>
            {isLoading && <span>loading ...</span>}
            <p className="text-gray-500 text-sm text-center mt-4">
              already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
