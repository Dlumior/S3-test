import React from "react";
//import MaterialTable from "material-table";
import JMaterialTableSpanishSSJ from "jinssj-mat-table-spanish-noeditable";


function Tabla(props) {
    return (  
      <JMaterialTableSpanishSSJ
        title="Citas pasadas"
        columns={props.tutores.columns}
        data={props.tutores.data}
        agrupar
      /> 
    
      /**
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
       */
    
      
    );
  }
export default Tabla;
