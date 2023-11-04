const mongoose = require('mongoose');
const app = require('./app');
const {DB_USER,DB_PASSWORD,DB_HOST} = require("./config");

// Para poder acceder al archivo .env
require('dotenv').config();

// Acceder a variables del .env se usa proceso .env
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`Conectados por el puerto ${port}`));

// Crear conexion a base de datos mongo
//mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}
//mongodb+srv://adminuser:adminuser@cluster0.rc6w2yd.mongodb.net/

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`)
.then(()=>console.log('Conectado a mongoDB'))
.catch((err)=> console.error(`Error al conectar a mongoDB ${err}`));
