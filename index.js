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

  


var clientSocket = null;
var playerSocket = null;

io.on("connection", (socket) => {
  /* Main connection listener */
  console.log(`socket connected ${socket.id}`);

  /* Player connection */
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
  });

    /* Comunications between mobile and player */
      socket.on("DO_ACTION", (data) => {
        if (clientSocket && socket.id == clientSocket.id){
          console.log(`Transfiriendo datos de ${clientSocket.id} a ${playerSocket.id}`)
          console.log(data);
          playerSocket.emit("DO_ACTION_PLAYER", {
              pointerId: clientSocket.id,
              action: data,    
           });
      }
      });
      /* Mobile request to show the notepad on the player */
      socket.on("SHOW_NOTEPAD", () => {
        if (clientSocket && socket.id == clientSocket.id){
          let notepad = getAllNotes();
          playerSocket.emit("SHOW_NOTEPAD", notepad);
        }
      });
  
    /* Communications that only require a mobile */

    // Adds a note to the notepad
    socket.on("ADD_NOTE", (text) => {
      if (clientSocket && socket.id == clientSocket.id){
      console.log("Adding note");
      addNewNote(text);
      }
    });
});

/*Inserts a new note on the notepad. 
If it already has 8 notes, it removes the least recent*/
function addNewNote(text){
  let data = fs.readFileSync("notes.json");
  const json = JSON.parse(data);
  json.texts.unshift(text);
  if (json.texts.length > 8) {
    json.texts.pop();
  }
  fs.writeFileSync("notes.json", JSON.stringify(json)); 
}

/*Returns a list of all the notes on the json*/
function getAllNotes() {
  let data;
  data = fs.readFileSync("notes.json");
  const notes = JSON.parse(data);
  return notes.texts;
}


/* Throw server */
server.listen(SERVER_PORT, () => {
  console.log(`Server listening in port ${SERVER_PORT}...`);
});
