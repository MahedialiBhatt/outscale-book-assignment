const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/router");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use("/", (req, res) => {
  res.send("Welcome to the Book Management server...");
});

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
