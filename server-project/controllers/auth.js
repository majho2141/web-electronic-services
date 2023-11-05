const userModel = require('../models/usuarios');
const { generateToken , refreshToken } = require('../utils/jwt');
const bcrypt = require("bcrypt");

//Crear la funcion para el registro - signIn
const signin = async (req,res) => {
    const {nombre, apellido, email, telefono , contraseña} = req.body;
    try{
        if (!email){
            res.status(400).json({message: "El email es obligatorio"});
            throw new Error("El email es obligatorio");
        }
        if (!contraseña){
            res.status(400).json({message: "La contraseña es obligatoria"});
            throw new Error("La contraseña es obligatoria");
        }
        const emailLowerCase = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const contraseña_hash = await bcrypt.hash(contraseña, salt);
        
        const newUser = await userModel.create({
            nombre,
            apellido,
            email: emailLowerCase,
            telefono,
            contraseña: contraseña_hash,
        });

        const userStorage = await newUser.save();

        console.log(userStorage);

        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

const login = async (req, res) => {
    const {email, current_password} = req.body;
    console.log(req.body);
    try {
        if (!email ||!current_password){
            throw new Error("El email y la contraseña son obligatorios");
        }
        const emailLowerCase =  email.toLowerCase();
        const userStore = await userModel.findOne({ email: emailLowerCase}).exec(); //findOne sirve para buscar un solo usuario porque es valor unico

        if (!userStore) {
            throw new Error("El usuario no existe");
        }

        const check = await bcrypt.compare(
            current_password,
            userStore.current_password
        );

        if (!check) {
            throw new Error("La constraseña no es correcta");
        }

        const token = await generateToken(userStore);
        const refresh = await refreshToken(userStore);

        res.status(200).json({ 
            access : token,
            refresh: refresh, 
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getMe = async (req, res) => {
    try {
        const {id} = req.params;   
        const userFind = await userModel.findById(id);
        //Obtener token del usuario
        
        res.status(200).json(userFind);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    signin,
    login,
    getMe,
};