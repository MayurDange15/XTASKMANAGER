require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/tasks.routes");

const app = express();
const PORT = process.env.PORT || 8082;
const DB_URI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/task-manager";
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("Error in connecting DB", error));

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on Port ${PORT}!`);
});
