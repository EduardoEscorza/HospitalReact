import logo from './logo.svg';
import './App.css';
import Login_Component from './components/Login_Component';
import HomeComponent from './components/HomeComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

function App() {    
  
  const [token, setToken] = useState(null);

  useEffect(()=>{
    console.log('Render');
        setToken(secureLocalStorage.getItem('token'));
  },[]);

return (
  <Routes>
      <Route path="/" element={<Login_Component />}/>
      <Route path="/home" element={token == null ? <Login_Component /> :<HomeComponent />}/>
  </Routes>

);
}
export default App;
