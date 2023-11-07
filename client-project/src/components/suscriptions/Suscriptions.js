import React, { useState } from 'react';
import { image } from '../../assets/index';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    gap: '30px',
};

export const Suscription = () => {

    const [open, setOpen] = useState(false);

    const url = "http://localhost:3100/api/v1/suscripciones/new-suscription";

    const [newSuscription, setNewSuscription] = useState({
        nombre: '',
        correo: '',
        celular: '',
    });

    const [data, setData] = useState([]);

    const handleNewSuscriptionChange = (field,value) => {
        setNewSuscription({
            ...newSuscription,
            [field]: value,
        });
        console.log(field,value);
    }

    const handleNewSuscription = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSuscription),
        }).then((response) => response.json())
        .then((newSuscription) => {
                setData([...data, newSuscription]);
                console.log(setData);
                setNewSuscription({
                    nombre: '',
                    correo: '',
                    celular: ''
                });
                setOpen(true);
                console.log(newSuscription);
        })
        .catch((error) => console.log(error));
    }

    return (
        <div id="container" style={{display:"flow" , padding:"100px"}}>
            <AppBar position="fixed"  style={{ backgroundColor: "#000", color: '#fff'}}>
                <Toolbar>
                    <div style={{ display: 'flex', flexGrow: 1}}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <img src={image.logo2} alt="logo" style={{ width: "70px", height: "60px"}} />
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div style={{display: "flex", flexWrap: "wrap", marginBottom: "10px"}}>
                <h1>Suscribirse</h1>
                <TextField
                    label="Nombre"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newSuscription.nombre}
                    onChange={(e) => handleNewSuscriptionChange( 'nombre', e.target.value)}
                />
                <TextField
                    label="Correo"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newSuscription.correo}
                    onChange={(e) => handleNewSuscriptionChange( 'correo', e.target.value)}
                />
                <TextField
                    label="Celular (Con indicador y sin espacios)"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newSuscription.celular}
                    onChange={(e) => handleNewSuscriptionChange( 'celular', e.target.value)}
                />
            </div>
            <div sx={{display:"flex", mt:"10px"}}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <Button sx={{backgroundColor:"black", color:"white"}} onClick={handleNewSuscription}>
                        SUSCRIBIRSE
                    </Button>
                </Link>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <Button sx={{backgroundColor:"black", color:"white", ml:"5px"}} onClick={()=>setOpen(true)}>
                        CANCELAR SUSCRIPCIÓN
                    </Button>
                </Link>
            </div>
        </div>
    )
}