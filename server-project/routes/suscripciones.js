const suscripcionController = require ('../controllers/suscripciones');
const express = require("express");

const router = express.Router();

router
    //http://localhost:3100/api/v1/suscripciones/new-suscripcion
    .post('/new-suscription',suscripcionController.createSuscripcion)
    //http://localhost:3100/api/v1/suscripciones/
    .get('/',suscripcionController.getAllSuscripciones)
    //http://localhost:3100/api/v1/suscripciones/:id
    .get('/:id',suscripcionController.getSuscripcionById)
    //http://localhost:3100/api/v1/suscripciones/:id  
    .delete('/:id',suscripcionController.deleteSuscripcion);


module.exports = router;