const authController = require("../controllers/auth");
const express = require("express");
const router= express.Router();

router
.post("/signin", authController.signin)
.post("/login", authController.login)
.get("/activate/:id", authController.activate)
.get("/get-me/:id", authController.getMe);


module.exports= router;