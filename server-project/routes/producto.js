const productoController = require ('../controllers/productos');
const express = require("express");
const upload = require('../libs/storage');
const router = express.Router();

//http://localhost:3100/api/v1/productos/new-pro
router.post('/new-pro',upload.single('photo') ,productoController.createProducto);
//http://localhost:3100/api/v1/:categoriasId/producto
router.get('/:categoriaId/productos',productoController.getProductosByCategoria);
//http://localhost:3100/api/v1/productos/
router.get('/:id',productoController.getProductoById);
//http://localhost:3100/api/v1/productos/
router.get('/',productoController.getAllProductos);
//http://localhost:3100/api/v1/productos/
router.patch('/:id', productoController.updateProductoById);
//http://localhost:3100/api/v1/productos/
router.delete('/:id',productoController.deleteProductoById);
//http://localhost:3100/api/v1/productos/send-message
router.post('/send-message/:descuento',productoController.sendMessageToSuscribers);

module.exports = router;