const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const budgetRouter = require("./routes/budgets");
const messagesRouter = require("./routes/messages");
require("dotenv").config();
const app = express();

app.use(express.static("./public"));
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/budgets", budgetRouter);
app.use("/api/v1/messages", messagesRouter);

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
