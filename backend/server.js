const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes =require("./routes/applicationRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);




app.get("/", (req, res) => {
  res.send("CareerPilot API Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});