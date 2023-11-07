const productoController = require ('../controllers/productos');
const express = require("express");

const router = express.Router();

//http://localhost:3100/api/v1/productos/new-pro
router.post('/new-pro',
    productoController.fileUpload,
    productoController.createProducto
);
//http://localhost:3100/api/v1/:categoriasId/producto
router.get('/:categoriaId/productos',productoController.getProductosByCategoria);
//http://localhost:3100/api/v1/productos/
router.get('/:id',productoController.getProductoById);
//http://localhost:3100/api/v1/productos/
router.get('/',productoController.getAllProductos);
//http://localhost:3100/api/v1/productos/
router.patch('/:id',
    productoController.fileUpload,
    productoController.updateProductoById
);
//http://localhost:3100/api/v1/productos/
router.delete('/:id',productoController.deleteProductoById);

module.exports = router;