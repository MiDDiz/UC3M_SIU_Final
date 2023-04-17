const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
    }});

const SERVER_PORT = 3000;

app.use(
  "/",
  express.static(path.join(__dirname, "videoapp"))
); /* Link root address with root app folder*/

  


let clientSocket;

io.on("connection", (socket) => {
  /* Main connection listener */
  console.log(`socket connected ${socket.id}`);

  /* Mobile connection */
  socket.on("PLAYER_CONNECTED", () => {
    socket.emit("ACK_CONNECTION");
    
  });

  /*Mobile sensor reading */
  socket.on("DO_ACTION", (data) => {
    //console.log(data);
    if (clientSocket)
      clientSocket.emit("DO_ACTION_PLAYER", {
        pointerId: socket.id,
        action: data,
      });
  });

  /* Movie client connection */
  socket.on("MOBILE_CONNECTED", () => {
    clientSocket = socket;
    clientSocket.emit("ACK_CONNECTION");
     
  })

});

/* Throw server */
server.listen(SERVER_PORT, () => {
  console.log(`Server listening in port ${SERVER_PORT}...`);
});
