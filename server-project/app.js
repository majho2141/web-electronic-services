const express = require('express');
const cors = require('cors');
const app = express(); // Debes inicializar 'app' aquí

app.use(cors());
const API_VERSION = 'api/v1';
const userRoutes = require("./routes/usuarios");
const categoriaRoutes = require("./routes/categoria");
const productoRoutes = require("./routes/producto");
const suscripcionesRoutes = require("./routes/suscripciones");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${API_VERSION}/usuarios`, userRoutes);
app.use(`/${API_VERSION}/categorias`, categoriaRoutes);
app.use(`/${API_VERSION}/productos`, productoRoutes);
app.use(`/${API_VERSION}/suscripciones`, suscripcionesRoutes);
app.use(`/${API_VERSION}/auth`, authRoutes);


module.exports = app;
