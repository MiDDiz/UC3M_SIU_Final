const fs = require('fs');
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

  


let clientSocket = null;
let playerSocket = null;

io.on("connection", (socket) => {
  /* Main connection listener */
  console.log(`socket connected ${socket.id}`);

  /* Mobile connection */
  socket.on("PLAYER_CONNECTED", () => {
    playerSocket = socket; 
    console.log("PLAYER CONNECTED");
    playerSocket.emit("ACK_CONNECTION");
    
  });

  /* Mobile client connection */
  socket.on("MOBILE_CONNECTED", () => {
    clientSocket = socket;
    console.log("MOBILE CONNECTED");
    clientSocket.emit("ACK_CONNECTION");
  })


 if (clientSocket){
    /*Mobile sensor reading */
    clientSocket.on("DO_ACTION", (data) => {
      console.log(`Transfiriendo datos de ${clientSocket.id} a ${playerSocket.id}`)
      console.log(data);
      playerSocket.emit("DO_ACTION_PLAYER", {
          pointerId: clientSocket.id,
          action: data,
        
      });
    });
    /*socket.on("SEND_NOTEPAD", (text) => {
      addNewNote(text);
    });*/

  };
});


function addNewNote(text){
  let newnote = JSON.parse(text);
  prev_notes = readAllNotes();
  console.log(`New note: \n ${newnote}...`);
  console.log(`Previous notes: \n ${prev_notes}...`);
  fs.writeFileSync("notes.json", JSON.stringify(data, null, 2));
  return;
}

/*async function that read all the json content */

const serveStaticFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if(err) reject(err);
      resolve(data);
    });
  });
} 


function readAllNotes(){
  let jsoncontent = serveStaticFile("notes.json");
  return jsoncontent;
}

/*addNewNote("Hola buenas tardes");
addNewNote("Patata");*/

/* Throw server */
server.listen(SERVER_PORT, () => {
  console.log(`Server listening in port ${SERVER_PORT}...`);
});
