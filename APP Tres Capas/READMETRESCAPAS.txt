Aplicación de Tres Capas

Descripción de las Capas

1. Capa de Presentación (app.js)
En esta capa se puede ver la interfaz gráfica por la cual el usuario puede agregar los productos

- Responsabilidad: Muestra la lista de productos y proporciona un formulario para agregar nuevos productos.
- Tecnologías utilizadas: `Express.js` para gestionar las rutas y generar contenido dinámico en HTML.

2. Capa de Lógica de Negocio (negocio.js)
La capa de lógica de negocio contiene las funciones para agregar los productos y es un intermediario entre la capa de presentación y la de datos.

- Responsabilidad: Contiene la lógica para agregar productos y obtener la lista de productos.
- Tecnologías utilizadas: Funciones JavaScript simples que interactúan con la capa de datos para realizar operaciones.

3. Capa de Datos (datos.js)
La capa de datos se encarga de almacenar los productos en memoria.

- Responsabilidad: Almacena y gestiona la lista de productos, permitiendo insertar nuevos productos y listar los existentes.
- Tecnologías utilizadas: Listas en memoria (arrays) en JavaScript para almacenar los productos.

Ventajas de la Arquitectura de Tres Capas

La principal ventaja de la arquitectura de **tres capas** sobre una **arquitectura monolítica** es la **separación de responsabilidades**. Algunas de las ventajas son:

-La principal ventaja es que esta todo modularizado y separado, lo que favorece a la hora de darle mantenimiento o escalar la aplicación. 
-Es mas facil de realizar cambios.
-Es mas facil de testearla porque las responsabilidades estan separadas