import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    alert(`Login Successful! Welcome`);
    navigate("/upload"); // login ke baad UploadCSV page
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gym.jpg')" }}
    >
      <div className="bg-gray-900/90 shadow-2xl rounded-2xl p-2 w-96 transform transition duration-500 hover:scale-105 animate-fadeIn">
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Gym Login
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
