require('dotenv').config();
const express = require('express');
const path = require('path');

// Importamos nuestros propios módulos
const sequelize = require('./src/config/database');
const Usuario = require('./src/models/Usuario');
const Pedido = require('./src/models/Pedido')
const loggerMiddleware = require('./src/middlewares/logger');
const mainRoutes = require('./src/routes/index'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Relaciones
Usuario.hasMany(Pedido, {
    foreignKey: 'usuarioId', as: 'pedidos'
})

Pedido.belongsTo(Usuario,{
    foreignKey: 'usuarioId', as: 'usuario'
})

// Middleware
app.use(express.json()); // Permite recibir JSON en los POST/PUT
app.use(express.static(path.join(__dirname, 'public'))); //  Archivos estáticos
app.use(loggerMiddleware); // Middleware de registro de visitas

// Rutas
// Conectamos el router externo
app.use('/', mainRoutes);

const iniciarServidor = async () => {
    try {
        // Verificamos que la conexión es exitosa
        await sequelize.authenticate();
        console.log('Conexión a la base de datos PostgreSQL establecida con éxito.');

        // Sincronizamos los modelos
        await sequelize.sync({ force: false }); 
        console.log('Modelos sincronizados con la base de datos.');

        // Iniciamos el servidor
        app.listen(PORT, () => {
            console.log(`Servidor iniciado de forma modular en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

iniciarServidor();