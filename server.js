const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const socketHandler = require("./socket/socketHandler");
const feedRoutes = require("./routes/feed");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/feeds", feedRoutes);

// Socket.IO events
socketHandler(io);

const PORT = process.env.PORT || 5000;
const LOCAL_IP = "0.0.0.0";
server.listen(PORT, LOCAL_IP, () =>
  console.log(`Server running on http://${LOCAL_IP}:${PORT}`)
);
