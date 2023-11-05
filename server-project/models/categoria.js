const moongose = require("mongoose")
const CategoriaSchema = moongose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true, 
    },    
    descripcion : {
        type: String,
        require: true,
    },
    logo : {
        type: String,
    }
});

const Categoria = moongose.model("Categoria",CategoriaSchema);
module.exports= Categoria;