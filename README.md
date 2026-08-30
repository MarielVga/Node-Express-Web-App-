# Proyecto: Node & Express Web App - Módulo 6 y 7

Este repositorio contiene la evolución del desarrollo de una aplicación web backend, abarcando la estructura base (Módulo 6) y la integración de persistencia de datos relacionales mediante un ORM (Módulo 7). El objetivo es levantar un servidor robusto, servir contenido web, y gestionar operaciones de base de datos con relaciones y transaccionalidad.

## ⚙️ Requisitos del sistema
- **Node.js**: v18.0.0 o superior.
- **NPM**: Manejador de paquetes de Node.
- **PostgreSQL**: Motor de base de datos relacional instalado y en ejecución.

## 🚀 Instrucciones de instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/MarielVga/Node-Express-Web-App-.git
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd proyecto-node-express
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Configurar variables de entorno creando un archivo `.env` en la raiz del proyecto con las credenciales de conexión:
   ```bash
   DB_USER=postgres
   DB_PASSWORD=contraseña
   DB_HOST=localhost
   DB_NAME=alkemy_db
   DB_PORT=5432
   PORT=3000
   ```
5. Asegurate de haber creado previamente la base de datos con nombre `alkemy_db`

## 💻 Ejemplos de uso (Scripts)
El proyecto incluye dos scripts principales configurados en el `package.json`:

- **Modo Desarrollo:** 
  ```bash
  npm run dev
  ```
  *Ejecuta el servidor con `nodemon`, reiniciándolo automáticamente al detectar cambios en el código.*

- **Modo Producción:**
  ```bash
  npm start
  ```
  *Ejecuta el servidor de forma estándar con `node`.*

## 📂 Estructura del Proyecto
El proyecto sigue una arquitectura modular orientada a separar responsabilidades:

- `/config`: Archivos de configuración, incluyendo la conexión a la base de datos PostgreSQL.
- `/controllers`: Contiene la lógica de negocio y las funciones asincronas para el manejo de datos.
- `/logs`: Almacena la persistencia en archivos planos (`log.txt`).
- `/middlewares`: Funciones intermedias, como el registro de visitas.
- `/models`: Define las entidades de la base da datos (Usuario, Pedido) utilizando el ORM Sequelize.
- `/public`: Archivos estáticos servidos directamente al cliente.
- `/routes`: Definición de los endpoints y enrutadores.
- `index.js`: Punto de entrada principal de la aplicación.

## 🔗 Rutas del Proyecto
Rutas del navegador que se pueden visitar

- `http://localhost:3000/`: Para ver el contenido HTML estático.
- `http://localhost:3000/bienvenida`: Para ver la ruta dinámica.
- `http://localhost:3000/status`: Para recibir la respuesta en formato JSON.

## 🗄️ API de Gestión de Usuarios

- `GET /usuarios`: Obtiene la lista completa de usuarios.
- `POST /usuarios`: Crea un nuevo registro de usuario.
- `PUT /usuarios/:id`: Actualiza los datos de un usuario existente
- `DELETE /usuarios/:id`: Elimina un usuario validando su ID.
- `GET /usuarios/:id/pedidos`: Devuelve los datos del usuario junto con sus pedidos anidados, resolviendo la relación 1:N.  
- `POST /usuarios/transaccion`: Endpoint especial que ejecuta una transacción anidada para crear un usuario y su pedido simultáneamente.

## 🧠 Justificaciones Técnicas

- **Nombre del archivo principal (`index.js`):** Se eligió `index.js` por ser la convención estándar en el ecosistema Node.js, facilitando identificar rápidamente el punto de entrada del servidor.

- **Estructura de carpetas:** Se adoptó una estructura modular separando rutas, middlewares, controladores y modelos para preparar la escalabilidad y facilitar el mantenimiento del código.

- **Uso de ORM (Sequelize):** Se implementó Sequelize para interactuar con la base de datos PostgreSQL, ya que abstrae la estructura SQL de las tablas y permite gestionar los datos mediante modelos en JavaScript.

- **Estructura de carpetas:** Se centralizó el acceso a datos en los controladores, utilizando métodos nativos del ORM como `.create()`, `.findAll()`, `.update()` y `.destroy()`

- **Manejo de Relaciones:** Se modeló una relación Uno a Muchos (1:N) utilizando los métodos hasMany() y belongsTo() para vincular las tablas de Usuarios y Pedidos.

- **Transaccionalidad y Manejo de Errores:** Se implementaron bloques `try...catch` junto con métodos de Sequelize para capturar fallos. Si una operación combinada falla, se ejecuta un `ROLLBACK` para revertir los cambios y asegurar las propiedades ACID de la base de datos; si tiene éxito, se consolida con `COMMIT`.

- **Persistencia de Logs:** Además del registro de visitas asíncrono implementado con `fs` (Módulo 6), se reutilizó el módulo de sistema de archivos para guardar de forma persistente los errores generados por transacciones fallidas en el archivo log.txt. 