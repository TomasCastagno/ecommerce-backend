1.- Iniciar proyecto con npm init -y

2.- Instalar dependencias express sequelize pg ph-hstore cors dotenv

3.- Instalar deependencias de de desarrollo nodemon morgan

4.- Estructrua de carpetaas
/src
--- /services
--- /models
--- /controllers
--- /routes
--- /middlewares
--- /seeders
--- /tests
--- /utils
--- /templates
app.js
server.js
5.- Crear los scripts en package.json :
"start": "node ./src/server.js"
"dev": "nodemon ./src/server.js"
(crear el gitignore de node_modules)
6.- Crear un server básico (importando express, morgan, cors, dotenv, variable app, y listen)

7.- configuar la conexión a la base de datos (db) (sequelize) (Hacer variables de entorno )

8.- Autenticar la base de datos

9.- Crear modelo genérico de usuarios

10.- Crear el init Models

11.- Sincronizar la base de datos

12.- Registro de usuario ---> creación de usuario
"1234" ---> encriptar las contraseñas
bcrypt

13.- Generar Autenticación con el login
