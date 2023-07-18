const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/routes.js");
const { Sequelize } = require("sequelize");

const PORT = 5000;

const sequelize = new Sequelize("banking_db", "root", "22092002", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDB();
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(cors());

app.use("/api", rootRouter);

app.listen(PORT, () => console.log(`app listened on port: ${PORT}`));
