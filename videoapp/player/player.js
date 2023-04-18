
/* Bootstrap snippets */

// Video autoplayer
const clip = document.querySelectorAll(".hover-to-play");
for (let i = 0; i < clip.length; i++) { clip[i].addEventListener("mouseenter", function (e) { clip[i].play();
  }); clip[i].addEventListener("mouseout", function (e) { clip[i].pause(); }); }

 /* Funcion para cambiar el video del modal */
function playVideo(videoSource, type) {
	var player = videojs(document.querySelector('.video-js'));
	player.src({
		src: videoSource,
		type: type
	});
	player.play();
}

function pausePlayer(){
	var player = videojs(document.querySelector('.video-js'));
	player.pause();
	
}

const socket = io();

socket.on("connect", () => {
    socket.emit("PLAYER_CONNECTED", { id: 1 });
  
    socket.on("ACK_CONNECTION", () => {
      console.log("ACK");
    });

    socket.on("DO_ACTION_PLAYER", (data) => {
        console.log(`Datos recibidos de ${data.pointerId}`);
        console.log(data.action);
      });

});
