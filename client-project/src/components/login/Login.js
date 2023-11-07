import React, { useState } from 'react';
import { image } from '../../assets/index';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



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

export const Login = () => {
    
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const urlGetUser = "http://localhost:3000/api/v1/usuarios/email/";

    const [email, setEmail] = useState('');

    const handleRoutes = async (email) => {
        let user;
        console.log(email);
        await fetch(`http://localhost:3000/api/v1/usuarios/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
        .then((userData) => {
            user = userData;
            console.log(user.rol);
        })
        if (user.rol[0] === 'administrador') {
            navigate("/Admin");
        }else if (user.rol[0] === 'secretario') {
            if (user.permisos === false){
                navigate("/");
            }else{
                navigate("/Productos");
            }
        }else if (user.rol[0] === 'usuario') {
            navigate("/");
        }
    }

    const url = "http://localhost:3000/api/v1/auth/login";

    const [newLogin, setNewLogin] = useState({
        email: '',
        contraseña: ''
    });

    const [data, setData] = useState([]);

    const handleNewLoginChange = (field,value) => {
        setNewLogin({
            ...newLogin,
            [field]: value,
        });
        console.log(field,value);
    }

    const handleNewLogin = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLogin),
        }).then((response) => response.json())
        .then((newLogin) => {
                setData([...data, newLogin]);
                console.log(setData);
                setNewLogin({
                    email: '',
                    contraseña: ''
                });
                setOpen(true);
                console.log(newLogin);
        })
        .catch((error) => console.log(error));
        handleRoutes(newLogin.email);
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
                <h1>Iniciar sesión</h1>
                <TextField
                    label="Correo Électronico"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newLogin.email}
                    onChange={(e) => handleNewLoginChange( 'email', e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    fullWidth
                    sx={{ margin: '8px 0' }}
                    value={newLogin.contraseña}
                    type='password'
                    onChange={(e) => handleNewLoginChange( 'contraseña', e.target.value)}
                />
            </div>
            <div sx={{display:"flex", mt:"10px"}}>
                <Button sx={{backgroundColor:"black", color:"white"}} onClick={handleNewLogin}>
                    INICIAR SESIÓN
                </Button>
                <Button sx={{backgroundColor:"black", color:"white", ml:"5px"}} onClick={()=>setOpen(true)}>
                    CANCELAR 
                </Button>
            </div>
        </div>
    )
}