const express = require("express")
const http = require("http")
const { Server } = require("socket.io");
const path = require("path")

const port = 3000
const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve("./public")))
app.get('/', (req, res) => {
    res.sendFile("/public/index.html")
})

const io = new Server(server);

// Socket.io

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message)
    });
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
