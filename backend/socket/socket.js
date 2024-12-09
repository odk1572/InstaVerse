import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.URL || "http://localhost:3000", // Fallback to localhost
        methods: ['GET', 'POST']
    }
});

const userSocketMap = {}; // This map stores socket id corresponding to the user id

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id; // Store the socket id against the user id
    }

    // Emit the updated list of online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // Handle disconnections
    socket.on('disconnect', () => {
        if (userId) {
            delete userSocketMap[userId]; // Remove user from the map on disconnect
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit updated online users list
    });
});

// Start the server
export { app, server, io };
