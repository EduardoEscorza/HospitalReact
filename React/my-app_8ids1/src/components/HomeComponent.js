import React from 'react'
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
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const getData = async () => {
    const response = await axios.get('').then((response) => {
        console.log(response.data);
    });
  }

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

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