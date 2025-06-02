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

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const turnoRoutes = require('./routes/turnoRoutes');

// Montar las rutas sin prefijo `/api`
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/turnos', turnoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
