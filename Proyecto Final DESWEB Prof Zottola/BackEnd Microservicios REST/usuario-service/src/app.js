const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // tu frontend
  credentials: true
}));

app.use(express.json());

// Importar rutas solo de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');

// Montar las rutas con prefijo
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Usuario-service corriendo en puerto ${PORT}`);
});
