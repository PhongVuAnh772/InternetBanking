const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const socket = require("socket.io");
const rootRouter = require("./routes/routes");
require("dotenv").config();
const pg_URL = process.env.PG_URL;
// const pg = require('pg');

// const sequelize = new Sequelize('vp_bank', 'postgres', '22092002', {
//   host: 'localhost',
//   dialect: 'postgres'
// })

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD_DBS,
  {
    host: process.env.HOST, 
    dialect: "mysql",
    
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Authenticated");
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
};
connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api", rootRouter);

const server = app.listen(5000, () =>
  console.log(`app listened on port: ${5000}`)
);
