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
        type: moongose.Schema.Types.Decimal128,
        validate: {
            validator: function(value) {
                return value % 5 === 0;
            },
            message: "El descuento debe ser un múltiplo de 5%.",
        },
    },
    cantidad:{
        type: Number,
        require: true,
    },
    disponibilidad:{
        type: Boolean,
        require: true,
    },
    logo:{
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