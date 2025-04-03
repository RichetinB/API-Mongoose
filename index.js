const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./mongodb");
const profileRoutes = require("./api/profiles");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", profileRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
