import {
  obtenerProductos,
  guardarProducto,
  eliminarProductoPorNombre,
  actualizarProducto
} from './capaDeDatos.js';

let nombreEditando = null; // Para saber si estamos editando un producto

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("nombre").disabled = false;
  document.querySelector("button").textContent = "Agregar";
  nombreEditando = null;
}

// Agregar o actualizar producto
window.agregarProducto = function () {
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const precio = document.getElementById('precio').value.trim();

  if (!nombre || !descripcion || !precio) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (isNaN(precio) || parseFloat(precio) < 0) {
    alert("El precio debe ser un número positivo.");
    return;
  }

  const productos = obtenerProductos();

  if (nombreEditando) {
    if (nombre !== nombreEditando && productos.some(p => p.nombre === nombre)) {
      alert("Ya existe otro producto con ese nombre.");
      return;
    }

    actualizarProducto({ nombre, descripcion, precio: parseFloat(precio) });
  } else {
    if (productos.some(p => p.nombre === nombre)) {
      alert("Ya existe un producto con ese nombre.");
      return;
    }

    guardarProducto({ nombre, descripcion, precio: parseFloat(precio) });
  }

  limpiarFormulario();
  mostrarProductos();
}

// Eliminar producto
window.eliminarProducto = function (nombre) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    eliminarProductoPorNombre(nombre);
    mostrarProductos();
    limpiarFormulario();
  }
}

// Editar producto (precargar datos en el formulario)
window.editarProducto = function (nombre) {
  const producto = obtenerProductos().find(p => p.nombre === nombre);
  if (!producto) return;

  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("nombre").disabled = true;

  nombreEditando = nombre;
  document.querySelector("button").textContent = "Actualizar";
}

// Mostrar tabla de productos
window.mostrarProductos = function () {
  const productos = obtenerProductos();
  const tbody = document.getElementById("tablaProductos");
  tbody.innerHTML = "";

  for (const producto of productos) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${escapeHTML(producto.nombre)}</td>
      <td>${escapeHTML(producto.descripcion)}</td>
      <td>$${escapeHTML(producto.precio.toString())}</td>
      <td>
        <button onclick="editarProducto('${producto.nombre}')">Editar</button>
        <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  }
}

// Mostrar productos al cargar
mostrarProductos();
