const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

async function startServer() {
  try {
    const SERVICE_NAME = 'usuario-service';
    const configRes = await axios.get(`http://localhost:4000/config/${SERVICE_NAME}`);
    const config = configRes.data;

    const PORT = config.port || 3001;
    const JWT_SECRET = config.jwt_secret;
    const DB_PATH = config.db_path;

    // Middleware CORS
    app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));

    app.use(express.json());

    // Rutas
    const usuarioRoutes = require('./routes/usuarioRoutes');
    app.use('/api/usuarios', usuarioRoutes);

    // Inicializar servidor
    app.listen(PORT, () => {
      console.log(`✅ Usuario-service corriendo en puerto ${PORT}`);
      console.log(`🛠️  DB Path: ${DB_PATH}`);
      console.log(`🔐 JWT Secret: ${JWT_SECRET}`);
    });

  } catch (error) {
    console.error('❌ Error al obtener configuración del config-service:', error.message);
    process.exit(1);
  }
}

startServer();
