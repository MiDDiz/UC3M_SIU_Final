

/* Bootstrap snippets */

// Video autoplayer
const clip = document.querySelectorAll(".hover-to-play");
for (let i = 0; i < clip.length; i++) { clip[i].addEventListener("mouseenter", function (e) { clip[i].play();
  }); clip[i].addEventListener("mouseout", function (e) { clip[i].pause(); }); }


  $(function() {
	$("video").click(function (e) {
		e.preventDefault();
		console.log("ay");
		var theModal = $(this).data("target"),
			videoSRC = $(this).attr("src"),
			videoSRCauto = videoSRC + "";
		console.log(videoSRCauto);
		$(theModal + ' source').attr('src', videoSRCauto);
		$(theModal + ' video').load(videoSRCauto);
		$(theModal + ' button.close').click(function () {
			$(theModal + ' source').attr('src', videoSRC);
		});
		$(theModal).modal("toggle");
	});
  });

	/*
	$(function() {
		$(".video").click(function () {
		var theModal = $(this).data("target"),
			videoSRC = $(this).attr("data-video"),
			videoSRCauto = videoSRC + "";
		$(theModal + ' source').attr('src', videoSRCauto);
		$(theModal + ' video').load();
		$(theModal + ' button.close').click(function () {
			$(theModal + ' source').attr('src', videoSRC);
		});
		});
	});
	*/