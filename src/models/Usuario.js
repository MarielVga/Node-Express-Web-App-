const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definimos el modelo de datos Usuario
const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'usuarios',
    timestamps: true // Crea automáticamente createdAt y updatedAt
});

module.exports = Usuario;