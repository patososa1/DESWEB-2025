const datos = require('./datos');

function agregarProducto(nombre, precio) {
  const producto = {
    id: datos.listar().length + 1,
    nombre,
    precio: parseFloat(precio)
  };
  datos.insertar(producto);
  return producto;
}

function listarProductos() {
  return datos.listar();
}

function buscarProducto(nombre) {
  return datos.buscar(nombre);
}

function eliminarProducto(nombre) {
  return datos.eliminar(nombre);
}

function actualizarProducto(nombreOriginal, nuevoNombre, nuevoPrecio) {
  return datos.actualizar(nombreOriginal, {
    nombre: nuevoNombre,
    precio: parseFloat(nuevoPrecio)
  });
}

module.exports = {
  agregarProducto,
  listarProductos,
  buscarProducto,
  eliminarProducto,
  actualizarProducto
};
