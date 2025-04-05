// BASE DE DATOS SIMULADA (array en memoria)
const baseDeDatos = {
    tareas: [],
  
    guardarTarea: function(tarea) {
      this.tareas.push(tarea);
      console.log("Lista actual de tareas:", this.tareas); // Debug
    },
  
    obtenerTareas: function() {
      return this.tareas;
    }
  };
  
  // BACKEND: lógica para recibir y validar la tarea
  function agregarTarea() {
    const input = document.getElementById('tareaInput');
    const mensajeDiv = document.getElementById('mensaje');
    const tarea = input.value.trim();
  
    if (tarea === '') {
      mensajeDiv.textContent = "⚠️ La tarea no puede estar vacía.";
      return;
    }
  
    // Guardar en la "base de datos"
    baseDeDatos.guardarTarea(tarea);
  
    // Mostrar confirmación
    mensajeDiv.textContent = `✅ Tarea guardada: ${tarea}`;
    input.value = '';
  
    // Mostrar todas las tareas actuales (opcional)
    mostrarListaDeTareas();
  }
  
  // Mostrar tareas en una lista debajo del formulario
  function mostrarListaDeTareas() {
    const listaContainer = document.getElementById('listaTareas');
    const tareas = baseDeDatos.obtenerTareas();
  
    listaContainer.innerHTML = ""; // Limpiar antes de mostrar
  
    tareas.forEach((t, index) => {
      const item = document.createElement('li');
      item.textContent = `${index + 1}. ${t}`;
      listaContainer.appendChild(item);
    });
  }
  