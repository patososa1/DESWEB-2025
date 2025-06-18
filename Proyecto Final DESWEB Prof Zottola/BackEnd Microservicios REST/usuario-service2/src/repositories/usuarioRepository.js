const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findByEmail(email) {
  return await prisma.usuario.findUnique({ where: { email } });
}

async function createUser(data) {
  return await prisma.usuario.create({ data });
}

async function findAll(filter = {}) {
  return await prisma.usuario.findMany({ where: filter });
}

async function findById(id) {
  return await prisma.usuario.findUnique({ where: { id } });
}

module.exports = {
  findByEmail,
  createUser,
  findAll,
  findById, 
};
