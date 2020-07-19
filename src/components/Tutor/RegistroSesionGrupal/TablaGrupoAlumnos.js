import React from "react";
import MaterialTable from "material-table";

function TablaGrupoAlumnos(props) {
  //const [state, setState] = React.useState(data);  //ya no uso el state de material
  //ahora usamos props
  return (
    <MaterialTable
      //title={props.titulo}
      //title=""
      //columns={state.columns}
      //data={state.data}

      title=""
      columns={props.columns}
      data={props.data}
      options={{
        rowStyle: {
          backgroundColor: "#FFF",
        },
        headerStyle: {
          backgroundColor: "#3AAFA9",
          color: "#FFF",
          fontSize: 20,
        },
      }}
    />
  );
}
export default TablaGrupoAlumnos;
