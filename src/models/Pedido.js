const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'pedidos',
    timestamps: true
});

module.exports = Pedido;