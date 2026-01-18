require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/recommend", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.ML_SERVER_URL}/recommend`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "ML server not responding" });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.ML_SERVER_URL}/movies`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "ML server not responding" });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${process.env.ML_SERVER_URL}/movie/${id}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "ML server not responding" });
  }
});


app.listen(5000, () => {
  console.log("Node server running on port 5000");
});
