const socket = io();

var possY_inicial = 0;
var posY_final = 0;
var tiempo_i = 0;
var tiempo_f = 0;
var n_dedos = 0;
var desplazamiento_arriba = 0;


socket.on("connect", () => {
  socket.emit("POINTER_CONNECTED");
});

socket.on("ACK_CONNECTION", () => {
  console.log("MÓVIL CONECTADO");
  // lanzar avelerometro  
});

function send_action(action, text){
  if (action == "NOTEPAD"){
    socket.emit("SEND_NOTEPAD", text);
  } else {
    socket.emit("DO_ACTION", action);
  }
  
}

// Codigo incompleto para adaptarlo 

const acl = new Accelerometer({ frequency: 60 });
/*
acl.addEventListener("reading", () => { // Cambiar evento por touch
  possY_inicial = acl.y; 
});
*/

acl.start();
/*
setInterval( () => {
  // Meter cambios
  let diff_ejeY = Math.abs(posY_final - possY_inicial);
  // Luego actulizar 
  posY_final =  possY_inicial;

})
*/

acl.addEventListener("touchstart", (evento) => { 
  possY_inicial = evento.changedTouches[0].pageX;
  tiempo_i= new Date.now();
  if (evento.touches.length == 4){
    // lanzar directamente notepad
    n_dedos = 4;
  }
  else if(evento.touches.length == 3){
    n_dedos = 3;
  }
  else if(evento.touches.length == 2){
    n_dedos = 2;
  }
  else if (evento.touches.length == 1){
    n_dedos = 1;
  }
  else {
    //RAISE ERROR
  }
});

acl.addEventListener("decivemotion", (evento) =>  {
let diff_ejeY = Math.abs(posY_final - possY_inicial); // desplazamiento hacia arriba + y hacia abajo -
tiempo_f= new Date.now();
let velocidad = diff_ejeY / (tiempo_f - tiempo_i);
if((velocidad) > 50 || (velocidad) < -50){ 
  if ((velocidad) > 50){
    desplazamiento_arriba = 1;
  }
  // Si se cumple el gesto hacer .....
  switch(n_dedos){
    case 3:
      if (desplazamiento_arriba = 1){
        // siguiente video
      } else {
        // anterior video
      }
      break;
    case 2:
      if (desplazamiento_arriba = 1){
        // lanzar subir volumen
        /*send_action("VOLUME_UP"); */
      } else {
        // lanzar bajar volumen
      }
      break;
    case 1:
      // lanzar funcion_alternar_pausa_play sin mirar el tipo de desplazamiento
      break;
  }
}
});

