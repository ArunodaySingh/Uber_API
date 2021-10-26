const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.URI)
  .then(() => console.log("connection is sucessful"))
  .catch((err) => console.log("NO connection", err));