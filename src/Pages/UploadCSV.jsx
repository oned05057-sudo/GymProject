import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile); // check if file is detected
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("FormData before sending:", formData.get("file"));

    try {
      const res = await fetch("http://localhost:4000/api/user/create", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("Server response:", result);

      if (!res.ok) throw new Error(result.message || "Upload failed");

      setMessage("CSV uploaded successfully!");
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-lg w-full animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Upload Users CSV
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-300"
          >
            Upload
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center text-white font-medium animate-fadeIn">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadCSV;
