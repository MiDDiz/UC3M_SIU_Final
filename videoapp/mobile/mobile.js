var possY_inicial = 0;
var posY_final = 0;
var tiempo_i = 0;
var tiempo_f = 0;



// Codigo incompleto para adaptarlo 

const acl = new Accelerometer({ frequency: 60 });
/*
acl.addEventListener("reading", () => { // Cambiar evento por touch
  possY_inicial = acl.y; 
});
*/

acl.start();
/*
setInterval( () => {
  // Meter cambios
  let diff_ejeY = Math.abs(posY_final - possY_inicial);
  // Luego actulizar 
  posY_final =  possY_inicial;

})
*/

acl.addEventListener("touchstart", (evento) => { //
  possY_inicial = evento.changedTouches[0].pageX;
  tiempo_i= new Date.now()
});
acl.addEventListener("move", (evento) =>  {
let diff_ejeY = Math.abs(posY_final - possY_inicial);
tiempo_f= new Date.now()
let velocidad = diff_ejeY / (tiempo_f - tiempo_i)
if((velocidad) > 50){
  // Si se cumple el gesto hacer .....
}
});

