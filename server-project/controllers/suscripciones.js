const { response } = require('express');
const suscripcionModel = require('../models/suscripciones');
const accountSid = 'AC439532fa38d91d713ec7e0008e9a63b2';
const authToken = '2865590e5267426c31239084746aa9ea';
const client = require('twilio')(accountSid, authToken);

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

        // Enviar mensaje de WhatsApp
        const sendMail = await client.messages.create({
            body: `¡Muchas gracias por suscribirte, ${nombre}!`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${celular}`
        });
        console.log(sendMail.sid);

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