const CLAVE_STORAGE = "productos";

// Función para obtener todos los productos del almacenamiento
export function obtenerProductos() {
  const datos = localStorage.getItem(CLAVE_STORAGE);
  return datos ? JSON.parse(datos) : [];
}

// Función para guardar un producto
export function guardarProducto(producto) {
  const productos = obtenerProductos();
  
  // Generamos un ID único basado en la longitud actual de la lista de productos
  const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
  
  // Asignamos el ID al producto antes de guardarlo
  const nuevoProducto = { ...producto, id };
  
  productos.push(nuevoProducto);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
}

// Función para eliminar un producto por ID
export function eliminarProductoPorID(id) {
  const productos = obtenerProductos().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
}

// Función para actualizar un producto
export function actualizarProducto(productoActualizado) {
  const productos = obtenerProductos().map(p =>
    p.id === productoActualizado.id ? productoActualizado : p
  );
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
}
