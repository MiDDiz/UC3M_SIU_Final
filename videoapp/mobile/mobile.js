const socket = io();

let velocidad = 0;



var n_dedos = 0;
var subiendo = 0;
/*Var de control utilizada para solo detectar una acción cada vez */
var realizando_accion = 0;
var accion_mandada = 0;


socket.on("connect", () => {
  socket.emit("MOBILE_CONNECTED");
  socket.on("ACK_CONNECTION", () =>{
    console.log("MÓVIL CONECTADO");
  });
});
  

  function send_action(action, text){
    if (action == "NOTEPAD"){
      socket.emit("SEND_NOTEPAD", text);
    } else {
      socket.emit("DO_ACTION", action);
      navigator.vibrate(200);
      console.log(action);
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

document.addEventListener("touchstart", (evento) => { 

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


  window.addEventListener("devicemotion", (evento) =>  {
    velocidad = evento.accelerationIncludingGravity.y;

    if(((velocidad) > 3 || (velocidad) < -3) && realizando_accion == 0){
      /*console.log(`dif: ${velocidad}`);*/
      vel_buff = velocidad 
      realizando_accion = 1;
      //Este fragmento indica si la acción realizada es de subida o bajada
      if((vel_buff) > 0){
        subiendo = 1;
      } else if (vel_buff < 0) {
        subiendo = 0;
      }
      /* A continuación, hacemos el switch para poder mandar 
      distintas acciones en función del número de dedos*/
      switch(n_dedos){
        case 3:
            if (subiendo == 1){
              // siguiente video
              send_action("VIDEO-NEXT");
            } else{
              // anterior video
              send_action("VIDEO-PREV");
            }
            setTimeout(() => {
              n_dedos = 0;
              accion_mandada = 1;} 
              , 500);
          break;
        case 2:
          if (subiendo == 1){
            // subir volumen
            send_action("VOLUME-UP");
          } else{
            // bajar video
            send_action("VOLUME-DOWN");
          }
          setTimeout(() => {
            n_dedos = 0;
            accion_mandada = 1;} 
            , 500);
          break;
        case 1:
          //Para el play/pausa, no importa si se realiza subida o bajada
          send_action("PLAY-PAUSE");
          setTimeout(() => {
            n_dedos = 0;
            accion_mandada = 1;} 
            , 500);
          break;
      }
    }
    // Si no se realiza ninguna acción, se resetea la variable
    if ((velocidad) < 1 && (velocidad) >-1 && realizando_accion == 1 && accion_mandada == 1){
      realizando_accion = 0;
    }
  });

  // Luego mover al notepad

const reconocer_voz = () =>{
  if ("webkitSpeechRecognition" in window) {
    const recnocimiento_voz = new webkitSpeechRecognition();
    recnocimiento_voz.continuous = true // Activar al dar al boton o lo que sea de activar el micro
    recnocimiento_voz.interimResults = true
    let voz = "";
    recnocimiento_voz.onresult = (evento) =>{
      const transcript = event.results[event.results.length - 1][0].transcript;
      voz += transcript;
      console.log(transcript);
      
    }
    recnocimiento_voz.start();
  }
  else{
    alert("El reconocimiento de voz no es compatible");
  }
}


// Botones mando
var boton_arr= document.getElementById("arr");
var boton_izq = document.getElementById("izq");
var boton_ok = document.getElementById("ok");
var boton_der = document.getElementById("der");
var boton_abj = document.getElementById("abj");
var boton_volver = document.getElementById("volver");
var boton_notepad = document.getElementById("notepad");

boton_arr.addEventListener("click", () =>{
  send_action("ARROW-UP");
});
boton_izq.addEventListener("click", () =>{
  send_action("ARROW-LEFT");
});
boton_ok.addEventListener("click", () =>{
  send_action("OK");
});
boton_der.addEventListener("click", () =>{
  send_action("ARROW-RIGHT");
});
boton_abj.addEventListener("click", () =>{
  send_action("ARROW-DOWN");
});
boton_volver.addEventListener("click", () =>{
  send_action("CLOSE-PLAYER");
});
boton_notepad.addEventListener("click", () =>{
  send_action("OPEN-NOTEPAD");
});
