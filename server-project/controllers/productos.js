const { json } = require('express');
const productoModel =require ('../models/producto')
const request = require('request');



const createProducto = async (req,res) =>{
    try {
        const productoData = req.body;
        if (!productoData.categoriaId){
            return res.status(400).json({message:'El ID de la categoria es obligatorio'});
        }
        const newProducto = new productoModel({ ...productoData });

        if (req.file) {
            const { filename } = req.file;
            newProducto.setPhoto(filename);
        }

        await newProducto.save();
        res.status(201).json(newProducto);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
};

const getProductosByCategoria = async (req,res) =>{
    try {
        const { categoriaId } = req.params;
        const productos =  await productoModel.find({ categoriaId });
        res.status(200).json(productos);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const getProductoById = async (req,res) =>{
    try {
        const { id } = req.params;
        const response = await productoModel.findById(id);
        if (!response){
            return res.status(400).json({message: 'Producto no encontrado'})
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const getAllProductos = async (req,res) =>{
    try {   
        const allProductos = await productoModel.find();
        res.status(200).json(allProductos)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const updateProductoById = async(req,res) => {
    try {
        const {id} = req.params;
        let productoDataEdit =  req.body;

        const productoUpdated = await productoModel.findByIdAndUpdate(id, productoDataEdit);     
        res.status(200).json({message: 'Actualización exitosa'});
    } catch (error) {
        res.status(400).json({message: error.message});

    }
}

const deleteProductoById = async(req,res) => {
    try {
        const {id} = req.params;
        const response = await productoModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Producto eliminado exitosamente'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const sendMessageToSuscribers = async (req, res) => {
    try {
        const product = req.body;
        console.log(product);

        if (!product) {
            return res.status(400).json({ message: 'Producto no encontrado' });
        }
        // Compara el nuevo descuento con el antiguo
            // Realiza la solicitud para obtener los suscriptores
            const suscribersData = await fetchSuscribers();
            const suscribers = suscribersData || [];
            // Envía mensajes por WhatsApp a los suscriptores
            for (const subscriber of suscribers) {
                // Aquí debes agregar código para enviar mensajes por WhatsApp a cada suscriptor
                // Puedes utilizar la API de WhatsApp Business API o cualquier otro servicio que prefieras.
                // Asegúrate de configurar la integración con WhatsApp Business API correctamente.
                var options = {
                    method: 'POST',
                    url: 'https://api.ultramsg.com/instance67706/messages/chat',
                    headers: { 'content-type': ' application/x-www-form-urlencoded' },
                    form: {
                        "token": process.env.WHATSAPP_TOKEN,
                        "to": `+57${subscriber.celular}`,
                        "body": `Electronics X\nHola ,${subscriber.nombre}!\nQueremos informarte que ${product.nombre} se encuentra con ${product.descuento}% de descuento!, aprovecha esta promoción y otras más accediendo a nuestro sitio web.`,
                    }
                };
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                });
            }
            res.status(200).json({ message: 'Mensaje enviado' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Función para obtener los suscriptores
const fetchSuscribers = async () => {
    const urlSuscribers = 'http://localhost:3100/api/v1/suscripciones';
    try {
        const response = await fetch(urlSuscribers, {
            method: 'GET',
        });

        if (response.ok) {
            const suscribersData = await response.json();
            return suscribersData;
        } else {
            console.error('Error al obtener suscriptores');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener suscriptores:', error);
        return null;
    }
}

// const sendMessageToSuscribers = async(req,res) => {
//     var suscribers;
//     const urlSuscribers = 'http://localhost:3100/api/v1/suscripciones';
//     fetch(urlSuscribers, {
//         method: 'GET', 
//     }).then((response) => response.json())
//     .then((suscribersData) => {
//         suscribers = suscribersData;
//         console.log(suscribers);
//     })
//     .catch((error) => console.log(error));
//     try {
//         const { id } = req.params;
//         const response = await productoModel.findById(id);
//         if (!response){
//             return res.status(400).json({message: 'Producto no encontrado'})
//         };
//         console.log();
//         res.status(200).json(response);
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
// }


module.exports = {
    createProducto,
    getProductosByCategoria,
    getProductoById,
    getAllProductos,
    updateProductoById,
    deleteProductoById,
    sendMessageToSuscribers,
}
