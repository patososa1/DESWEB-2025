import { obtenerPersonas, guardarPersona, eliminarPersonaPorID, actualizarPersona } from './capaDeDatos.js';

let idEditando = null; // Para saber si estamos editando una persona
let idContador = 1; // Contador de ID (esto puede ser reemplazado por una base de datos en producción)

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// Función para limpiar el formulario
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("edad").value = "";
  document.querySelector("button").textContent = "Agregar";
  idEditando = null;
}

// Función para agregar o actualizar persona
window.agregarPersona = function () {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const edad = document.getElementById('edad').value.trim();

  if (!nombre || !apellido || !edad) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (!/^\d+$/.test(edad)) {
    alert("La edad debe ser un número.");
    return;
  }

  const personas = obtenerPersonas();

  if (idEditando) {
    // Editando persona
    actualizarPersona({ id: idEditando, nombre, apellido, edad });
  } else {
    // Agregando nueva persona
    const nuevaPersona = {
      id: idContador++, // Asignamos un ID único y lo incrementamos
      nombre,
      apellido,
      edad
    };
    guardarPersona(nuevaPersona);
  }

  limpiarFormulario();
  mostrarPersonas();
}

// Eliminar persona por ID
window.eliminarPersona = function (id) {
  if (confirm("¿Seguro que deseas eliminar esta persona?")) {
    eliminarPersonaPorID(id); // Eliminamos por ID
    mostrarPersonas();
    limpiarFormulario();
  }
}

// Editar persona
window.editarPersona = function (id) {
  const persona = obtenerPersonas().find(p => p.id === id); // Usamos el ID único para editar
  if (!persona) return;

  document.getElementById("nombre").value = persona.nombre;
  document.getElementById("apellido").value = persona.apellido;
  document.getElementById("edad").value = persona.edad;

  idEditando = id;
  document.querySelector("button").textContent = "Actualizar";
}

// Mostrar la tabla de personas
window.mostrarPersonas = function () {
  const personas = obtenerPersonas();
  const tbody = document.getElementById("tablaPersonas");
  tbody.innerHTML = "";

  for (const persona of personas) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${escapeHTML(persona.nombre)}</td>
      <td>${escapeHTML(persona.apellido)}</td>
      <td>${escapeHTML(persona.edad)}</td>
      <td>
        <button onclick="editarPersona('${persona.id}')">Editar</button>
        <button onclick="eliminarPersona('${persona.id}')">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  }
}

mostrarPersonas();
