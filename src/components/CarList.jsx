import { useState, useEffect } from 'react'
import { fetchCars, deleteCar } from '../carapi';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    const [colDefs, setColDefs] = useState([
        { field: "brand", filter: true },
        { field: "model", filter: true, width: 150 },
        { field: "color", filter: true, width: 130 },
        { field: "fuel", filter: true, width: 150 },
        { headerName: "Year", field: "modelYear", filter: true, width: 120 },
        { field: "price", filter: true, width: 150 },
        {
            cellRenderer: params => <EditCar handleFetch={handleFetch} data={params.data} />,
            width: 120
        },
        {
            cellRenderer: params => <Button color="error" size="small" onClick={() => handleDelete(params.data._links.self.href)}>Delete</Button>,
            width: 120
        },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCars()
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))
    }

    const handleDelete = (url) => {
        if (window.confirm("Are you sure?")) {
            deleteCar(url)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <>
            <AddCar handleFetch={handleFetch} />
            <div className="ag-theme-material" style={{ height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
        </>
    )
}

export default CarList;