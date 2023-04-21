# UC3M_SIU_Final

## Contexto de aplicación

## Funcionalidades

### Controles básicos y selección de video
El usuario puede conectar el móvil a través de el código qr generado en la página principal del reproductor.
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


## Archivos y organización del código

## Decisiones de diseño

### Tratamiento de usuarios
* ¿Pemitir que se conecte mas de un controlador? 
    NO -> Hay que dar feedback si se quiere conectar otro dispositivo -> Echar el anterior (Preguntar a player/controler anterior -> ¿Quieres conectar el nuevo dispositivo?)

### Notas
Para una implementación más sencilla, al igual que con los usuarios hemos decidido tener tan solo un conjunto de notas compartido. Estas notas se almacenarán en notes.json y perdurarán en el tiempo aunque se reinicie el servidor.

Solo se podrán tener un máximo de 8 notas, por simplicidad a la hora de mostrarlas en la interfaz. En caso de que se grabasen más de 8 notas, se descartaría la más antigua y se guardaría la nueva nota que se quiere añadir.
    
