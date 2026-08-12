const fs = require('fs');
const path = require('path');

// Registrar las visitas
const loggerMiddleware = ((req, res, next) => {
    // Obtenemos la fecha y hora actual
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    // Formato de fecha, hora y ruta accedida
    const logMessage = `Fecha: ${date} - Hora: ${time} - Ruta: ${req.url}\n`;
    
    // Ruta donde se guardará el archivo log (dentro de la carpeta logs)
    const logPath = path.join(__dirname, '..', '..', 'logs', 'log.txt');
    
    // Usamos fs.appendFile para agregar el registro sin borrar lo anterior
    fs.appendFile(logPath, logMessage, (err) => {
        if (err) {
            console.error('Error al guardar el log:', err);
        }
    });
    
    next(); // Fundamental para que la petición siga su curso hacia las rutas
});


// Exportamos la función para usarla en index.js
module.exports = loggerMiddleware;