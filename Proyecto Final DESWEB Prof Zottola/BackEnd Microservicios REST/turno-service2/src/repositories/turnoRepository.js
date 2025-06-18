const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const crearTurno = async (turno) => {
  return await prisma.turno.create({ data: turno });
};

const obtenerTurnos = async () => {
  return await prisma.turno.findMany({
  });
};

const obtenerTurnosPorProfesional = async (profesionalId) => {
  return await prisma.turno.findMany({
    where: { profesionalId },
  });
};

const obtenerTurnosPorPaciente = async (pacienteId) => {
  try {
    const id = parseInt(pacienteId);
    if (isNaN(id)) throw new Error('ID de paciente inválido');

    return await prisma.turno.findMany({
      where: { pacienteId: id },
    });
  } catch (error) {
    console.error("Error en obtenerTurnosPorPaciente:", error);
    throw error;
  }
};

const actualizarEstadoTurno = async (id, estado) => {
  try {
    const turnoId = parseInt(id);
    if (isNaN(turnoId)) throw new Error('ID de turno inválido');
    return await prisma.turno.update({
      where: { id: turnoId },
      data: { estado }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      // Registro no encontrado en Prisma
      throw new Error('Turno no encontrado');
    }
    throw error;
  }
};

const obtenerTurnoPorId = async (id) => {
  return await prisma.turno.findUnique({
    where: { id },
  });
};

module.exports = {
  crearTurno,
  obtenerTurnos,
  obtenerTurnosPorProfesional,
  obtenerTurnosPorPaciente,
  actualizarEstadoTurno,
  obtenerTurnoPorId
};
