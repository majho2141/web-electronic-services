const { json } = require('express');
const productoModel =require ('../models/producto')
const multer = require('multer');
const multerConfig = require('../utils/multerConfig')
const upload = multer(multerConfig).single('image')

const fileUpload = (req,res,next) => {
    upload(req,res,function(error) {
        if(error){
            res.json({message: error});
        }
        return next();
    })
}
const createProducto = async (req,res) =>{
    try {
        const productoData = req.body;
        if (!productoData.categoriaId){
            return res.status(400).json({message:'El ID de la categoria es obligatorio'})
        }
        if(req.file && req.file.filename){
            productoData.image = req.file.filename
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
        let newProducto = req.body
        const {id} = req.params;
        const productoDataEdit =  req.body;

        if(req.file && req.file.filename){
            newProducto.image = req.file.filename
        }else{
            const producto=await productoModel.findById(req.params.id)
            newProducto.image = producto.image
        }
        const response = await productoModel.findByIdAndUpdate(id, productoDataEdit);
        res.status(200).json({message: 'Actualización exitosa'});
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
        res.status(400).json({message: error.message});
    }


}


module.exports = {
    createProducto,
    getProductosByCategoria,
    getProductoById,
    getAllProductos,
    updateProductoById,
    fileUpload,
    deleteProductoById
}
