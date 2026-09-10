const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const upload = require("../middlewares/upload");

const { 
        crearUsuario, 
        getUsuarios, 
        actualizarUsuario, 
        eliminarUsuario,
        getUsuarioConPedidos, 
        crearUsuarioConPedido,
        subirAvatar,
    } = require('../controllers/usuarioController');

// Rutas RESTful
// Ruta publica
router.post('/', crearUsuario);       // Crear usuario

// Rutas protegidas
router.get('/', verificarToken, getUsuarios);         // Leer usuarios
router.put('/:id', verificarToken,actualizarUsuario);    // Actualizar usuario por ID
router.delete('/:id', verificarToken,eliminarUsuario);   // Eliminar usuario por ID
router.get('/:id/pedidos', verificarToken,getUsuarioConPedidos); // Leer usuario especifico con sus pedidos
router.post('/transaccion', verificarToken,crearUsuarioConPedido); // Crea usuarios con pedidos

// Endpoint de subida de archivo
router.post('/:id/upload', verificarToken, upload.single('avatar'), subirAvatar); // Sube imagen del avatar

module.exports = router;