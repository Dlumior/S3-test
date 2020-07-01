import React from "react";
import MaterialTable from "material-table";
//import { Button } from "@material-ui/core";

function TableTutores(props) {
  const { columnas, datos } = props;
  return (
    <MaterialTable
      title=""
      columns={columnas}
      data={datos}
      options={{
        rowStyle: {
          backgroundColor: "#FFF",
        },
        headerStyle: {
          backgroundColor: "#3AAFA9",
          color: "#FFF",
          fontSize: 14,
        },
      }}
    />
  );
}
export default TableTutores;
