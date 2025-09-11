import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UploadCSV from "./Pages/UploadCSV";
import Users from "./Pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadCSV />} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    </Router>
  );
}

export default App;
