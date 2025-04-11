const express = require('express');
const app = express();
const port = 3000;

const negocio = require('./negocio');  // Rehabilitamos esta línea

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  const productos = negocio.listarProductos();  // Obtenemos los productos de la lógica de negocio

  const listaHTML = productos.map(p => `<li><strong>${p.nombre}</strong> - $${p.precio}</li>`).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>Productos</title></head>
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

  negocio.agregarProducto(nombre, precio);  // Llamamos a la función para agregar el producto
  console.log(`Producto agregado: ${nombre} - $${precio}`);

  res.redirect('/');  // Redirigimos a la página principal para mostrar la lista actualizada
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
