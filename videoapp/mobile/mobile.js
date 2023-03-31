var possY_inicial;
var posY_final;
var tiempo_i;
var tiempo_f;




const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", () => {
  acl.y
  console.log(`Acceleration along the Z-axis ${acl.z}`);
});

acl.start();

