const authController = require("../controllers/auth");
const express = require("express");
const router= express.Router();

router
.post("/signin", authController.signin)
.post("/login", authController.login)
.get("/get-me/:id", authController.getMe);


module.exports= router;