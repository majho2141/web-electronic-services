const express = require('express');
const cors = require('cors');
const app = express(); // Debes inicializar 'app' aquí

app.use(cors());
const API_VERSION = 'api/v1';
//const userRoutes = require("./routes/user");
const categoriaRoutes = require("./routes/categoria");
const productoRoutes = require("./routes/producto");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(`/${API_VERSION}/users`, userRoutes);
app.use(`/${API_VERSION}/categorias`, categoriaRoutes);
app.use(`/${API_VERSION}/productos`, productoRoutes);

module.exports = app;
