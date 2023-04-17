const socket = io();

var possY_inicial = 0;
var tiempo_i = null;
var n_dedos = 0;
var desplazamiento_arriba = 0;


socket.on("connect", () => {
  socket.emit("MOBILE_CONNECTED");

  socket.on("ACK_CONNECTION", () => {
    console.log("MÓVIL CONECTADO");

  });
  socket.emit("DO_ACTION", "HOLQ");
});


function send_action(action, text){
  if (action == "NOTEPAD"){
    socket.emit("SEND_NOTEPAD", text);
  } else {
    socket.emit("DO_ACTION", action);
  }
  
}

// Codigo incompleto para adaptarlo 

//const acl = new Accelerometer({ frequency: 60 });
/*
acl.addEventListener("reading", () => { // Cambiar evento por touch
  possY_inicial = acl.y; 
});
*/

//acl.start();
/*
setInterval( () => {
  // Meter cambios
  let diff_ejeY = Math.abs(posY_final - possY_inicial);
  // Luego actulizar 
  posY_final =  possY_inicial;

})
*/

document.addEventListener("touchstart", (evento) => { 
  possY_inicial = acl.y;
  tiempo_i= Date.now();
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
    n_dedos = 0;
    //RAISE ERROR
  }
});

window.addEventListener("devicemotion", (evento) =>  {
  if (!tiempo_i) {
    tiempo_i = evento.timeStamp;
    posY_inicial = evento.accelerationIncludingGravity.y;
    return;
  }
  let tiempo_f = evento.timeStamp;
  let tiempo_transcurrido = tiempo_f - tiempo_i;
  tiempo_i = null;
  let posY_final = evento.accelerationIncludingGravity.y;
  let diff_ejeY = Math.abs(posY_final - posY_inicial);


  let velocidad = diff_ejeY / tiempo_transcurrido;




  if((velocidad) > 0.1 || (velocidad) < -0.1){ 

    if ((velocidad) > 0.1 && desplazamiento_arriba == 0){
      desplazamiento_arriba = 1;
    
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
          desplazamiento_arriba = 1;
          console.log("COSAS")

          n_dedos = 0;
          break;
      }
    }
  }
  if ((velocidad) < 0.1 && (velocidad) >-0.1){
    desplazamiento_arriba = 0;
  }

});


// Luego mover al notepad


function reconocer_voz (){
  if ("webkitSpeechRecognition" in window) {
    const recnocimiento_voz = new webkitSpeechRecognition();
    recnocimiento_voz.continuous = true // Activar al dar al boton o lo que sea de activar el micro
    recnocimiento_voz.lang ='es-ES';

    // recnocimiento_voz.interimResults = true
    let voz = "";
    recnocimiento_voz.onresult = (evento) =>{
      const transcript = evento.results[evento.results.length - 1][0].transcript;
      voz += transcript;

      console.log(transcript);
      console.log("TOTAL ", voz);
    }
    recnocimiento_voz.start();
    reconocimiento_voz.onstart = () => {
    console.log("Reconocimiento  voz "); // Borrar luego
    navigator.vibrate([3000]);
    }
    reconocimiento_voz.onend = () => {
    console.log("Fin reconocimiento  voz  "); // Borrar luego
    navigator.vibrate([1000, 500])
    return voz;
    }
  }
  else{
    alert("El reconocimiento de voz no es compatible");
    return -1;
  }
  return 0;
}