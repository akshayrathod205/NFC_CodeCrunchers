const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
