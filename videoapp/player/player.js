

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

  