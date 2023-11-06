const moongose = require("mongoose");
const SuscripcionesSchema = moongose.Schema({
    nombre:{
        type: String,
        require: true,
    },
    correo:{
        type: String,
        unique: true,
        require: true,
    },
    celular:{
        type: String,
        unique: true,
        require: true,
    }
});
const Suscripciones = moongose.model("Suscripciones",SuscripcionesSchema);
module.exports=Suscripciones;