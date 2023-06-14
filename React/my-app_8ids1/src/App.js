import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
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
      <Route path="/" element={<LoginComponent />}/>
      <Route path="/home" element={token == null ? <LoginComponent /> :<HomeComponent />}/>
  </Routes>

);
}
export default App;
