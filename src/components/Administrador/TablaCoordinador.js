import React from "react";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";

const data = {
  columns: [
    {
      title: "Nombre",
      field: "nombre",
    },
    
    {
      title: "",
      render: (rowData) => (
        <Button 
          variant="contained"
          color="primary">
          Ver Coordinador
        </Button>
      ),
    },
    // { title: "Coordinador", field: "coordinador" },
  ],
  data: [
    { nombre: "Guillermo Orellana" },
    { nombre: "Cristobal Colon" },
  ],
};


function Tabla(props) {
    const [state, setState] = React.useState(data);
  
    return (
      
      <MaterialTable
        title={props.titulo}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    );
  }

export default Tabla;
