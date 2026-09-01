const express = require('express');
const router = express.Router();
const { 
        crearUsuario, 
        getUsuarios, 
        actualizarUsuario, 
        eliminarUsuario,
        getUsuarioConPedidos, 
        crearUsuarioConPedido,
    } = require('../controllers/usuarioController');

// Rutas RESTful
router.post('/', crearUsuario);       // Crear usuario
router.get('/', getUsuarios);         // Leer usuarios
router.put('/:id', actualizarUsuario);    // Actualizar usuario por ID
router.delete('/:id', eliminarUsuario);   // Eliminar usuario por ID
router.get('/:id/pedidos', getUsuarioConPedidos); // Leer usuario especifico con sus pedidos
router.post('/transaccion', crearUsuarioConPedido); // Crea usuarios con pedidos

module.exports = router;