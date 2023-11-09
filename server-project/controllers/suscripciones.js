const { response } = require('express');
const suscripcionModel = require('../models/suscripciones');
const request = require('request');

// Asincronía
// async await

const createSuscripcion = async (req, res) => {
    try {
        const { nombre, correo, celular } = req.body;
        const newSuscripcion = await suscripcionModel.create({
            nombre,
            correo,
            celular,
        });

        await newSuscripcion.save();
        console.log(newSuscripcion);

        var options = {
            method: 'POST',
            url: 'https://api.ultramsg.com/instance67706/messages/chat',
            headers: { 'content-type': ' application/x-www-form-urlencoded' },
            form: {
                "token": process.env.WHATSAPP_TOKEN,
                "to": `+57${celular}`,
                "body": `Electronics X\nMuchas gracias por suscribirte ${nombre}!\nTe mantendremos informado de nuestras novedades.`,
            }
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
        console.log("Mensaje enviado");
        res.status(200).json({ message: "Suscripción creada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
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

const deleteSuscripcion = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteSuscripcion = await suscripcionModel.findByIdAndDelete(id);
        res.status(200).json(deleteSuscripcion);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    createSuscripcion,
    getAllSuscripciones,
    getSuscripcionById,
    deleteSuscripcion,
};