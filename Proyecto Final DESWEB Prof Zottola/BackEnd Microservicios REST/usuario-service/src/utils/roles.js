// src/utils/roles.js
const Roles = {
  PACIENTE: "PACIENTE",
  PROFESIONAL: "PROFESIONAL",
  ADMIN: "ADMIN",
};

function esRolValido(rol) {
  return Object.values(Roles).includes(rol);
}

module.exports = { Roles, esRolValido };
