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
    photo:{
        type: String,
    },
    categoriaId:
    {
        type: moongose.Schema.Types.ObjectId,
        ref:'categoria'
    }
});

ProductoSchema.methods.setPhoto = function setPhoto(filename) {
    const host = process.env.HOST;
    const port = process.env.PORT;
    console.log(host,port);
    this.photo = `${host}:${port}/public/${filename}`;
};

const Producto = moongose.model("Producto",ProductoSchema);
module.exports = Producto;