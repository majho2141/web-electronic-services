import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
// import {Clients} from './components/clients/Clients';
import { Suscription } from './components/suscriptions/Suscriptions';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Signin } from './components/signin/Signin';
import { Status } from './components/status/Status';
import { Admin } from './components/admin/Admin';
import { Productos } from './components/productos/Productos';
import {StatusUsers } from './components/status/StatusUsers';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/Suscribirse" element={<Suscription/>}/>
        <Route path="/Iniciar sesión" element={<Login/>}/>
        <Route path="/Registrarse" element={<Signin/>}/>
        <Route path="/Activación exitosa" element={<Status/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="/Productos" element={<Productos/>}/>
        <Route path="/StatusUsers" element={<StatusUsers/>}/>
      </Routes>
    </div>
  )
}

export default App
