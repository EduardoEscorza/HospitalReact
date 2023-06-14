import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const HomeComponent = () => {

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
    <div>
      <DataGrid
    rows={rows}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 5 },
      },
    }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
  />
  </div>
  )
}

export default HomeComponent