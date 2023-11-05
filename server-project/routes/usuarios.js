const userController = require("../controllers/usuarios");
const express = require("express");
const md_auth= require('../middlewares/authenticatedValidation');

const router= express.Router();

// http://localhost:3000/api/v1/users/new-users
router.post('/new-user', [md_auth.ensureAuth], userController.createUser);
// http://localhost:3000/api/v1/users
router.get('/', userController.getAllUsers);
// http://localhost:3000/api/v1/users?id=****
router.get('/:id', userController.getUserById);
// http://localhost:3000/api/v1/users?id=****
router.patch('/:id', userController.updateUserById);
// http://localhost:3000/api/v1/users?id=****
router.put('/:id', userController.updateUserById);
// http://localhost:3000/api/v1/users?id=****
router.delete('/:id', userController.deleteUserById);


module.exports= router;