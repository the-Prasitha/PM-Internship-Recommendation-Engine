import React, { useState } from "react";
import axios from "axios";

function Dashboard() {

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (!token) {
    window.location.href = "/login";
  }

  const [skills, setSkills] = useState("");
  const [result, setResult] = useState([]); // MUST be array
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {

    if (!skills) {
      alert("Please enter skills");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/predict",
        { skills }
      );

      console.log("API Response:", res.data);

      // ✅ FIX: ensure result is always array
      if (Array.isArray(res.data)) {
        setResult(res.data);
      } else {
        setResult([]);
      }

      setLoading(false);

    } catch (error) {

      console.log(error);

      setResult([]); // prevent crash
      setLoading(false);

      alert("Error fetching internships");

    }

  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Top Bar */}
      <div className="flex justify-end items-center p-4 bg-white shadow">

        <span className="mr-4 text-gray-700 font-medium">
          {email}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Search */}
      <div className="flex flex-col items-center mt-16">

        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Find Your Internship 🚀
        </h2>

        <div className="flex shadow-lg rounded-lg overflow-hidden">

          <input
            type="text"
            placeholder="Enter skills (e.g. python, web development)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="p-4 w-96 outline-none"
          />

          <button
            onClick={getRecommendation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Search
          </button>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-6 text-gray-500">
          Fetching internships...
        </p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 px-10">

        {Array.isArray(result) && result.map((job, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >

            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {job.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {job.company}
            </p>

            <a
              href={`https://www.google.com/search?q=${job.title} ${job.company} internship`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full">
                Apply Now
              </button>
            </a>

          </div>

        ))}

      </div>

      {/* No Results */}
      {(!Array.isArray(result) || result.length === 0) && !loading && (
        <p className="text-center mt-10 text-gray-500">
          No internships found. Try different skills.
        </p>
      )}

    </div>

  );

}

export default Dashboard;