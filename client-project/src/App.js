import React, { useState } from 'react';
import {Clients} from './components/clients/Clients';
import { Main } from './components/main/Main';
import {Button} from '@mui/material';

const App = () => {
  //JS
  const [saludo,setSaludo]= useState("Hello World");
  
  const handleSaludo =() => {
    setSaludo ('Majho');
  }
  return (
    <div>
      <Main />
    </div>

  )
}

export default App
