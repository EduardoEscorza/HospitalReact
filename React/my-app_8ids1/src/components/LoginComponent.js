import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SvgIcon from '@mui/material/SvgIcon';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from 'react-router-dom';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

const LoginComponent = () => {
  const [dLogin, setDLogin] = useState({
    email: "",
    password: "",
  });

  const [errLogin, setErrLogin] = useState({
    visible: false,
    detalle: "",
  });

  const inputChange = (event)=>(
    setDLogin({
      ...dLogin,
      [event.target.name] : event.target.value, 
    })
  )

  const navigate = useNavigate();

  const fnLogin = async (e) => {
    e.preventDefault();

    console.log("Usuario: " + dLogin.email)
    console.log("Contraseña: " + dLogin.password)

    await axios
    .post("http://127.0.0.1:8000/api/login", dLogin)
    .then((response) => {
      console.log("Validando Acceso..");
      console.log(response.data);
      if (response.data.token !== "") {
        console.log("Ok");
        secureLocalStorage.setItem('token', response.data.token);
        navigate("/home");
      } 
      else 
      {
        console.log("Error" + response.data.error);  
      }
    }).catch((error) => {
      console.log("error2");
    })
  }

  return (

    <div className='principal'>
        <React.Fragment>
        <CssBaseline />
            <Container maxWidth="80%">
                <Box sx={{ bgcolor: '#cfe8fc', height: '500px', marginTop: 5, padding:5}}>
                <Card sx={{ maxWidth: 500,marginLeft: 50,marginTop: 1, paddingTop:5, border:1}}>
      <CardContent>
            <Box>
            <VpnKeyIcon color="primary" sx={{ fontSize: 60, marginLeft: 23}}/>
            </Box>
            <Box
            component="form"
            sx={{'& > :not(style)': { marginLeft: 15,marginTop: 5,marginBottom:3, width: '25ch',border:1},}}
            noValidate
            autoComplete="off">
            <TextField name='email' id="outlined-basic" 
            label="Username" 
            variant="outlined" value={dLogin.email} onChange={(e) => inputChange(e)}/>
            </Box>
            <Box
            component="form"
            sx={{'& > :not(style)': { marginLeft: 15,marginBottom:1, width: '25ch',border:1},}}
            noValidate
            autoComplete="off">
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name='password'
            autoComplete="current-password" value={dLogin.password} onChange={(e) => inputChange(e)}
            />
            </Box>
            </CardContent>
            <CardActions>
                <Box>
                    <Button onClick={fnLogin} variant="contained" color="success"
                    sx={{ marginLeft: 23,border:3,fontSize: 20}}>
                    Login
                    </Button>
                </Box>
            </CardActions>
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
            </Stack>
        </Card>
                </Box>
            </Container>
        </React.Fragment>

    </div>

  );
}

export default LoginComponent