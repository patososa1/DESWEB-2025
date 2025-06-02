const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const crearTurno = async (turno) => {
  return await prisma.turno.create({ data: turno });
};

const obtenerTurnos = async () => {
  return await prisma.turno.findMany({
    include: {
      paciente: true,
      profesional: true
    }
  });
};

const obtenerTurnosPorProfesional = async (profesionalId) => {
  return await prisma.turno.findMany({
    where: { profesionalId },
    include: {
      paciente: true,
      profesional: true
    }
  });
};

const obtenerTurnosPorPaciente = async (pacienteId) => {
  return await prisma.turno.findMany({
    where: { pacienteId },
    include: {
      profesional: true
    }
  });
};

const actualizarEstadoTurno = async (id, estado) => {
  return await prisma.turno.update({
    where: { id: parseInt(id) },
    data: { estado }
  });
};

module.exports = {
  crearTurno,
  obtenerTurnos,
  obtenerTurnosPorProfesional,
  obtenerTurnosPorPaciente,
  actualizarEstadoTurno
};
