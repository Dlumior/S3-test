import React from "react";
import MaterialTable from "material-table";

function Tabla(props) {
    //const [state, setState] = React.useState(data);  //ya no uso el state de material
    //ahora usamos props
    return (      
      <MaterialTable
        //title={props.titulo}
        //title=""
        //columns={state.columns}
        //data={state.data}

        title=""
        columns={props.tutores.columns}
        data={props.tutores.data}
       
        options={{
          rowStyle: {
             backgroundColor: '#E0E0E0FF',
           },
           headerStyle: {
            backgroundColor: '#3AAFA9',
            color: '#FFF',
            fontSize: 20
          },
        }}
      />
    );
  }
export default Tabla;
