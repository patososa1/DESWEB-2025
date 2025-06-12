const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.obtenerUsuarios);
router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);

module.exports = router;
