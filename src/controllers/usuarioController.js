const Usuario = require('../models/Usuario');

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

module.exports = { crearUsuario, getUsuarios, actualizarUsuario, eliminarUsuario, getUsuarioConPedidos };