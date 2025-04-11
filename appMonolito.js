const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------------------------
// "Capa de datos"
// ---------------------------
const productos = []; // lista en memoria

// ---------------------------
// "Lógica de negocio"
// ---------------------------
function agregarProducto(nombre, precio) {
  const nuevo = {
    id: productos.length + 1,
    nombre,
    precio: parseFloat(precio)
  };
  productos.push(nuevo);
  return nuevo;
}

function listarProductos() {
  return productos;
}

// ---------------------------
// "Presentación" (interfaz HTML)
// ---------------------------
app.get('/', (req, res) => {
  const listaHTML = listarProductos()
    .map(p => `<li><strong>${p.nombre}</strong> - $${p.precio}</li>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Productos</title>
    </head>
    <body>
      <h1>Lista de Productos</h1>
      <ul>${listaHTML || '<li>No hay productos</li>'}</ul>
      <h2>Agregar Producto</h2>
      <form method="POST" action="/agregar">
        <input name="nombre" placeholder="Nombre del producto" required />
        <input name="precio" type="number" step="0.01" placeholder="Precio" required />
        <button type="submit">Agregar</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/agregar', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).send('Faltan datos');
  }

  agregarProducto(nombre, precio);
  res.redirect('/');
});

// ---------------------------
// Iniciar servidor
// ---------------------------
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

/*
💬 Comentario final:

¿Por qué esta implementación es monolítica?

Porque todo (presentación, lógica de negocio y datos) está dentro de un solo archivo `app.js`. No hay separación de responsabilidades ni modularidad.

Desventajas:

- Difícil de mantener a medida que crece.
- Dificultad para testear por partes.
- Acoplamiento entre todas las capas.
- No reutilizable en otros contextos.

Es útil para pequeños prototipos, pero no escalable para aplicaciones más complejas.
*/
