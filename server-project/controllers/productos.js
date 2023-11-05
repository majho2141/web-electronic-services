const { json } = require('express');
const productoModel =require ('../models/producto')

const createProducto = async (req,res) =>{
    try {
        const productoData = req.body;
        if (!productoData.categoriaId){
            return res.status(400).json({message:'El ID de la categoria es obligatorio'})
        }
        const newProducto = new productoModel({ ...productoData });
        await newProducto.save();
        res.status(201).json(newProducto);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
};

const getProductosByCategoria = async (req,res) =>{
    try {
        const { categoriaId } = req.params;
        const productos =  await productoModel.find({ categoriaId });
        res.status(200).json(productos);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const getProductoById = async (req,res) =>{
    try {
        const { id } = req.params;
        const response = await productoModel.findById(id);
        if (!response){
            return res.status(400).json({message: 'Producto no encontrado'})
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}


module.exports = {
    createProducto,
    getProductosByCategoria,
    getProductoById
}
