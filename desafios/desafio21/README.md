# Servidor en Deno

Formato: link a un repositorio en Github con el proyecto cargado.

Sugerencia: no incluir los node_modules

## Consigna:

* Crear un servidor que utilice el módulo http servest y genere la vista con React render.
* Configurar denon para que, ante un cambio de código, el servidor se reinicie automáticamente.

El servidor presentará en su ruta raíz un formulario de ingreso de un color, que será enviado al mismo por método post.
Dicho color (en inglés) será incorporado a un array de colores persistido en memoria.
Por debajo del formulario se deberán representar los colores recibidos en una lista desordenada (ul) utilizando el mismo color para la letra en cada caso. El color de fondo del la vista será negro.

NOTA: El servidor deberá tener extensión tsx para el correcto funcionamiento de la sintaxis de vista de 
