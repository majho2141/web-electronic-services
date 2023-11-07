import React, { useState } from 'react';
import { image } from '../../assets/index';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

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

export const Signin = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const url = "http://localhost:3100/api/v1/auth/signin"

    const [newUser, setNewUser] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        contraseña: '',
    });

    const [data, setData] = useState([]);

    const handleNewUserChange = (field,value) => {
        setNewUser({
            ...newUser,
            [field]: value,
        });
        console.log(field,value);
    };

    const handleNewUser = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser),
        }).then((response) => response.json())
        .then((newUser) => {
                setData([...data, newUser]);
                console.log(setData);
                setNewUser({
                    nombre: '',
                    apellido: '',
                    email: '',
                    telefono: '',
                    contraseña: '',
                });
                console.log(newUser);
                
        })
        .catch((error) => console.log(error));
    };

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
                <h1>Registrarse</h1>
                <TextField
                    label="Nombre"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newUser.nombre}
                    onChange={(e) => handleNewUserChange( 'nombre', e.target.value)}
                />
                <TextField
                    label="Apellido"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newUser.apellido}
                    onChange={(e) => handleNewUserChange( 'apellido', e.target.value)}
                />
                <TextField
                    label="Correo"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newUser.email}
                    onChange={(e) => handleNewUserChange( 'email', e.target.value)}
                />
                <TextField
                    label="Teléfono"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newUser.telefono}
                    onChange={(e) => handleNewUserChange( 'telefono', e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type='password'
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newUser.contraseña}
                    onChange={(e) => handleNewUserChange( 'contraseña', e.target.value)}
                />
            </div>
            <div sx={{display:"flex", mt:"10px"}}>
                <Button sx={{backgroundColor:"black", color:"white"}} onClick={handleNewUser}>
                    Registrarse
                </Button>
                <Link to="/" >
                    <Button sx={{backgroundColor:"black", color:"white", ml:"5px"}} onClick={()=>setOpen(true)}>
                        Cancelar
                    </Button>
                </Link>
            </div>
        </div>
    )
}