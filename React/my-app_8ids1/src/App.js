import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import PacienteComponent from './components/PacienteComponent';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import CrearPaciente from './components/CrearPaciente';

function App() {    
  
  const [token, setToken] = useState(null);

  useEffect(()=>{
    console.log('Render');
        setToken(secureLocalStorage.getItem('token'));
  },[]);

return (
  <Routes>
      <Route path="/" element={<LoginComponent />}/>
      <Route path="/home" element={token == null ? <LoginComponent /> :<HomeComponent />}/>
      <Route path="/paciente/nuevo" element={token == null ? <LoginComponent /> :<PacienteComponent />}/>
      <Route path="/paciente/editar" element={token == null ? <LoginComponent /> :<PacienteComponent />}/>
      <Route path="/paciente/crear" element={token == null ? <LoginComponent /> :<CrearPaciente />}/>
  </Routes>

);
}
export default App;
