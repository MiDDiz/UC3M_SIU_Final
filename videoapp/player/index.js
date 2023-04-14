

const QRPAGE = "localhost:3030/videoapp/mobile/index.html"


function init(){
    /*
    $("#btn-qr-gen").click(() => {
        /* On click generate new qr and toggle its visibility */
       /* generateQR();
    });*/
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


socket.on("connect", () => {
    socket.emit("PLAYER_CONNECTED", { id: 1 });
  
    socket.on("ACK_CONNECTION", () => {
      console.log("ACK");
    });

});


init();