// gateway/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Proxy para turno-service
app.use('/api/turnos', createProxyMiddleware({
  target: process.env.TURNO_SERVICE_URL, // ej: http://localhost:3002
  changeOrigin: true,
  selfHandleResponse: false,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[GATEWAY] ${req.method} ${req.originalUrl} → turno-service`);

    // 🔽 Agregamos esta parte para asegurar que el body se reenvíe correctamente
    if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

// Proxy para usuario-service
app.use('/api/usuarios', createProxyMiddleware({
  target: process.env.USUARIO_SERVICE_URL, // ej: http://localhost:3001
  changeOrigin: true,
  selfHandleResponse: false,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[GATEWAY] ${req.method} ${req.originalUrl} → usuario-service`);

    if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API Gateway corriendo en el puerto ${PORT}`);
});
