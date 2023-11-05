const { response } = require('express');
const suscripcionModel = require('../models/suscripciones');

// Asincronía
// async await

const createSuscripcion = async (req , res) => {
    try {
        const suscripcionData = req.body;
        console.log(suscripcionData);
        const newSuscripcion = new suscripcionModel({...suscripcionData});
        console.log(newSuscripcion);
        await newSuscripcion.save();
        res.status(201).json(newSuscripcion);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getAllSuscripciones = async(req,res) => {
    try {
        const allSuscripciones = await suscripcionModel.find();
        res.status(201).json(allSuscripciones);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getSuscripcionById = async (req,res) => {
    try {
        const {id} = req.params;   
        const findSuscripcion = await suscripcionModel.findById(id);
        res.status(200).json(findSuscripcion);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    createSuscripcion,
    getAllSuscripciones,
    getSuscripcionById,
};