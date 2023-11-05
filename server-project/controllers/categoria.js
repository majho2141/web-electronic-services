const categoriaModel = require ('../models/categoria');

const createCategoria = async (req,res) =>{
    try {
        const categoriaData = req.body;
        const newCategoria = new categoriaModel({ ...categoriaData});
        console.log(newCategoria);
        await newCategoria.save();
        res.status(201).json(newCategoria);
    } catch (err) {
        res.status(400).json({message : err.message})
    }
};

const getAllCategorias = async (res) =>{
    try {
        const allCategorias = await categoriaModel.find();
        res.status(201).json(allCategorias);
    } catch (err) {
        res.status(400).json({message : err.message})
    }
}

const getCategoriaById = async (req,res) => {
    try {
        const { id } = req.body;
        const response= await categoriaModel.findById(id);
        console.log(response);
        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({message : err.message})
    }
}

module.exports ={
    createCategoria,
    getAllCategorias,
    getCategoriaById
}