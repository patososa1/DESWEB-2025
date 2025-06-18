const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { esRolValido } = require('../utils/roles');

const SECRET = process.env.JWT_SECRET || 'secreto';

async function registerUsuario({ nombre, email, password, rol }) {
  if (!esRolValido(rol)) {
    throw new Error('Rol inválido');
  }

  const existing = await usuarioRepository.findByEmail(email);
  if (existing) throw new Error('Email ya registrado');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await usuarioRepository.createUser({
    nombre,
    email,
    password: hashedPassword,
    rol,
  });

  return newUser;
}

async function loginUsuario({ email, password }) {
  const user = await usuarioRepository.findByEmail(email);
  if (!user) throw new Error('Credenciales inválidas');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Credenciales inválidas');

  const token = jwt.sign({ id: user.id, rol: user.rol }, SECRET, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  };
}

async function obtenerUsuarios(rol) {
  const allowedRoles = ['PACIENTE', 'PROFESIONAL', 'ADMIN'];
  let where = {};

  if (rol) {
    const rolClean = rol.trim().toUpperCase();

    if (!allowedRoles.includes(rolClean)) {
      throw new Error('Rol inválido');
    }

    where = { rol: rolClean };
  }

  return await usuarioRepository.findAll(where);
}

async function obtenerUsuarioPorId(id) {
  return await usuarioRepository.findById(id); 
}

module.exports = {
  registerUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId
};
