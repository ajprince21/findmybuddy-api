// socket/socketHandler.js

const Message = require("../models/messages");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // Add the decoded user information to the socket
      next();
    } catch (err) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // Join user to their room
    socket.on("joinRoom", (userId) => {
      // User-specific room
      socket.join(userId);
      console.log(`User with ID ${userId} joined their room`);
    });

    // Handle sending of messages
    socket.on("send_message", async (messageData) => {
      console.log("GETTING CALLED THIS SOCKET ");
      try {
        const { receiver_id, content } = messageData;
        const sender_id = socket.user.id;

        // Save the message to the database
        const newMessage = new Message({
          sender_id,
          receiver_id,
          content,
        });

        await newMessage.save();
        // Emit the message to the receiver and also to the sender for confirmation
        io.to(receiver_id).emit("receive_message", {
          ...newMessage.toObject(),
          sender: "them",
        });
        io.to(sender_id).emit("sent_message", {
          ...newMessage.toObject(),
          sender: "me",
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Handle typing status
    socket.on("typing", ({ receiver_id, isTyping }) => {
      io.to(receiver_id).emit("typing", { userId: receiver_id, isTyping });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.id}`);
    });
  });
};
