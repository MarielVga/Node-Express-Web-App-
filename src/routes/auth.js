const express = require('express');
const router = express.Router();
const { login } = require('../controllers/usuarioController');

// Rutas
router.post('/login', login); //  POST /login

module.exports = router;