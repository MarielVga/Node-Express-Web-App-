const express = require('express');
const router = express.Router();

// Ruta 1: Responde con HTML
router.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenido a mi App Node & Express</h1>
        <p>Este es el proyecto final del Módulo 6. ¡Ahora 100% modularizado!</p>
    `);
});

// Ruta 2: Responde con JSON
router.get('/status', (req, res) => {
    res.json({
        estado: 'Servidor funcionando correctamente',
        modulo: 6,
        tecnologias: ['Node.js', 'Express', 'fs', 'Express Router']
    });
});

// Exportamos el enrutador
module.exports = router;