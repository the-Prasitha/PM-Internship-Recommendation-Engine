import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter a valid email");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:3002/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      window.location.href = "/dashboard";

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message || "Invalid login");
      } else {
        alert("Server not responding");
      }

    }

  };

  return (

    <div className="flex flex-col items-center justify-center mt-20">

      <h2 className="text-3xl font-bold mb-6">
        Login
      </h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 m-2 w-64 rounded"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-3 m-2 w-64 rounded"
      />

      <button
        onClick={loginUser}
        className="bg-blue-600 text-white px-6 py-2 mt-4 rounded"
      >
        Login
      </button>

    </div>

  );

}

export default Login;