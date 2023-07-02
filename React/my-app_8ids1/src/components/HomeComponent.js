import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {

const actions = [
  { icon: <FileCopyIcon />, name: 'Nuevo', key: 'nuevo' },
  
];

const handleFunction = (e, key) => {
  e.preventDefault()
if(key === "save"){
 console.log("guardado")
 navigate("/paciente/crear");
} else {}
  console.log("Presiono boton " + key)
}

const navigate = useNavigate();

const handleRowClick = (params) => {
  console.log('ID: ' + params.row.id)
  console.log('Nombre: ' + params.row.nombre)
  navigate('/paciente/nuevo',{
      state: {
        id: params.row.id,
        nombre: params.row.nombre
      }
  })
}

const fnNuevo = (params) => {
  navigate('/paciente/crear',{

  })
}

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'nss', headerName: 'NSS', width: 130 },
    {
      field: 'edad',
      headerName: 'Edad',
      type: 'number',
      width: 90,
    },
    {
      field: 'domicilio',
      headerName: 'Domicilio',
      description: 'No se podra reordenar',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.domicilio}`,
    },
  ];

  const getData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/pacientes').then((response) => {
        console.log(response.data);
        setRows(response.data);
    });
  }

  const [rows, setRows] = useState([]);


  useEffect(()=>{
    console.log('Render');
        getData();
  },[]);


  return (
    <div align="center">
      
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={
              (e) => {
                fnNuevo(e, action.key)
              }
            }
          />
        ))}
      </SpeedDial>

      <DataGrid
    rows={rows}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 5 },
      },
    }}
    pageSizeOptions={[5, 10]}
    onRowClick={handleRowClick}
  />
  </div>
  )
}

export default HomeComponent