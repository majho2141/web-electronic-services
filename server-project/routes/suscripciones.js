const moongose = require("mongoose");
const SuscripcionesSchema = moongose.Schema({
    nombre:{
        type: String,
        require: true,
    },
    correo:{
        type: String,
        require: true,
    },
    celular:{
        type: String,
        require: true,
    }
});
const Suscripciones = moongose.model("Suscripciones",SuscripcionesSchema);
module.exports=Suscripciones;