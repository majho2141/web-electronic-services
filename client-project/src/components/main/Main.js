import React, { useState, useEffect } from 'react';
import { image } from '../../assets/index';
import { Chip, Grid, Modal } from '@mui/material';
import './Main.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { AccountCircle } from '@mui/icons-material';
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
};

const settings = {
    'Registrarse': 'signup',
    'Iniciar sesión': 'login',
};



export const Main = () => {

    const [categorias, setCategorias] = useState(null);
    const [data, setData] = useState([]);
    const [productos, setProductos] = useState(null);
    const [dataProductos, setDataProductos] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    const urlCategorias = "http://localhost:3100/api/v1/categorias";
    const urlProductos = "http://localhost:3100/api/v1/productos";

    useEffect(() => {
        fetch(urlProductos, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setDataProductos(data)
                console.log(data)
            })
            .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        fetch(urlCategorias, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch((error) => console.log(error))
    }, []);


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    

    const [open, setOpen] = useState(false);
    const [selectedProducto, setselectedProducto] = useState(null);

    const handleOpen = (productoId) => {
        const producto = dataProductos.find((producto) => producto._id === productoId);
        console.log(productoId);
        setOpen(true);
        console.log(producto);
        setselectedProducto(producto);
    }

    const getFilteredProductos = () => {
        if (selectedCategoria) {
            return dataProductos.filter(producto => producto.categoriaId === selectedCategoria._id);
        } else {
            return dataProductos; 
        }
    }

    const ProductosList = () => {
        const filteredProductos = getFilteredProductos();

        return (
            <div className="products-list">
                {filteredProductos.map((producto) => (
                    <div className="card-product">
                        <h3 className='card-title-product'>{producto.nombre}</h3>
                        <img src={producto.image} alt={producto.nombre} onClick={() => handleOpen(producto._id)} className='card-image-product' />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div id="container" style={{padding:"100px"}}>
            <AppBar position="fixed"  style={{ backgroundColor: "#000", color: '#fff' }}>
                <Toolbar>
                    <div style={{ display: 'flex', flexGrow: 1}}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <img src={image.logo2} alt="image" style={{ width: "70px", height: "60px"}} />
                        </Link>
                    </div>
                    <Box sx={{ display: "flex", gap:"20px", flexGrow: 0}}>
                        <Button sx={{backgroundColor:"black" , color:"white"}}>
                            <Link to="/Suscribirse" style={{textDecoration:"none", color:"white"}}>Suscribirse</Link>
                        </Button>
                        <Tooltip title="Open settings" >
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle sx={{ width: 32, height: 32, color: "white" }}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ marginTop: "40px"}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {Object.keys(settings).map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Link to={`/${setting}`} style={{textDecoration:"none", color:"black"}}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <div id="categories" style={{ marginTop: "50px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>Categorias</h1>
                <div id="categories-list" style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                    {data.map((categoria, index) => (
                        <Button key={index} onClick={() => setSelectedCategoria(categoria)}>
                            <Avatar sx={{ width: 140, height: 140 }} style={{ backgroundColor: "#000", color: '#fff', fontSize:'0.9rem' }}>
                                {categoria.nombre}
                            </Avatar>
                        </Button>
                    ))}
                    <Button key="todos" onClick={() => setSelectedCategoria(null)}>
                        <Avatar sx={{ width: 140, height: 140 }} style={{ backgroundColor: "#000", color: '#fff' }}>
                                Mostrar todos
                        </Avatar>
                    </Button>
                </div>
            </div>
            <div id="products" style={{marginTop: "50px"}}>
                <ProductosList />
                <div className="product-select">
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Grid container spacing={2}>
                            <Box sx={style}>
                                <Grid item xs={2} sm={4} md={6}>
                                    <img src={selectedProducto?.image} alt={selectedProducto?.nombre} style={{ width: "100%", margin: "0" }} />
                                </Grid>
                                <Grid item xs={10} sm={8} md={6}>
                                    <div className="product-information">
                                        
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            <p>Nombre: <strong>{selectedProducto?.nombre}</strong></p>
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <p>Cantidad: <strong>{selectedProducto?.cantidad}</strong> </p>
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <p>Precio: <strong>{selectedProducto?.precio.$numberDecimal}</strong> </p>
                                        </Typography>
                                    </div>
                                </Grid>
                            </Box>
                        </Grid>
                    </Modal>
                </div>
            </div>
        </div >
    )
}