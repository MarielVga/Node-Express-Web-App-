const express = require('express');
const router = express.Router();

// Ruta 1 - Responde con HTML
router.get('/bienvenida', (req, res) => {
    res.send(`
        <h1>Bienvenido a mi App Node & Express</h1>
        <p>Este es el proyecto final del Módulo 6.</p>
        <a href="/">Volver al inicio estático</a>
    `);
});

// Ruta 2 - Responde con JSON
router.get('/status', (req, res) => {
    res.json({
        estado: 'Servidor funcionando correctamente',
        modulo: 6,
        tecnologias: ['Node.js', 'Express', 'fs', 'Express Router']
    });
});

module.exports = router;