const usuarioService = require('../services/usuarioServices');

// Registro
exports.register = async (req, res) => {
  try {
    const newUser = await usuarioService.registerUsuario(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error('Error en registro:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const data = await usuarioService.loginUsuario(req.body);
    res.json(data);
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios(req.query.rol);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(Number(req.params.id));

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};
