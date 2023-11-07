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

const getAllProductos = async (req,res) =>{
    try {   
        const allProductos = await productoModel.find();
        res.status(200).json(allProductos)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const updateProductoById = async(req,res) => {
    try {
        const {id} = req.params;
        const productoDataEdit =  req.body;
        const response = await productoModel.findByIdAndUpdate(id, productoDataEdit);
        res.status(200).json({messasge:'Actualizacion exitosa'});
    } catch (error) {
        res.status(400).json({message: error.message});

    }
}

const deleteProductoById = async(req,res) => {
    try {
        const {id} = req.params;
        const response = await productoModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Producto eliminado exitosamente'});
    } catch (error) {
        res.status(400).json({message: error});
    }


}


module.exports = {
    createProducto,
    getProductosByCategoria,
    getProductoById,
    getAllProductos,
    updateProductoById,
    deleteProductoById
}
