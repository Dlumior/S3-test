import React from "react";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";

const data = {
  columns: [
    {
      title: "Facultad",
      field: "facultad",
    },
   
    {
      title: "",
      render: (rowData) => (
        <Button color="primary" variant="outlined">
          Ver Facultad
        </Button>
      ),
    },
    // { title: "Coordinador", field: "coordinador" },
  ],
  data: [
    { facultad: "Facultad de Ciencias e Ingeniería" },
    { facultad: "Estudios Generales Ciencias" },
  ],
};

export default function Tabla() {
  const [state, setState] = React.useState(data);

  return (
    <MaterialTable
      title="Facultades"
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
