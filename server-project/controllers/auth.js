const userModel = require('../models/usuarios');
const { generateToken , refreshToken } = require('../utils/jwt');
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//Crear la funcion para el registro - signIn
const signin = async (req, res) => {
    const { nombre, apellido, email, telefono, contraseña } = req.body;
    try {
        // Verificar si hay usuarios registrados en la base de datos
        const userCount = await userModel.countDocuments();
        console.log(userCount);

        if (!email) {
            res.status(400).json({ message: "El email es obligatorio" });
            throw new Error("El email es obligatorio");
        }
        if (!contraseña) {
            res.status(400).json({ message: "La contraseña es obligatoria" });
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
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: 'camiangi1517@gmail.com',
                pass: 'qlti jxim xibh mzlz'
            }
        });
        newUser.estado = true;
        await transporter.sendMail({
            from: 'camiangi1517@gmail.com',
            to: `${email}`,
            subject: 'Bienvenido a Electronics X!',
            html: `<h1>Gracias por registrarte ${nombre} ${apellido}</h1>
                    <p>Ya puedes acceder a todo nuestro contenido, <a href='http://localhost:3000'>haz click aquí.</p>
            `
        });

        if (userCount === 0) {
            newUser.rol= 'administrador';
            await transporter.sendMail({
                from: 'camiangi1517@gmail.com',
                to: `${email}`,
                subject: 'Bienvenido a Electronics X!',
                html: `<h1>Gracias por registrarte ${nombre} ${apellido}</h1>
                        <p>Haz <a href='http://localhost:3100/api/v1/auth/activate/${newUser.id}'>click aquí</a> para activar tu cuenta! </p>
                `
            });
        }
        const userStorage = await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const {email, contraseña} = req.body;
    console.log(req.body);
    try {
        if (!email || !contraseña){
            throw new Error("El email y la contraseña son obligatorios");
        }
        const emailLowerCase =  email.toLowerCase();
        const userStore = await userModel.findOne({ email: emailLowerCase}).exec();

        if (!userStore) {
            throw new Error("El usuario no existe");
        }

        const check = await bcrypt.compare(
            contraseña,
            userStore.contraseña
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

const activate = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await userModel.findById(id);
        userFind.estado = true;
        await userFind.save();
        res.redirect(301, 'http://localhost:3000/Activaci%C3%B3n%20exitosa');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    signin,
    login,
    getMe,
    activate
};