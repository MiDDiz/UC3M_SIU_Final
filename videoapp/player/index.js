/*Creation of the QR */

const QRPAGE = "http://localhost:3000/mobile/index.html"


function generateQR(){
    const QRCODE = new QRCode("qr-code", {
        text: QRPAGE,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
}
