const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dataRoute = require("./routes/data");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database Connected")
);

app.use(express.json());
app.use(cors());
app.use("/api", dataRoute);

app.listen(3001, () => console.log("server is up and running"));
