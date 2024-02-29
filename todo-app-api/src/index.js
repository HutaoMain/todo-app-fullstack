const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

dotEnv.config();

const TaskRouter = require("./routes/TaskRouter");

const app = express();
app.use(express.json());

app.use(cors());

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

app.use("/api/task", TaskRouter);

const PORT = 5000;
app.listen(PORT, () => {
  connect();
  console.log(`server is listening to port ${PORT}`);
});
