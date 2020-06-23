import React from "react";
import MaterialTable from "material-table";

function Tabla(props) {
    return (      
      <MaterialTable

        title=""
        columns={props.tutores.columns}
        data={props.tutores.data}
       
        options={{
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
