const express = require('express');
const router = express.Router();
const usuariosRoutes = require('./usuarios');
const authRoutes = require('./auth')

// Ruta responde con HTML
router.get('/bienvenida', (req, res) => {
    res.send(`
        <h1>Bienvenido a mi App Node & Express</h1>
        <p>Este es el proyecto final del Módulo 6 y 7.</p>
        <a href="/">Volver al inicio estático</a>
    `);
});

// Ruta responde con JSON
router.get('/status', (req, res) => {
    res.json({
        estado: 'Servidor funcionando correctamente',
        modulo: 7,
        tecnologias: ['Node.js', 'Express', 'fs', 'Express Router']
    });
});

router.use('/', authRoutes); // login
router.use('/usuarios', usuariosRoutes);


module.exports = router;