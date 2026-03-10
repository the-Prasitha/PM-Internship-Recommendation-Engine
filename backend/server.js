const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/recommend", async (req, res) => {

    try {

        const skills = req.body.skills;

        const response = await axios.post(
            "http://127.0.0.1:5000/predict",
            { skills: skills }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: "AI prediction failed"
        });

    }

});

app.listen(3002, () => {
    console.log("Backend running on port 3002");
});