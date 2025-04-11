const datos = require('./datos');

function agregarProducto(nombre, precio) {
  const producto = {
    id: datos.listar().length + 1,
    nombre,
    precio: parseFloat(precio)
  };
  datos.insertar(producto);
}

function listarProductos() {
  return datos.listar();
}

module.exports = {
  agregarProducto,
  listarProductos
};
