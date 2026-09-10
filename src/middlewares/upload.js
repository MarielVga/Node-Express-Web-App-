const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'public', 'uploads')); // Carpeta pública 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
    // 1. Agregamos soporte para .webp que es muy común hoy en día
    const permitidos = /jpeg|jpg|png|gif|webp/; 
    
    const extension = permitidos.test(path.extname(file.originalname).toLowerCase());
    const mimetype = permitidos.test(file.mimetype);

    // 2. Imprimimos en consola lo que está llegando para diagnosticar
    console.log(`Evaluando archivo: ${file.originalname}`);
    console.log(`MIME Type detectado: ${file.mimetype}`);
    console.log(`¿Extensión válida?: ${extension} | ¿MIME válido?: ${mimetype}`);

    if (extension && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error(`Formato no válido. Intentaste subir un archivo de tipo: ${file.mimetype}`));
    }
};

// Inicializar con límite de tamaño
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB máximo
    fileFilter: fileFilter
});

module.exports = upload;