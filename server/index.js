const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/routes.js");
const { Sequelize } = require("sequelize");
const socket = require("socket.io");

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

const server = app.listen(PORT, () => console.log(`app listened on port: ${PORT}`));

const io = socket(server, {
  cors: {
    origin: "https://localhost:3000",
    credentials: true,
  }
} )

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', userId => {
    onlineUsers.set(userId,socket.id);
  })
  socket.on("send-msg",data => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-received",data.msg)
    }
  })
})
