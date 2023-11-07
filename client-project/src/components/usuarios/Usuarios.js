import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Fade,InputLabel, Select,Checkbox,FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';

export const Usuarios = () => {

    const [formData, setFormData] = useState({
        permisos: false,
        rol:'usuario',
        estado: false,
    });

    const [selectedUsuarioId,setSelectedUsuarioId] = useState(null)

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 250 },
        { field: 'apellido', headerName: 'Apellido', width: 160 },
        { field: 'telefono', headerName: 'Telefono', width: 160 },
        { field: 'email', headerName: 'Correo', width: 160 },
        { field: 'rol', headerName: 'Rol', width: 160 },
        { field: 'estado', headerName: 'Estado', width: 160 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 350,
            renderCell: (params) => (
                <div>
                    <Button variant="outlined" color="primary"  onClick={() => editBtn(params.row._id)}>
                        Editar Usuario
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => canBtn(params.row._id)}>
                        Finalizar Contrato
                    </Button>
                </div>
            ),
        },
    ];

    const [usuarios,setUsuarios]= useState([]);
    useEffect (()=>{
        fetch('http://localhost:3000/api/v1/usuarios')
            .then((response) => response.json())
            .then((data) =>{
                setUsuarios(data);
            })
            .catch((error)=>{
                console.error({message:error.message})
            })
    }, []);
    
    const[openModalEditar,setOpenModalEditar]=useState(false);
    const handleOpenModalEditar = () => {
        setOpenModalEditar(true);
    };
    const handleCloseModalEditar = () => {
        setOpenModalEditar(false);
    };

    const handleAccept = async ()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/v1/usuarios/${selectedUsuarioId}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                
            });
            if (response.ok) {
                fetch('http://localhost:3000/api/v1/usuarios')
                .then((response) => response.json())
                .then((data) => {
                    setUsuarios(data);
                })
                .catch((error) => {
                    console.error({mesagge:error.mesagge});
                });
                handleCloseModalEditar()
            } else {
                console.error(response.status);
            }
        } catch (error) {
            console.error({mesagge:error.mesagge});
        }
    }

    const handleCancel = async ()=>{
        handleCloseModalEditar()
    }

    const editBtn = (id) => {
        setSelectedUsuarioId(id);
        const selectedU= usuarios.find((usuario) => usuario._id === id);

        if (selectedU) {
            setFormData({
                permisos: selectedU.permisos,
                rol: selectedU.rol,
                estado: selectedU.estado,
            })
        }

        handleOpenModalEditar();
    };

    const canBtn = async (id) => {

        setSelectedUsuarioId(id);
        const selectedU= usuarios.find((usuario) => usuario._id === id);

        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/usuarios/${selectedU._id}`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        permisos : false,
                        estado: false,
                    }),
                
                });
                if (response.ok) {
                    fetch('http://localhost:3000/api/v1/usuarios')
                    .then((response) => response.json())
                    .then((data) => {
                        setUsuarios(data);
                    })
                    .catch((error) => {
                        console.error({mesagge:error.mesagge});
                    });
                    handleCloseModalEditar()
                } else {
                    console.error(response.status);
                }
                console.log(selectedU)
            } catch (error) {
                console.error({mesagge:error.mesagge});
            }
        }
        
    }
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <div>
            <h1>Usuarios</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={usuarios}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row._id}
                />
            </div>
            <div>
            <Modal
                open={openModalEditar}
                onClose={handleCloseModalEditar}
                closeAfterTransition
            >
                <Fade in={openModalEditar}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ backgroundColor: '#fff', padding: '20px', width: '400px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                            <form>
                                <InputLabel>Estado del usuario</InputLabel>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.estado}
                                            onChange={handleFormChange}
                                            name="estado"
                                            color="primary"
                                        />
                                    }
                                    label="Estado"
                                    style={{ marginBottom: '20px' }}
                                />
                                
                                <InputLabel>Permisos del usuario</InputLabel>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.permisos}
                                            onChange={handleFormChange}
                                            name="permisos"
                                            color="primary"
                                        />
                                    }
                                    label="Permisos"
                                    style={{ marginBottom: '20px' }}
                                />
                                <InputLabel>Rol</InputLabel>
                                <Select
                                    name="rol"
                                    value={formData.rol}
                                    fullWidth
                                    style={{ marginBottom: '20px' }}
                                    onChange={handleFormChange}
                                    native
                                >
                                    <option value="administrador">Administrador</option>
                                    <option value="secretario">Secretario</option>
                                    <option value="usuario">Usuario</option>
                                </Select>
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

            </div>
        </div >
    )
}
