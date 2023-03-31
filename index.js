const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const SERVER_PORT = 3030;

app.use(
  "/",
  express.static(path.join(__dirname, "videoapp/player"))
); /* Link root address with root app folder*/

let clientSocket;

io.on("connection", (socket) => {
  /* Main connection listener */
  console.log(`socket connected ${socket.id}`);

  /* Mobile connection */
  socket.on("POINTER_CONNECTED", () => {
    socket.emit("ACK_CONNECTION");
    if (clientSocket)
      clientSocket.emit("NEW_POINTER", { pointerId: socket.id });
  });

  /* Mobile sensor reading */
  socket.on("SENSOR_READING", (data) => {
    //console.log(data);
    if (clientSocket)
      clientSocket.emit("SENSOR_READING", {
        pointerId: socket.id,
        coords: data,
      });
  });

  /* Movie client connection */
  socket.on("CLIENT_CONNECTED", () => {
    clientSocket = socket;
    clientSocket.emit("ACK_CONNECTION");
  });

});

/* Throw server */
server.listen(SERVER_PORT, () => {
  console.log("Server listening...");
});
