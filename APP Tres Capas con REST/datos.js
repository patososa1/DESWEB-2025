const productos = [];

function insertar(producto) {
  productos.push(producto);
}

function listar() {
  return productos;
}

function buscar(nombre) {
  return productos.find(p => p.nombre === nombre) || null;
}

function eliminar(nombre) {
  const index = productos.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    productos.splice(index, 1);
    return true;
  }
  return false;
}

function actualizar(nombre, productoNuevo) {
  const index = productos.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    productos[index] = {
      ...productos[index],
      nombre: productoNuevo.nombre,
      precio: productoNuevo.price ?? productoNuevo.precio
    };
    return productos[index];
  }
  return null;
}

module.exports = {
  insertar,
  listar,
  buscar,
  eliminar,
  actualizar
};
