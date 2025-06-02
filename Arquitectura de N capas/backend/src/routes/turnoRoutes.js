const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');

router.post('/', turnoController.crearTurno);
router.get('/', turnoController.obtenerTurnos);
router.get('/profesional/:profesionalId', turnoController.obtenerTurnosPorProfesional);
router.patch("/:id", turnoController.actualizarEstadoTurno);
router.get('/paciente/:pacienteId', turnoController.obtenerTurnosPorPaciente);

module.exports = router;
