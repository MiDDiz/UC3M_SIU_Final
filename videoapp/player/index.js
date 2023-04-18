

const QRPAGE = "localhost:3000/mobile/index.html"


function init(){
    /*
    $("#btn-qr-gen").click(() => {
        /* On click generate new qr and toggle its visibility */
       /* generateQR();
    });*/

	$("#btn-repr").click(() => {
		
	});
}


function generateQR(){
    //$('.qr-wrapper').innerHTML = QRCODE;
    const QRCODE = new QRCode("qr-code", {
        text: QRPAGE,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
}


const socket = io();

socket.on("connect", () => {
    socket.emit("PLAYER_CONNECTED", { id: 1 });
  
    socket.on("ACK_CONNECTION", () => {
      console.log("ACK");
    });

    socket.on("DO_ACTION_PLAYER", (socketip, data) => {
        console.log("Datos recibidos");
        console.log(data);
      });

});

init();