const turnoService = require('../services/turnoService');

const crearTurno = async (req, res) => {
  try {
    const nuevoTurno = await turnoService.crearTurno(req.body);
    res.status(201).json(nuevoTurno);
  } catch (err) {
    console.error("Error en crearTurno:", err); 
    console.error(err.stack);
    res.status(500).json({ error: "Error al crear turno" });
  }
};

const obtenerTurnos = async (req, res) => {
  try {
    const turnos = await turnoService.obtenerTurnos();
    res.status(200).json(turnos);
  } catch (err) {
    console.error('Error en obtenerTurnos:', err);  // <--- Agrega este log
    res.status(500).json({ error: 'Error al obtener turnos' });
  }
};

const obtenerTurnosPorProfesional = async (req, res) => {
  const { profesionalId } = req.params;
  try {
    const turnos = await turnoService.obtenerTurnosPorProfesional(parseInt(profesionalId));
    res.status(200).json(turnos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener turnos del profesional" });
  }
};

const obtenerTurnosPorPaciente = async (req, res) => {
  const { pacienteId } = req.params;

  try {
    const turnos = await turnoService.obtenerTurnosPorPaciente(parseInt(pacienteId));
    res.status(200).json(turnos);
  } catch (err) {
    console.error("Error en obtenerTurnosPorPaciente:", err);
    res.status(500).json({ error: "Error al obtener turnos del paciente" });
  }
};

const actualizarEstadoTurno = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const turnoActualizado = await turnoService.actualizarEstadoTurno(id, estado);
    res.status(200).json(turnoActualizado);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el estado del turno" });
  }
};

const obtenerTurnoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const turno = await turnoService.obtenerTurnoPorId(Number(id));
    if (!turno) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }
    res.json(turno);
  } catch (error) {
    console.error('Error al obtener el turno por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearTurno,
  obtenerTurnos,
  obtenerTurnosPorProfesional,
  obtenerTurnosPorPaciente,  
  actualizarEstadoTurno,
  obtenerTurnoPorId
};
