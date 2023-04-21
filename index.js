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

  

let indexSocket = null;
let mobileSocket = null;
let playerSocket = null;

io.on("connection", (socket) => {
  /* Main connection listener */
  console.log(`socket connected ${socket.id}`);

  /* Index connection*/
  socket.on("INDEX_CONNECTED", () => {
    /* On index connection we want to check 
    if a controller is already connected */
    indexSocket = socket;
    indexSocket.emit("ACK_CONNECTION");
    if (mobileSocket) {
      /* Send info to index that a controller 
      is already connected */
      indexSocket.emit("CONTROLLER_CONNECTED");
    }
  });

  /* Player client connection */
  socket.on("PLAYER_CONNECTED", () => {
    playerSocket = socket; 
    console.log("PLAYER CONNECTED");
    playerSocket.emit("ACK_CONNECTION");
  });

  /* Mobile client connection */
  socket.on("MOBILE_CONNECTED", () => {
    mobileSocket = socket;
    console.log("MOBILE CONNECTED");
    mobileSocket.emit("ACK_CONNECTION");
    /* On mobile connection check if index is connected, 
    if so send confirmation to index*/
    if (indexSocket){
      indexSocket.emit("CONTROLLER_CONNECTED");
    }
  })

  /* Comunications between mobile and player */
 if (mobileSocket && playerSocket){
    /*Mobile action reading and sending to the player*/
    mobileSocket.on("DO_ACTION", (data) => {
      console.log(`Transfiriendo datos de ${mobileSocket.id} a ${playerSocket.id}`)
      console.log(data);
      playerSocket.emit("DO_ACTION_PLAYER", {
          pointerId: mobileSocket.id,
          action: data,
        
      });
    });
    /* Mobile request to show the notepad on the player */
    mobileSocket.on("SHOW_NOTEPAD", () => {
      let notepad = getAllNotes();
      playerSocket.emit("SHOW_NOTEPAD", notepad);
    });
  }

  /* Communications that only require a mobile */
  if (mobileSocket){
    // Adds a note to the notepad
    mobileSocket.on("ADD_NOTE", (text) => {
      addNewNote(text);
    });

  }

  /* Communications that only require the player */
  if (playerSocket){
    // The player requests the notepad without mobile (key 1 on keyboard)
    playerSocket.on("REQUEST-NOTEPAD");
    let notepad = getAllNotes();
    playerSocket.emit("SHOW_NOTEPAD", notepad);
  }
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
