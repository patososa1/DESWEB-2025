const express = require('express');
const app = express();
const port = 3000;
const negocio = require('./negocio');

app.use(express.json());

// GET - listar todos los productos
app.get('/api/productos', (req, res) => {
  const productos = negocio.listarProductos();
  res.json(productos);
});

// GET - buscar un producto por nombre
app.get('/api/productos/:nombre', (req, res) => {
  const producto = negocio.buscarProducto(req.params.nombre);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// POST - agregar producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  const producto = negocio.agregarProducto(nombre, precio);
  res.status(201).json(producto);
});

// PUT - actualizar producto por nombre
app.put('/api/productos/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const { nuevoNombre, nuevoPrecio } = req.body;

  if (!nuevoNombre || !nuevoPrecio) {
    return res.status(400).json({ error: 'Faltan datos para actualizar' });
  }

  const actualizado = negocio.actualizarProducto(nombre, nuevoNombre, nuevoPrecio);
  if (actualizado) {
    res.json(actualizado);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// DELETE - eliminar producto por nombre
app.delete('/api/productos/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const eliminado = negocio.eliminarProducto(nombre);
  if (eliminado) {
    res.json({ mensaje: `Producto '${nombre}' eliminado.` });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`✅ API REST escuchando en http://localhost:${port}`);
});
