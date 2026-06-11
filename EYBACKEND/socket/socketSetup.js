const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://auction-webproject-3.onrender.com"
      ],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected to socket: ${socket.id}`);

    // Join a specific auction room
    socket.on("joinAuction", (auctionId) => {
      socket.join(`auction:${auctionId}`);
      console.log(`Socket ${socket.id} joined room auction:${auctionId}`);
    });

    // Leave a specific auction room
    socket.on("leaveAuction", (auctionId) => {
      socket.leave(`auction:${auctionId}`);
      console.log(`Socket ${socket.id} left room auction:${auctionId}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIo };
