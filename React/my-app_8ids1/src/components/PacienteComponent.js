
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';


function PacienteComponent() {

    const actions = [
        { icon: <DeleteIcon />, name: 'Eliminar', key: 'Borrar' },
        { icon: <SaveIcon />, name: 'Guardar', key: 'Guardar' },
        { icon: <FileCopyIcon />, name: 'Nuevo', key: 'Nuevo' },
          
        ];

      const [paciente,setPaciente] = useState({
        id: 0,
        nombre:'',
        edad: '',
        nss:'',
        doicilio:''
      })

      const navigate = useNavigate();
      
      const [loading, setLoading] = useState(false)

      const fnObtenerDatos = async() => {
        setLoading(true)
        await axios.get("http://127.0.0.1:8000/api/paciente", {
          params: {
            id: location.state.id
          }
        }).then((response) => {
      console.log(response.data)
      setPaciente(response.data)
      setLoading(false)
      })
      }

      useEffect(()=>{
        console.log('Render');
        if (location.state.id != 0){
          fnObtenerDatos();
        }
      },[]);
      
    const location = useLocation()

    const inputChange = (event) => (
      setPaciente({
        ...paciente,
        [event.target.name] : event.target.value, 
      })
    )
    
    const fnActualizar = async (e) => {
      e.preventDefault();
      console.log("Usuario: " + paciente.id)
      await axios
      .post("http://127.0.0.1:8000/api/paciente/actualizar", paciente)
      .then((response) => {
        console.log("Actualizando");
        console.log(response.data);
        if (response.data !== "") {
          console.log("Actualizado con exito");
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

    const fnEliminar = async (e) => {
      e.preventDefault();
      console.log("Usuario: " + paciente.id)
      await axios
      .post("http://127.0.0.1:8000/api/paciente/borrar", paciente)
      .then((response) => {
        console.log(response.data);
        if (response.data !== "") {
          console.log("Eliminado con exito");
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
    <div align="center" className='d-grid gap-2'>
        <div>
          {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /></Box> : ''}
          
          <Box sx={{  height: 'auto', width: 'auto', marginTop:2, padding:2, border:1}}>
          <h3>Actualizar Datos</h3>
          <div className='mb-3'>
              <Box sx={{  width:800 ,margin:2}}>
              <TextField name='nombre' id="outlined-basic" label="nombre" variant="outlined" value={paciente.nombre} onChange={(e) => inputChange(e)}/>
              </Box>
              </div>
            <div className='mb-3'>
              <Box sx={{  width:600 ,margin:2, padding:0}}>
              <TextField id="outlined-basic" label="nss" variant="outlined" value={paciente.nss} />
              </Box>
              </div>
            <div className='mb-3'>
              <Box sx={{  width:600 ,margin:2, padding:0}}>
              <TextField name='edad' id="outlined-basic" label="edad" variant="outlined" value={paciente.edad} onChange={(e) => inputChange(e)} />
              </Box>
              </div>
            <div className='mb-3'>
              <Box sx={{  width:600 ,margin:2, padding:0}}>
              <TextField name='domicilio' id="outlined-basic" label="domicilio" variant="outlined" value={paciente.domicilio}  onChange={(e) => inputChange(e)}/>
              </Box>
              </div>
              <Button  variant="contained" color="success" onClick={fnActualizar}
                    sx={{ border:0,fontSize: 20, margin:'2px'}}>Guardar</Button>
              <Button  variant="contained" color="primary" onClick={fnEliminar}
                    sx={{ border:0,fontSize: 20, margin:'2px'}}>Elmininar</Button>
          </Box>
        </div>
    </div>
    
  )
}

export default PacienteComponent