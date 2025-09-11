import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Signup successful!");
    navigate("/upload"); // signup ke baad UploadCSV page
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/gym2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create Account
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength="10"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
