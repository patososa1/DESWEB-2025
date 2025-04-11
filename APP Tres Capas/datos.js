const productos = [];

function insertar(producto) {
  productos.push(producto);
}

function listar() {
  return productos;
}

module.exports = {
  insertar,
  listar
};
