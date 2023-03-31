const QRPAGE = "localhost:3030/videoapp/mobile/index.html"

const QRCODE = new QRCode("qrcode", {
  text: QRPAGE,
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

function init(){
    $("#btn-qr-gen").click(() => {
        /* On click generate new qr and toggle its visibility */
        generateQR();
    });
}


function generateQR(){
    $('.qr-wrapper').innerHTML = QRCODE;
}


init();