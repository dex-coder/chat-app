const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
app.use(cors());

const server = http.createServer(app);

//issues related cors
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    //joining room
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with Id: ${socket.id} joined room: ${data}`);
    })

    //receving msg here
    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("diconnected", () => {
        console.log("User Disconnected", socket.id);
    });
});


server.listen(3001, () => {
    console.log('Server Running');
});












