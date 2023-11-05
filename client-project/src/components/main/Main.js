import React, { useState } from 'react';
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
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DeleteIcon from '@mui/icons-material/Delete';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletIcon from '@mui/icons-material/Tablet';
import { AccountCircle } from '@mui/icons-material';

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

const settings = ['Perfil', 'Cuenta', 'Dashboard', 'Cerrar sesión'];

const main = [
    { id: 1, productName: "Producto 1", avatar: image.pc, description: "Descripcion", productType: "Free" },
    { id: 2, productName: "Producto 2", avatar: image.phone, description: "Descripcion", productType: "Premium" },
    { id: 3, productName: "Producto 3", avatar: image.tablet, description: "Descripcion", productType: "Free" },
    { id: 4, productName: "Producto 4", avatar: image.pc, description: "Descripcion", productType: "Free" },
    { id: 5, productName: "Producto 5", avatar: image.pc, description: "Descripcion", productType: "Free" },
]

export const Main = () => {
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
    const [selectedMain, setSelectedMain] = useState(null);



    const handleOpen = (mainId) => {
        const mains = main.find((main) => main.id === mainId);
        console.log(mainId);
        setOpen(true);
        console.log(mains);
        setSelectedMain(mains);
    }
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#000", color: '#fff' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                            <MenuIcon />
                            </IconButton>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        
                        <Box sx={{ flexGrow: 0}} >
                            <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar style={{ backgroundColor: "#000", color: '#fff' }}>
                                    <AccountCircle />
                                </Avatar>
                            </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div id="categories">
                <h1 style={{display:"flex", justifyContent: "center"}}>Categorias</h1>
                <div id="categories-list" style={{display: "flex" , gap: "15px" , justifyContent: "center"}}>
                <Avatar sx={{ width:200, height:200}} style={{ backgroundColor: "#000", color: '#fff' }}>
                    <ComputerIcon sx={{ width:100, height:100}}/>
                </Avatar>
                <Avatar sx={{ width: 200, height: 200 }} style={{ backgroundColor: "#000", color: '#fff' }}>
                    <PhoneIphoneIcon sx={{ width:100, height:100}}/>
                </Avatar>
                <Avatar sx={{ width: 200, height: 200 }} style={{ backgroundColor: "#000", color: '#fff' }}>
                    <TabletIcon sx={{ width:100, height:100}}/>
                </Avatar>
                </div>
            </div>
            <div id="products">
                <h1 style={{display:"flex", justifyContent: "center"}}>Productos</h1>
                <div className="products-list">
                    {main.map((main) => (
                        <div className="card-product">
                            <h3 className='card-title-product'>{main.productName}</h3>
                            <img src={main.avatar} alt={main.productName} onClick={() => handleOpen(main.id)} className='card-image-product' />
                            {main.productType === 'Free' ? <Chip label={main.productType} color="primary" /> : <Chip label={main.productType} color="success" />}
                            <IconButton arial-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    ))}
                </div>
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
                                    <img src={selectedMain?.avatar} alt={selectedMain?.className} style={{ width: "100%", margin: "0" }} />
                                </Grid>
                                <Grid item xs={10} sm={8} md={6}>
                                    <div className="product-information">
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {selectedMain?.clientName}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            {selectedMain?.description}
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