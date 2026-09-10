const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Solicitamos el encabezado de autorización
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ status: 'error', message: 'Acceso denegado. No se proporcionó un token.' });
    }

    // Extraemos el token ("Bearer <token>")
    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Formato de token inválido. Use: Bearer <token>' });
    }

    try {
        // Verificamos la validez y que no esté expirado usando nuestro secreto
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Inyectamos los datos decodificados en la petición por si el controlador los necesita
        req.usuario = verificado; 
        
        // Dejamos pasar la petición
        next(); 
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Token no válido o expirado.' });
    }
};

module.exports = verificarToken;