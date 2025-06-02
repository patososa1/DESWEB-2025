const turnoRepo = require('../repositories/turnoRepository');

const crearTurno = async (turnoData) => {
  // Validaciones, lógica de disponibilidad, etc.
  return await turnoRepo.crearTurno(turnoData);
};

const obtenerTurnos = async () => {
  return await turnoRepo.obtenerTurnos();
};

const obtenerTurnosPorProfesional = async (profesionalId) => {
  return await turnoRepo.obtenerTurnosPorProfesional(profesionalId);
};

const obtenerTurnosPorPaciente = async (pacienteId) => {
  return await turnoRepo.obtenerTurnosPorPaciente(pacienteId);
};

const actualizarEstadoTurno = async (id, estado) => {
  const estadosPermitidos = ["PENDIENTE", "CONFIRMADO", "CANCELADO"];
  if (!estadosPermitidos.includes(estado)) {
    throw new Error("Estado no permitido");
  }

  return await turnoRepo.actualizarEstadoTurno(id, estado);
};

module.exports = {
  crearTurno,
  obtenerTurnos,
  obtenerTurnosPorProfesional,
  obtenerTurnosPorPaciente,
  actualizarEstadoTurno
};
