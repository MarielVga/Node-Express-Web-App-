# Proyecto: Node & Express Web App - Módulo 6

Este repositorio contiene la primera etapa (Módulo 6) del desarrollo de una aplicación web backend. El objetivo principal es levantar un servidor robusto, servir contenido web estático/dinámico y establecer una arquitectura modular para futuras integraciones.

## ⚙️ Requisitos del sistema
- **Node.js**: v18.0.0 o superior.
- **NPM**: Manejador de paquetes de Node.

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

- `/controllers`: (Preparada para el Módulo 7) Contendrá la lógica de negocio.
- `/logs`: Almacena la persistencia en archivos planos (`log.txt`).
- `/middlewares`: Funciones intermedias, como el registro de visitas.
- `/public`: Archivos estáticos servidos directamente al cliente.
- `/routes`: Definición de los endpoints y enrutadores.
- `index.js`: Punto de entrada principal de la aplicación.

## 🔗 Rutas del Proyecto
Rutas del navegador que se pueden visitar

- `http://localhost:3000/`: Para ver el contenido HTML estático.
- `http://localhost:3000/bienvenida`: Para ver la ruta dinámica.
- `http://localhost:3000/status`: Para recibir la respuesta en formato JSON.


## 🧠 Justificaciones Técnicas

- **Nombre del archivo principal (`index.js`):** Se eligió `index.js` por ser la convención estándar en el ecosistema Node.js, facilitando identificar rápidamente el punto de entrada del servidor.

- **Estructura de carpetas:** Aunque la app es pequeña, se adoptó una estructura modular (separando rutas y middlewares) para cumplir con los estándares y preparar la escalabilidad de los siguientes módulos.

- **Ausencia de plantillas:** Se decidió servir HTML estático en lugar de usar motores de plantillas (como EJS) para enfocar la arquitectura hacia una futura API REST.

- **Persistencia de Logs:** Se implementó el módulo nativo `fs` de forma asíncrona dentro de un middleware global, registrando cada petición sin bloquear el hilo principal de ejecución.