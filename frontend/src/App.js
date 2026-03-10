import React, { useState } from "react";
import axios from "axios";

function App() {

  const [skills, setSkills] = useState("");
  const [result, setResult] = useState([]);

  const getRecommendation = async () => {
    try {

      const response = await axios.post(
        "http://localhost:3002/recommend",
        { skills: skills }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>AI Internship Recommendation</h1>

      <input
        type="text"
        placeholder="Enter skills (example: html css javascript)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <br /><br />

      <button onClick={getRecommendation}>
        Get Recommendation
      </button>

      <h2>Recommended Internships</h2>

      {result.map((job, index) => (
        <p key={index}>
          {job.title} — {job.company}
        </p>
      ))}

    </div>
  );
}

export default App;