
/* Function to show the notes on the player */
function showNotes(notes){
	let notesDOM = document.querySelectorAll(".note");
	let i = 0;
	notesDOM.forEach((noteDOM) => {
		console.log(noteDOM)
		let textDOM = noteDOM.firstChild.nextSibling;
		/* Check if there are no more notes left to show */
		if (i > notes.length - 1){
			return ;
		}
		textDOM.classList.remove("placeholder-text");
		$(textDOM).text(notes[i]);
		i++;
	});
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
  }
let notes = []; 
let cookies = getCookie("notes");
if (cookies){
	notes = JSON.parse(cookies);
}

showNotes(notes);