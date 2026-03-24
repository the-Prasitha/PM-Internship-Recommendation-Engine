import React, { useState } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {

      await axios.post("https://pm-internship-recommendation-engine-u29k.onrender.com/api/auth/login", {
        name,
        email,
        password
      });

      alert("Signup successful ✅");

      window.location.href = "/login";

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message || "Signup failed");
      } else {
        alert("Server error");
      }

    }

  };

  return (

    <div className="flex flex-col items-center justify-center mt-20">

      <h2 className="text-3xl font-bold mb-6">
        Signup
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-3 m-2 w-64 rounded"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 m-2 w-64 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-3 m-2 w-64 rounded"
      />

      <button
        onClick={registerUser}
        className="bg-green-600 text-white px-6 py-2 mt-4 rounded"
      >
        Signup
      </button>

    </div>

  );

}

export default Signup;