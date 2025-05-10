const CLAVE_STORAGE = "personas";

// Función para obtener todas las personas del almacenamiento
export function obtenerPersonas() {
  const datos = localStorage.getItem(CLAVE_STORAGE);
  return datos ? JSON.parse(datos) : [];
}

// Función para guardar una persona
export function guardarPersona(persona) {
  const personas = obtenerPersonas();
  
  // Generamos un ID único basado en la longitud actual de la lista de personas
  const id = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
  
  // Asignamos el ID a la persona antes de guardarla
  const nuevaPersona = { ...persona, id };
  
  personas.push(nuevaPersona);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personas));
}

// Función para eliminar una persona por ID
export function eliminarPersonaPorID(id) {
  const personas = obtenerPersonas().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personas));
}

// Función para actualizar una persona
export function actualizarPersona(personaActualizada) {
  const personas = obtenerPersonas().map(p =>
    p.id === personaActualizada.id ? personaActualizada : p
  );
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personas));
}
