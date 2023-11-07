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

CategoriaSchema.pre("remove", async function (next) {
    const productos = await moongose.model("Producto").find({ categoriaId: this._id });
    
    if (productos.length > 0) {
        for (const producto of productos) {
            await producto.remove();
        }
    }
    next();
});

const Categoria = moongose.model("Categoria",CategoriaSchema);
module.exports= Categoria;