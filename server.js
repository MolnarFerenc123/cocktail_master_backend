const express = require("express");
const cors = require("cors");
const sequelize = require("./src/data/datasources/db");
const cocktailRoutes = require("./src/presentation/routes/CocktailRoutes");
const authRoutes = require("./src/presentation/routes/AuthRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cocktails", cocktailRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CoctailMaster Backend is running.");
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to MySQL database.");
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Couldn't connect to database: `, err);
  });
