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

export const StatusUsers = () => {

    const [open, setOpen] = useState(false);



    const [data, setData] = useState([]);


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
                <h1>Registro exitoso!</h1>
            </div>
            <p>Haz click en el enlace que te llego al correo para activarte</p>
        </div>
    )
}