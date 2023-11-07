const moongose = require ("mongoose");
const ProductoSchema = moongose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    precio: {
        type: moongose.Schema.Types.Decimal128,
        require: true,
    },
    descuento: {
        type: Number,
        validate: {
            validator: function(value) {
                return (value * 100) % 5 === 0;
            },
            message: "El descuento debe ser un múltiplo de 5%.",
        },
        get: (value) => (value * 100).toFixed(2),
        set: (value) => (value / 100),
        default: 0,
    },    
    cantidad:{
        type: Number,
        require: true,
    },
    disponibilidad:{
        type: Boolean,
        require: true,
    },
    image:{
        type: String,
    },
    categoriaId:
    {
        type: moongose.Schema.Types.ObjectId,
        ref:'categoria'
    }
});
const Producto = moongose.model("Producto",ProductoSchema);
module.exports = Producto;