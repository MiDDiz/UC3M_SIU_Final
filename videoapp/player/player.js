/* Get all video sections */

/* Return all video elements in a 2d array*/
function getAllVideos(){
	const allSections = document.querySelectorAll(".video-section");
	let videoFrames = [];
	allSections.forEach(videoSection => {
		let newVideoRow = videoSection.querySelectorAll(".video-wrapper");
		videoFrames.push(newVideoRow);
	});
	console.log(videoFrames);
	return (videoFrames);
}
const videoFrames = getAllVideos();

let userPlayer = {
	coordsVideoSelected: { x:0, y: 0},
}

/* Make video pointed by coords selected and return it */
function selectVideo(x, y, userPlayer) {
	const videoSelected = videoFrames[y][x];
	const prevVideoSelected = videoFrames[userPlayer.coordsVideoSelected.y][userPlayer.coordsVideoSelected.x];
	/* Add selected CSS */
	$(prevVideoSelected).removeClass("video-selected");
	$(videoSelected).addClass("video-selected");

	/* Change data in user object */
	userPlayer.coordsVideoSelected.x = x;
	userPlayer.coordsVideoSelected.y = y;
	return (videoSelected);
}
/* Return true if coords is within borders */
function checkVideoWithinBorders(x, y){
	if (x < 0 || y < 0) return false;
	if (y > videoFrames.length - 1) return false;
	if (x > videoFrames[y].length - 1) return false;
	return true;
}


/* BEGIN INTERFACE FUNCTIONS */


function selectVideoRight(userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x + 1,
		userPlayer.coordsVideoSelected.y
	) == false){
		return ;
	}
	return selectVideo(
		userPlayer.coordsVideoSelected.x + 1, 
		userPlayer.coordsVideoSelected.y,
		userPlayer
	);
}

function selectVideoLeft(userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x - 1,
		userPlayer.coordsVideoSelected.y
	) == false){
		return ;
	}
	return selectVideo(
		userPlayer.coordsVideoSelected.x - 1, 
		userPlayer.coordsVideoSelected.y,
		userPlayer
	);
}

function selectVideoTop(userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x,
		userPlayer.coordsVideoSelected.y - 1
	) == false){
		return ;
	}
	return selectVideo(
		userPlayer.coordsVideoSelected.x, 
		userPlayer.coordsVideoSelected.y - 1,
		userPlayer
	);
}

function selectVideoBott(userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x,
		userPlayer.coordsVideoSelected.y + 1
	) == false){
		return ;
	}
	return selectVideo(
		userPlayer.coordsVideoSelected.x, 
		userPlayer.coordsVideoSelected.y + 1,
		userPlayer
	);
}

function playVideoSelected(userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x,
		userPlayer.coordsVideoSelected.y
	) == false){
		return ;
	}


}












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

/* Función para lanzar el modal al clickar en un video */
$(function() {
	$(".video-wrapper video").click(function (e) {
		e.preventDefault();
		console.log("ay");
		var theModal = $(this).data("target"),
			videoSRC = $(this).attr("src"),
			videoSRCauto = videoSRC + "";
		console.log(videoSRCauto);

		playVideo(videoSRCauto, "video/webm");

		/* When modal is hidden, pause video on background */
		$(theModal).on('hidden.bs.modal', function () {
			pausePlayer();
		});


		$(theModal).modal("toggle");
	});
});


/* Function to hook select video to arrows*/

document.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
	switch (key) {
		case "ArrowLeft":
			selectVideoLeft(userPlayer);
			break;
		case "ArrowRight":
			selectVideoRight(userPlayer);
			break;
		case "ArrowUp":
			selectVideoTop(userPlayer);
			break;
		case "ArrowDown":
			selectVideoBott(userPlayer);
			break;
		case "Space":
			playVideoSelected(userPlayer);
	}
});

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
