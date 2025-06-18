const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

async function startServer() {
  try {
    const SERVICE_NAME = 'turno-service2';
    const configRes = await axios.get(`http://localhost:4000/config/${SERVICE_NAME}`);
    const config = configRes.data;

    const PORT = config.port || 3004;
    const JWT_SECRET = config.jwt_secret;
    const DB_PATH = config.db_path;

    app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));

    app.use(express.json());

    // Importar rutas
    const turnoRoutes = require('./routes/turnoRoutes');
    app.use('/api/turnos', turnoRoutes);

    app.listen(PORT, () => {
      console.log(`✅ Turno-service corriendo en el puerto ${PORT}`);
      console.log(`🛠️  DB Path: ${DB_PATH}`);
      console.log(`🔐 JWT Secret: ${JWT_SECRET}`);
    });

  } catch (error) {
    console.error('❌ Error al obtener configuración del config-service:', error.message);
    process.exit(1);
  }
}

startServer();