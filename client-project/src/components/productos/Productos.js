import React, { useEffect, useState, useRef} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Backdrop, Fade, TextField, Checkbox, InputLabel, Select, MenuItem, FormControlLabel, AppBar, Toolbar,Box,Typography, IconButton,Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { image } from '../../assets';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircle from '@mui/icons-material/AccountCircle';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const settings = 'Cerrar Sesión';

export const Productos = () => {
    const fileInputRef = useRef();

    let [oldDiscount, setOldDiscount] = useState(0);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const [editMode, setEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);


    const handleEditClick = (id) => {
        setEditMode(true);
        setSelectedProductId(id);
        console.log(selectedProductId);

        const selectedProduct = productos.find((product) => product._id === id);
        if (selectedProduct) {
            console.log(selectedProduct);
            console.log(selectedProduct.descuento.toFixed(0));
            console.log(oldDiscount);
            setFormData({
                nombre: selectedProduct.nombre,
                precio: selectedProduct.precio.$numberDecimal,
                descuento: selectedProduct.descuento.toFixed(0),
                cantidad: selectedProduct.cantidad,
                disponibilidad: selectedProduct.disponibilidad,
                categoriaId: selectedProduct.categoriaId,
            });
            setOldDiscount(selectedProduct.descuento);
            console.log(oldDiscount);
        }
        
        handleOpenModal();
    }

    const sendMessage = (product) => {
        const response = fetch (`http://localhost:3100/api/v1/productos/send-message/${product}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }
        );

    }
            
    
    const handleDeleteClick = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            fetch(`http://localhost:3100/api/v1/productos/${id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(`Producto ${id} eliminado con éxito`);
                        fetch('http://localhost:3100/api/v1/productos')
                            .then((response) => response.json())
                            .then((data) => {
                                setProductos(data);
                            })
                            .catch((error) => {
                                console.error({mesagge:error.mesagge});
                            });
                    } else {
                        console.error(`Error al eliminar el producto`);
                    }
                })
                .catch((error) => {
                    console.error({mesagge:error.mesagge});
                });
        }
    };
    
    const [openModal, setOpenModal] = useState(false);
    const [openModalCategoria, setOpenModalCategoria] = useState(false);

    const [categorias, setCategorias] = useState([]);
    const [productos,setProductos] = useState([]);

    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descuento: '',
        cantidad: '',
        disponibilidad: true,
        categoriaId: '',
        photo:'',
    });

    useEffect(() => {
        fetch('http://localhost:3100/api/v1/categorias')

            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((error) => {
                console.error({mesagge:error.mesagge});
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3100/api/v1/productos')

            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
            })
            .catch((error) => {
                console.error({mesagge:error.mesagge});
            });
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === 'categoriaId') {
            const newValue = value === undefined ? '' : value;
            setFormData({
                ...formData,
                [name]: newValue,
            });
        }else if (name === 'photo') {
            const file = e.target.files ? e.target.files[0]: null;
            setSelectedImage(file);
            setFormData({
                ...formData,
                [name]: file,
            });
        } 
        else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };
    
    const handleAccept = async () => {
        const formDataData = new FormData();
        formDataData.append('nombre', formData.nombre);
        formDataData.append('precio', formData.precio);
        formDataData.append('descuento', formData.descuento);
        formDataData.append('cantidad', formData.cantidad);
        formDataData.append('disponibilidad', formData.disponibilidad);
        formDataData.append('photo', formData.photo);
        formDataData.append('categoriaId', formData.categoriaId);
        if (editMode) {
            try {                
                const response = await fetch(`http://localhost:3100/api/v1/productos/${selectedProductId}`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    
                });
                if (response.ok) {
                    fetch('http://localhost:3100/api/v1/productos')
                    .then((response) => response.json())
                    .then((data) => {
                        setProductos(data);
                    })
                    .catch((error) => {
                        console.error({mesagge:error.mesagge});
                    });
                    console.log(formData);
                    if (oldDiscount < formData.descuento / 100) {
                        console.log('Se ha enviado el mensaje');
                        console.log(formData);
                        sendMessage(formData);
                    }
                    handleCloseModal();
                } else {
                    console.error('Error al actualizar el producto');
                }
            } catch (error) {
                console.error({mesagge:error.mesagge});
            }
        } else {
            try {
                const response = await fetch('http://localhost:3100/api/v1/productos/new-pro', {
                    method: 'POST',
                    body: formDataData, 
                });
        
                if (response.ok) {
                    console.log('Producto creado con éxito');
                    handleCloseModal();
                    fetch('http://localhost:3100/api/v1/productos')
                        .then((response) => response.json())
                        .then((data) => {
                            setProductos(data);
                        })
                        .catch((error) => {
                            console.error({mesagge:error.mesagge});
                        });
                        console.log(formData.image);
                } else {
                    console.error('Error al crear el producto');
                }
            } catch (error) {
                console.error({mesagge:error.mesagge});
            }
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleCancel = () => {
        setEditMode(false);
        setSelectedProductId(null);
        handleCloseModal();
    };
    const [formDataCategoria, setFormDataCategoria] = useState({
        nombre: '',
        descripcion: '',
    });
    const handleOpenModalCategoria = () => {
        setOpenModalCategoria(true);
    };

    const handleCloseModalCategoria = () => {
        setOpenModalCategoria(false);
    };

    const handleFormChangeCategoria = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDataCategoria({
            ...formDataCategoria,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAcceptCategoria = async () => {
        try {
            const response = await fetch('http://localhost:3100/api/v1/categorias/new-ctg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataCategoria), 
            });

            if (response.ok) {
                console.log('Categoría creada con éxito');
                handleCloseModalCategoria();
                
                fetch('http://localhost:3100/api/v1/categorias')
                    .then((response) => response.json())
                    .then((data) => {
                        setCategorias(data);
                    })
                    .catch((error) => {
                        console.error({mesagge:error.mesagge});
                    });
            } else {
                console.error('Error al crear la categoría');
            }
        } catch (error) {
            console.error({mesagge:error.mesagge});
        }
    };
    

    const handleCancelCategoria = () => {
        handleCloseModalCategoria();
    };

    const columns = [
        { field: 'image', headerName: 'Image', width: 250 },
        { field: 'nombre', headerName: 'Nombre', width: 160 },
        { field: 'precio', headerName: 'Precio',valueGetter: (params) => params.row.precio.$numberDecimal, width: 160 },
        { field: 'descuento', headerName: 'Descuento', width: 160,valueGetter: (params) => params.row.descuento*100+'%'},
        { field: 'cantidad', headerName: 'Cantidad', width: 160 },
        {field: 'categoriaId',headerName: 'Categoria',width: 160,
            valueGetter: (params) => {
                const categoriaId = params.row.categoriaId; 
                const categoria = categorias.find(ctg => ctg._id === categoriaId); 
                return categoria ? categoria.nombre : 'Sin categoría';
            }
        },
        {
            headerName: 'Opciones',
            width: 250,
            renderCell: (params) => (
                <div>
                    <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row._id)}>
                        Editar
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteClick(params.row._id)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    

    return (
        
        <div>
            <div>
            <AppBar position="fixed"  style={{ backgroundColor: "#000", color: '#fff' }}>
                <Toolbar>
                    <div style={{ display: 'flex', flexGrow: 1}}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <img src={image.logo2} alt="logo" style={{ width: "70px", height: "60px"}} />
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
                            <MenuItem key={settings} onClick={handleCloseUserMenu}>
                                    <Link to="/" style={{textDecoration:"none", color:"black"}}>
                                        <Typography textAlign="center">{settings}</Typography>
                                    </Link>
                                </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            </div>
            <div style={{marginTop:"100px"}}>
                <Button variant="outlined" onClick={handleOpenModalCategoria} style={{ marginBottom: '10px' }}>
                    Crear nueva categoria
                </Button>
                <Button variant="outlined" onClick={handleOpenModal} style={{ marginBottom: '10px' }}>
                    Crear nuevo producto
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={productos}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row._id}
                />
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
            >
                <Fade in={openModal}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ backgroundColor: '#fff', padding: '20px', width: '400px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                            <h2>Producto</h2>
                            <form>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleFormChange}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                />
                                <TextField
                                    label="Precio"
                                    name="precio"
                                    type="number"
                                    value={formData.precio}
                                    onChange={handleFormChange}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                />
                                <InputLabel>Descuento</InputLabel>
                                <Select
                                    name="descuento"
                                    value={formData.descuento}
                                    onChange={handleFormChange}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                >
                                    {[...Array(7).keys()].map((i) => (
                                        <MenuItem key={i * 5} value={i * 5}>
                                            {i * 5}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    label="Cantidad"
                                    name="cantidad"
                                    type="number"
                                    value={formData.cantidad}
                                    onChange={handleFormChange}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.disponibilidad}
                                            onChange={handleFormChange}
                                            name="disponibilidad"
                                            color="primary"
                                        />
                                    }
                                    label="Disponibilidad"
                                    style={{ marginBottom: '20px' }}
                                />
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="categoriaId"
                                    value={formData.categoriaId}
                                    onChange={handleFormChange}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                    native
                                >
                                    <option value="">
                                        Selecciona una categoría
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option value={categoria._id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </Select>
                                <Button 
                                variant='contained'
                                component='label'
                                >
                                    imagen
                                    <input 
                                    type='file'
                                    hidden
                                    name='photo'
                                    onChange={handleFormChange}>
                                    
                                    </input>
                                </Button>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="outlined" color="primary" onClick={handleAccept}>
                                        Aceptar
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
            <Modal
                open={openModalCategoria}
                onClose={handleCloseModalCategoria}
                closeAfterTransition
            >
                <Fade in={openModalCategoria}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ backgroundColor: '#fff', padding: '20px', width: '400px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                            <h2>Crear Nueva categoria</h2>
                            <form>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={setFormDataCategoria.nombre}
                                    onChange={handleFormChangeCategoria}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                />
                                <TextField
                                    label="Descripcion"
                                    name="descripcion"
                                    value={setFormDataCategoria.descripcion}
                                    onChange={handleFormChangeCategoria}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="outlined" color="primary" onClick={handleAcceptCategoria}>
                                        Aceptar
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={handleCancelCategoria}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
            </div>
            
            

        </div>
    );
}