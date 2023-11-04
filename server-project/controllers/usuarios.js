const { response } = require('express');
const userModel = require('../models/user');

// Asincronía
// async await

const createUser = async (req , res) => {
    try {
        const userData = req.body;
        console.log(userData);
        const newUser = new userModel({...userData});
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getAllUsers = async(req,res) => {
    try {
        const allUsers = await userModel.find();
        res.status(201).json(allUsers);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getUserById = async (req,res) => {
    try {
        const {id} = req.params;   
        const userFind = await userModel.findById(id);
        res.status(200).json(userFind);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const updateUserById = async(req,res) => {
    try {
        const {id} = req.params;
        const userDataEdit =  req.body;
        const response = await userModel.findByIdAndUpdate(id, userDataEdit);
        res.status(200).json({messasge:'Actualizacion exitosa'});
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
}

const deleteUserById = async(req,res) => {
    try {
        const {id} = req.params;
        const response = await userModel.findByIdAndDelete(id);     
        res.status(200).json({message: 'Usuario eliminado exitosamente'});   
    } catch (error) {
        res.status(400).json({message: error});
    }


}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};