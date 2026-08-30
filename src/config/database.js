require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuramos los parámetros para conectarnos a PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false // Desactiva el log de SQL en consola para mantenerla limpia
    }
);

module.exports = sequelize;