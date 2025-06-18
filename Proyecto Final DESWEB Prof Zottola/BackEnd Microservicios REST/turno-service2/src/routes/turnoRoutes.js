const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');

router.post('/', turnoController.crearTurno);
router.get('/', turnoController.obtenerTurnos);
router.get('/:id', turnoController.obtenerTurnoPorId);
router.get('/profesional/:profesionalId', turnoController.obtenerTurnosPorProfesional);
router.get('/paciente/:pacienteId', turnoController.obtenerTurnosPorPaciente);
router.patch('/:id', turnoController.actualizarEstadoTurno);

module.exports = router;
