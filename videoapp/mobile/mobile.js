const socket = io();
console.log(socket.id);
/* DOM elements */
let mensaje_dedos = document.getElementById("texto");
let velocidad = 0;

var n_dedos = 0;
var subiendo = 0;
/*Control var used to send only one action at a time*/
var realizando_accion = 0;
var accion_mandada = 0;

/* Control var in order to detect when the interface has to behave as a normal controller 
or as a  gesture controller */
var controllerState = true;

 /* Communications */
socket.on("connect", () => {
  socket.emit("MOBILE_CONNECTED");
  socket.on("ACK_CONNECTION", () =>{
    console.log("MÓVIL CONECTADO");
  });
});
  
/*Function that control all the communications from 
controler to the server */
  function send_action(action, text){
    //console.log(action);
    navigator.vibrate(200);
    if (action == "ADD_NOTE"){
      socket.emit("ADD_NOTE", text);
    } else if (action == "SHOW_NOTEPAD"){
      socket.emit("SHOW_NOTEPAD");
    } else {
      socket.emit("DO_ACTION", action);
    }
    
  }

  /* Touch listeners to change visual feedback */
document.addEventListener("touchstart", (evento) => { 

  if (evento.touches.length == 4){
    // lanzar directamente notepad
    n_dedos = 4;
    navigator.vibrate(200);
    reconocer_voz();
    $(mensaje_dedos).text("TOMAR NOTA");
  }
  else if(evento.touches.length == 3){
    n_dedos = 3;
    $(mensaje_dedos).text("SIGUIENTE-ANTERIOR VIDEO ");
  }
  else if(evento.touches.length == 2){
    n_dedos = 2;
    $(mensaje_dedos).text("CONTROLAR VOLUMEN");
  }
  else if (evento.touches.length == 1){
    n_dedos = 1;
    $(mensaje_dedos).text("PLAY-PAUSE");
  }
  else {
    console.log("Wrong ammount of numbers")
  }
});

/*Function used to change from controller 
mode to gesture mode */
function changeController(){
	controllerState = !controllerState;
	if ($(".controller").is(":visible")){
		$(".controller").hide();
		$(".gesture").show();
	} else {
    	$(".gesture").hide();
		$(".controller").show()
	}

}

 /* Gesture listeners */
  window.addEventListener("devicemotion", (evento) =>  {

	if (controllerState == false){
		return ;
	}

    velocidad = evento.accelerationIncludingGravity.y;

    if(((velocidad) > 3 || (velocidad) < -3) && realizando_accion == 0){
      vel_buff = velocidad 
      realizando_accion = 1;
      //This code is used to tell if the action is up to down or down to up
      if((vel_buff) > 0){
        subiendo = 1;
      } else if (vel_buff < 0) {
        subiendo = 0;
      }
      /*Then, this switch is used to do different actions 
      depending on the number of fingers*/
      switch(n_dedos){
        case 3:
            if (subiendo == 1){
              // next video
              send_action("VIDEO-NEXT");
            } else{
              // previous video
              send_action("VIDEO-PREV");
            }
            setTimeout(() => {
              n_dedos = 0;
              accion_mandadas = 1;} 
              , 500);
          break;
        case 2:
          if (subiendo == 1){
            // volume up
            send_action("VOLUME-UP");
          } else{
            // volume down
            send_action("VOLUME-DOWN");
          }
          setTimeout(() => {
            n_dedos = 0;
            accion_mandada = 1;} 
            , 500);
          break;
        case 1:
          /*for the play/pause action, it does not care if the 
          action is up to down or down to up */
          send_action("PLAY-PAUSE");
          setTimeout(() => {
            n_dedos = 0;
            accion_mandada = 1;} 
            , 500);
          break;
      }
    }
    // If no action is being done, it resets the control variable
    if ((velocidad) < 1 && (velocidad) >-1 && realizando_accion == 1 && accion_mandada == 1){
      realizando_accion = 0;
    }
  });


/* Function that recognices voice */
const reconocer_voz = () =>{
  if ("webkitSpeechRecognition" in window) {
    const recnocimiento_voz = new webkitSpeechRecognition();
    recnocimiento_voz.continuous = true 
    recnocimiento_voz.interimResults = true
    recnocimiento_voz.onresult = (evento) =>{
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log(transcript);
      if (transcript.toLowerCase().includes(" cerrar nota")){
        recnocimiento_voz.stop();
        let nueva_nota = transcript.replace(" cerrar nota", "");
        send_action("ADD_NOTE", nueva_nota);
      }
    }
    recnocimiento_voz.start();

  }
  else{
    alert("El reconocimiento de voz no es compatible");
  }
}


// Buttons asigment for the controller
var boton_arr = document.getElementById("arr");
var boton_izq = document.getElementById("izq");
var boton_ok = document.getElementById("ok");
var boton_der = document.getElementById("der");
var boton_abj = document.getElementById("abj");
var boton_volver = document.getElementById("volver");
var boton_notepad = document.getElementById("notepad");
var boton_cambiar_gestos = document.getElementById("cambiar-mano");
var boton_cambiar_mando = document.getElementById("cambiar-modo");

boton_arr.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("ARROW-UP");
});
boton_izq.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("ARROW-LEFT");
});
boton_ok.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("OK");
});
boton_der.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("ARROW-RIGHT");
});
boton_abj.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("ARROW-DOWN");
});
boton_volver.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("CLOSE-PLAYER");
});
boton_notepad.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
  send_action("SHOW_NOTEPAD");
});
boton_cambiar_gestos.addEventListener("click", () =>{
	if (controllerState == true){
		return ;
	}
	changeController();
});
boton_cambiar_mando.addEventListener("click", () =>{
	if (controllerState == false){
		return ;
	}
	changeController();
});