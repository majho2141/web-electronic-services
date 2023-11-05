const categoriaController = require ('../controllers/categoria');
const express = require("express");

const router = express.Router();

//http://localhost:3100/api/v1/categorias/new-ctg
router.post('/new-ctg',categoriaController.createCategoria);
//http://localhost:3100/api/v1/categorias
router.get('/',categoriaController.getAllCategorias);
//http://localhost:3100/api/v1/categorias/
router.get('/:id',categoriaController.getCategoriaById);
//http://localhost:3100/api/v1/categorias/
router.delete('/:id',categoriaController.deleteCategoriaById);


module.exports = router;