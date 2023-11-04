import React, { useState } from 'react';
import { image } from '../../assets/index';
import { Box, Chip, Grid, IconButton, Modal, Typography } from '@mui/material';
import './Clients.scss';
import DeleteIcon from '@mui/icons-material/Delete';

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

const clients = [
    { id: 1, clientName: "Client 1", avatar: image.avatar1, description: "Descripcion", clientType: "Free" },
    { id: 2, clientName: "Client 2", avatar: image.avatar2, description: "Descripcion", clientType: "Premiun" },
    { id: 3, clientName: "Client 3", avatar: image.avatar3, description: "Descripcion", clientType: "Free" },
]
export const Clients = () => {
    const [open, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);


    const handleOpen = (clientId) => {
        const client = clients.find((client) => client.id === clientId);
        console.log(clientId);
        setOpen(true);
        console.log(client);
        setSelectedClient(client);
    }
    return (
        <div>
            <h1>Clientes</h1>
            <div className="clients-list">
                {clients.map((client) => (
                    <div className="card-client">
                        <h3 className='card-title-client'>{client.clientName}</h3>
                        <img src={client.avatar} alt={client.clientName} onClick={() => handleOpen(client.id)} className='card-image-client' />
                        {client.clientType === 'Free' ? <Chip label={client.clientType} color="primary" /> : <Chip label={client.clientType} color="success" />}
                        <IconButton arial-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                ))}
            </div>
            <div className="client-select">
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid container spacing={2}>
                        <Box sx={style}>

                            <Grid item xs={2} sm={4} md={6}>
                                <img src={selectedClient?.avatar} alt={selectedClient?.className} style={{ width: "100%", margin: "0" }} />
                            </Grid>
                            <Grid item xs={10} sm={8} md={6}>
                                <div className="client-information">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {selectedClient?.clientName}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {selectedClient?.description}
                                    </Typography>
                                </div>
                            </Grid>

                        </Box>
                    </Grid>
                </Modal>
            </div>
        </div >
    )
}
