/* Server comunnication part */

const socket = io();

socket.on("connect", () => {
    socket.emit("PLAYER_CONNECTED", { id: 1 });
  
    socket.on("ACK_CONNECTION", () => {
      console.log("ACK");
    });

    socket.on("DO_ACTION_PLAYER", (data) => {
        console.log(`Datos recibidos de ${data.pointerId}`);
        console.log(data.action);
		doAction(data.action);
      });

	socket.on("SHOW_NOTEPAD", (notes) => {
		showNotes(notes);
	})
});


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
	const prevVideoSelected = document.querySelector(".video-selected");
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

/* Helper function to check if player is paused or not */
/*If paused return true, if playing return false */
function isPlayerPaused(){
	var player = videojs(document.querySelector('.video-js'));
	return player.paused();
}

function changeVideoPlayer(){
	var player = videojs(document.querySelector('.video-js'));

	if (!isPlayerPaused()){
		player.pause();
	}
	let video = $(videoFrames[userPlayer.coordsVideoSelected.y][userPlayer.coordsVideoSelected.x].querySelector("video"));
	let videoSrc = video.attr("src");
	player.src({
		src: videoSrc + "",
		type: "video/webm"
	});
	/* Autoplay video */	
	player.load();
    player.play();
}


function selectVideoRight(userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x + 1,
		userPlayer.coordsVideoSelected.y
	) == false){
		return false;
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
		return false;
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
		return false;
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
		return false;
	}
	return selectVideo(
		userPlayer.coordsVideoSelected.x, 
		userPlayer.coordsVideoSelected.y + 1,
		userPlayer
	);
}

function playVideoSelected (userPlayer){
	if (checkVideoWithinBorders(
		userPlayer.coordsVideoSelected.x,
		userPlayer.coordsVideoSelected.y
	) == false){
		return false;
	}
	let video = $(videoFrames[userPlayer.coordsVideoSelected.y][userPlayer.coordsVideoSelected.x].querySelector("video"));
	let modal = video.data("target");
	let videoSrc = video.attr("src");
	playVideo(videoSrc + "", "video/webm");
	$(modal).on('hidden.bs.modal', function () {
		pausePlayer();
	});
	$(modal).modal("toggle");
}

function resumePlayer(){
	var player = videojs(document.querySelector('.video-js'));
	player.play();

}

function pausePlayer(){
	var player = videojs(document.querySelector('.video-js'));
	player.pause();
}

function volumeUpPlayer(){
	var player = videojs(document.querySelector('.video-js'));
	let newVolume = player.volume() + 0.15;
	console.log("New volume : " + newVolume);
	player.volume(newVolume);
}

function volumeDownPlayer(){
	var player = videojs(document.querySelector('.video-js'));
	let newVolume = player.volume() - 0.15;
	console.log("New volume : " + newVolume);
	player.volume(newVolume);
}

function changeNextVideo(userPlayer){
	/* Select next video */
	let nextVideo;

	nextVideo = selectVideoRight(userPlayer);
	if (nextVideo === false){
		/* No next video in row */
		userPlayer.coordsVideoSelected.x = 0;
		nextVideo = selectVideoBott(userPlayer);
		if (nextVideo === false){
			/* The row was the last row, starting over */
			nextVideo = selectVideo(0, 0, userPlayer);
		}
	}
	changeVideoPlayer(userPlayer);
	
}

function changePrevVideo(userPlayer){
	let nextVideo;

	nextVideo = selectVideoLeft(userPlayer);
	if (nextVideo === false){
		/* No next video in row, try to get last video of top row */
		userPlayer.coordsVideoSelected.x = videoFrames[userPlayer.coordsVideoSelected.y].length - 1;
		nextVideo = selectVideoTop(userPlayer);
		if (nextVideo === false){
			/* The row was the first row, starting over from the back */
			let y = videoFrames.length - 1; /* Last row */
			let x = videoFrames[y].length - 1; /* Last video */
			nextVideo = selectVideo(x, y, userPlayer);
		}
	}
	changeVideoPlayer(userPlayer);
}

function hideModal(){
	var modal = $("#videoModal");
	modal.modal("hide");	
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

/* Función para lanzar el modal al clickar en un video */
$(function() {
	$(".video-wrapper video").click(function (e) {
		e.preventDefault();
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
	console.log(key);
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
		case " ":
			playVideoSelected(userPlayer);
			break;
		case "r":
			resumePlayer();
			break;
		case "p":
			pausePlayer();
			break;
		case "v":
			volumeUpPlayer();
			break;
		case "b":
			volumeDownPlayer();
			break;
		case "m":
			changeNextVideo(userPlayer);
			break;
		case "n":
			changePrevVideo(userPlayer);
			break;
		case "1":
			socket.emit("REQUEST-NOTEPAD");
			break;
			
	}
});

function doAction(action){
	switch (action) {
		case "PLAY-PAUSE":
			if (isPlayerPaused() == false){
				pausePlayer();
			} else {
				resumePlayer();
			}
			break;
		case "VOLUME-UP":
			volumeUpPlayer();
			break;
		case "VOLUME-DOWN":
			volumeDownPlayer();
			break;
		case "VIDEO-NEXT":
			changeNextVideo(userPlayer);
			break;
		case "VIDEO-PREV":
			changePrevVideo(userPlayer);
			break;
		case "ARROW-UP":
			selectVideoTop(userPlayer);
			break;
		case "ARROW-LEFT":
			selectVideoLeft(userPlayer);
			break;
		case "ARROW-RIGHT":
			selectVideoRight(userPlayer);
			break;
		case "ARROW-DOWN":
			selectVideoBott(userPlayer);
			break;
		case "OK":
			playVideoSelected(userPlayer);
			break;
		case "CLOSE-PLAYER":
			hideModal();
			break;
	}
}

function showNotes(notes){



}


