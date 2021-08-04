const http = require("http");
const express = require("express");

const app = express();
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);
let counter = 0;
io.on("connection", (sock) => {
    console.log("somebody connected : count " + counter);
    counter++;
    sock.on("data", (data) => {
        io.emit("data", data);
    });
});

const port = 3001;

app.use(express.static("public"));
// app.use(express.json({ limit: "1mb" }));

// app.post("/api", (req, res) => {
//     const data = req.body;
//     console.log(data.text);
//     res.json({ status: "success" });
// });

server.on("error", (err) => {
    console.error(err);
});

server.listen(port, () => {
    console.log(`listening at ${port}`);
});
