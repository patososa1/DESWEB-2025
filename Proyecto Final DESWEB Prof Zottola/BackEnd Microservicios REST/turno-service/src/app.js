const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rutas
const turnoRoutes = require('./routes/turnoRoutes');
app.use('/api/turnos', turnoRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Turno Service corriendo en el puerto ${PORT}`);
});
