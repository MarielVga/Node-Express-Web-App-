require('dotenv').config();
const express = require('express');
const path = require('path');

// Importamos nuestros propios módulos
const loggerMiddleware = require('./middlewares/logger');
const mainRoutes = require('./routes/index'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
//  Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de registro de visitas
app.use(loggerMiddleware);

// Rutas
// Conectamos el router externo
app.use('/', mainRoutes);

// Iniciar server
app.listen(PORT, () => {
    console.log(`Servidor iniciado de forma modular en http://localhost:${PORT}`);
});