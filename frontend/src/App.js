import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {

  const isLoggedIn = localStorage.getItem("token");

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-lg font-bold">
          Internship Portal
        </h1>

        <div>

          <Link to="/" className="mr-4 hover:underline">
            Home
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="mr-4 hover:underline">
                Login
              </Link>

              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          )}

        </div>

      </nav>

      {/* Routes */}
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </div>

  );

}

export default App;