const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); // Necesario para iniciar la transacción
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');

// CREATE: Insertar un nuevo registro
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const nuevoUsuario = await Usuario.create({ nombre, email });
        res.status(201).json({ status: 'success', message: 'Usuario creado', data: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// READ: Obtener información con validación de errores
const getUsuarios = async (req, res) => {
    try {
        // Obtenemos los registros excluyendo datos sensibles si los hubiera
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.json({ status: 'success', message: 'Usuarios obtenidos', data: usuarios });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// UPDATE: Modificar un registro existente validando su ID
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body; // Actualizamos solo ciertos campos como buena práctica
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        await usuario.update({ nombre }); // Operación Update con Sequelize
        res.json({ status: 'success', message: 'Usuario actualizado exitosamente', data: usuario });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// DELETE: Eliminar un registro con validación previa
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        await usuario.destroy(); // Operación Delete con Sequelize
        res.json({ status: 'success', message: 'Usuario eliminado exitosamente', data: null });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener usuario y sus relaciones
const getUsuarioConPedidos = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Uso obligatorio de 'include' según la rúbrica
        const usuario = await Usuario.findByPk(id, {
            include: [{
                model: Pedido,
                as: 'pedidos',
                attributes: ['id', 'descripcion', 'total', 'createdAt'] // Filtramos lo que queremos ver
            }]
        });

        if (!usuario) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        res.json({ status: 'success', message: 'Datos anidados obtenidos', data: usuario });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Transaccionalidad
const crearUsuarioConPedido = async (req, res) => {
    // Iniciamos la transacción gestionada por Sequelize
    const t = await sequelize.transaction();

    try {
        // Recibimos datos del usuario y del pedido en la misma petición
        const { nombre, email, descripcion_pedido, total_pedido } = req.body;

        // Creamos el usuario asegurando pasarle el objeto de transacción ( transaction: t )
        const nuevoUsuario = await Usuario.create({ nombre, email }, { transaction: t });

        // Simulador de error: Si mandan la palabra 'forzar_error' como descripción, fallará a propósito
        if (descripcion_pedido === 'forzar_error') {
            throw new Error("Simulación de fallo para validar el Rollback");
        }

        // Creamos el pedido asociándolo al usuario recién creado
        await Pedido.create({
            descripcion: descripcion_pedido,
            total: total_pedido,
            usuarioId: nuevoUsuario.id
        }, { transaction: t });

        // Si ambas operaciones fueron exitosas, confirmamos los cambios (COMMIT)
        await t.commit();
        res.status(201).json({ 
                                status: 'success', 
                                message: 'Transacción completada: Usuario y Pedido creados con éxito.'
                            });

    } catch (error) {
        // Si cualquier paso falla, deshacemos todo con ROLLBACK
        await t.rollback();

        // Guardamos el error en el archivo log.txt 
        const logPath = path.join(__dirname, '..', '..', 'logs', 'log.txt');
        const logMessage = `Fecha: ${new Date().toLocaleString()} - ERROR TRANSACCIÓN: ${error.message}\n`;
        
        fs.appendFile(logPath, logMessage, (err) => {
            if (err) console.error('Error al guardar log de transacción');
        });

        res.status(500).json({ 
            status: 'error', 
            message: 'Transacción fallida, se ejecutó ROLLBACK', 
            detalle: error.message 
        });
    }
};

// Exportación de los modulos
module.exports = { 
                    crearUsuario, 
                    getUsuarios, 
                    actualizarUsuario, 
                    eliminarUsuario, 
                    getUsuarioConPedidos, 
                    crearUsuarioConPedido 
                };