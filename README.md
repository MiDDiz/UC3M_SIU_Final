# Sistemas Interactivos Y Ubicuos Parte 2
Grupo 11
Autores:
Joel Martin Garcia - 100450999
Joan Carlos Naftanaila - 100451199
Alvaro Perez Vergara - 100451185

## Contexto de aplicación

La aplicacion esta orientada a usuarios que bien se encuentran en una edad avanzada o bien sufren una condicion fisica  y realizar desplazamientos es una molestia para ellos. La situacion de estas personas requiere en ciertos casos de tratamientos medicos, ir a quedar con la familia o diversas acciones que es importante que no las pasen por alto. Por lo que hemos introducido un sistema de notas para que todas estas ideas queden almacenadas y pueda el usuario interesado recordarlas cuando desee.  

Por otro lado, estos usuarios se encuentra lejos del reproductor de video ya sea en el sofa de su casa, en la cama o bien sentando en una silla. Y de manera remota permitimos interactuar con el reproductor, sin la necesidad de levantarse del sitio donde se encuentren. Mediante gestos o bien el mando pueden realizar diferentes acciones: tales como guardar notas, subir o bajar el volumen, avanzar al siguiente video o volver al anterior, pausar / reproducir el video.



## Funcionalidades

### Controles básicos y selección de video
El usuario puede conectar el móvil a través de el código qr generado en la página principal del reproductor. A esta página se accederá mediante el enlace: "http://localhost:3000/player/"
Una vez en la página de reproducción de videos, se puede navegar entre los distintos videos ya sea con el móvil conectado a modo de controlador, o tambien con las flechas del teclado.
Cuando el video deseado esté seleccionado, se pulsa el botón ok en el móvil o se le hace click para reproducirlo (Esta funcionalidad puede dar problemas ya que para que se reproduzca el video y funcionen el resto de comandos es necesario hacer click a la ventana modal que aparece).


### Gestos
Una vez se está visualizando el video, se pueden usar los distintos gestos y sus funcionalidades. Estos gestos funcionan en la pestaña principal del móvil, pero para mayor comodidad tambien se puede acceder al modo gestos a través del botón en la esquina superior izquierda. 
Recomendamos usar este modo ya que para realizar los gestos es necesario tener dedos en la pantalla, y en la pestaña principal esto puede activar sin querer otras funcionalidades, además, esta pantalla ofrece feedback visual acerca de qué gesto se va a realizar según los dedos que tenga puestos el usuario, por lo que puede facilitar su uso para personas olvidadizas o que no conocen bien la aplicación.
En caso de que se quiera volver a la pestaña principal, tan solo es necesario pulsar de nuevo el botón de arriba a la izquierda.


 Los distintos gestos son los que se muestran a continuación:
 * Play/Pause -> Cuando se coloca un dedo en la pantalla, si mueves el móvil hacia arriba o hacia abajo indistintamente, se realiza el gesto play pause. Este gesto reproduce o para el video según si este ya estaba reproduciendose o parado. Se puede obtener la misma funcionalidad pulsando la tecla "espacio".
 * Subir/Bajar volumen -> Con dos dedos en la pantalla, si mueves el móvil hacia arriba se sube el volumen del video un 15%, y si mueves el móvil hacia abajo, se baja un 15%. Se puede conseguir una funcionalidad similar con las teclas "v" para subir y "b" para bajar. 
 * Siguiente/anterior video -> Con tres dedos en la pantalla, si se mueve el móvil para arriba se pasa al siguiente video, y si se mueve para abajo, se vuelve al anterior. Entendemos que tener tres dedos en la pantalla puede no ser lo más cómodo, especialmente en las situaciones para las que ha sido dieñada esta aplicación, es por ello que le hemos puesto esta funcionalidad, ya que no es tan habitual querer cambiar de video como lo es pararlo o cambiar el volumen. En adición, también se puede usar esta funcionalidad con el teclado mediante las teclas "m" y "n" para siguiente y anterior respectivamente.

 Todos los gestos realizados darán feedback al usuario a través de una vibración, que indicará que el gesto ha sido detectado y enviado al reproductor.
 ### Notas
El sistema tiene la capacidad de grabar, almacenar y visualizar notas de manera cómoda para el usuario.


En primer lugar, para grabar una nota, el usuario debe colocar 4 dedos en la pantalla (similar a cuando realiza un gesto), entonces se activará una vibración para indicar que el teléfono está escuchando. A continuación debe decir la nota que quiera en voz alta y, para que la nota se guarde, debe finalizar diciendo "cerrar nota". A continuación, el sistema almacenará automáticamente esa nota en el archivo notes.json.


Cuando el usuario quiera visualizar sus notas, solo debe ir a la pestaña principal en el móvil, y pulsar en el botón de la parte inferior derecha. Esto hará que en el reproductor se muestren todas las notas que tiene almacenado el sistema. *Ver decisiones de diseño, apartado notas para más detalle.


## Decisiones de diseño

### Tratamiento de usuarios
Esta aplicación no contará con tratamiento de usuarios, por simplicidad solo habrá un usuario compartido. Asi mismo, solo se podrán conectar de manera simultánea un reproductor y un controlador. De esta forma si se conectase otro reproductor o controlador al sistema, el primero dejaría de funcionar.

### Notas
Para una implementación más sencilla, al igual que con los usuarios hemos decidido tener tan solo un conjunto de notas compartido. Estas notas se almacenarán en notes.json y perdurarán en el tiempo aunque se reinicie el servidor.

Solo se podrán tener un máximo de 8 notas, por simplicidad a la hora de mostrarlas en la interfaz. En caso de que se grabasen más de 8 notas, se descartaría la más antigua y se guardaría la nueva nota que se quiere añadir.

### Estructura y organización del código
Nuestro protoripo consta de 3 módulos principales:
 - Una aplicación Web para el controlador (móvil) que proporciona 2 interfaces: 
 
   * Mando: Permite seleccionar mediante las flechas el video a reproduccir, el boton "OK" que permite acceder al video en  cuention. La flecha de retorno (parte inferior izquierda) que permite volver al menu de seleccion. Y el boton de notas que permite acceder al almacenamiento de las notas del usuario.
   * Gestos: Permite realizar acciones en funcion del numero de dedos que se pulsen en pantalla acompañado del desplazamiento vestical hacia arriba o abajo. Acciones tales como pausar/ reproduccir, aumentar o disminuir el volumen, ir al anterior / siguiente vídeo o bien grabar una nota.
   
Aclaracion: Se puede navegar entre ambos modos con el boton localizado en la parte superior derecha.
 
- Una aplicación Web para el reproductor de vídeo encargada de reproduccir, seleccionar los videos, realizar las acciones equivalentes a las del usuario usando para ello las teclas correspondientes, así como visualizar los imputs del usuario.

- Servidor: Encargador de controlar la interracion entre el reproductor y el móvil, comunicandolos.
 