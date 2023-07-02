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

const CrearPaciente = () => {

    const [paciente,setPaciente] = useState ('')
       const [ nombre, setnombre] = useState(0)
       const [ edad, setedad] = useState(0)
       const [ nss, setnss] = useState(0)
       const [ domicilio, setdomicilio] = useState(0)
        const navigate = useNavigate()

      const fnCrear = async (e) => {
        e.preventDefault()
        await axios.post("http://127.0.0.1:8000/api/paciente/crear", 
        {nombre: nombre,edad: edad,nss: nss,domicilio: domicilio})
        navigate('/home')
        console.log()
      }

  return (
    <div align="center" className='d-grid gap-2'>
        <Box sx={{  height: 'auto', width: 'auto', marginTop:2, padding:2, border:1}}>
        <h3>Crear usuario</h3>
        <form onSubmit={fnCrear}>
            <div className='mb-3'>
            <Box sx={{  width:600 ,margin:2, padding:0}}>
            <TextField name='nombre' id="outlined-basic" label="nombre" variant="outlined" 
            onChange={(e)=> setnombre (e.target.value)}
            type='text'
            className='formControl'/>
                </Box>
            </div>
            <div className='mb-3'>
            <Box sx={{  width:600 ,margin:2, padding:0}}>
            <TextField id="outlined-basic" label="edad" variant="outlined" 
            onChange={(e)=> setedad (e.target.value)}
                type='number'
                className='formControl' />
                </Box>
            </div>
            <div className='mb-3'>
            <Box sx={{  width:600 ,margin:2, padding:0}}>
            <TextField name='nss' id="outlined-basic" label="nss" variant="outlined"
            onChange={(e)=> setnss (e.target.value)}
            type='number'
            className='formControl' />
                </Box>
            </div>
            <div className='mb-3'>
            <Box sx={{  width:600 ,margin:2, padding:0}}>
            <TextField name='domicilio' id="outlined-basic" label="domicilio" variant="outlined"
             onChange={(e)=> setdomicilio (e.target.value)}
             type='text'
             className='formControl'/>
                </Box>
            </div>

            <Button type='submit' className='btn btn-succes' variant="contained" color="primary"
                    sx={{ border:0,fontSize: 20}}>Guardar</Button>
        </form>
        </Box>
    </div>
  )
}

export default CrearPaciente