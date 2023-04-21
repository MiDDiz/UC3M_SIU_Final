
const socket = io();
const QRPAGE = "localhost:3000/mobile/index.html"


socket.on("connect", () => {
    socket.emit("INDEX_CONNECTED", { id: 1 });
  
    socket.on("ACK_CONNECTION", () => {
      console.log("ACK");
    });

	socket.on("CONTROLLER_CONNECTED", () => {
        // TOOD: Show modal confirmation
		alert("Movil conectado");
	})
});

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
