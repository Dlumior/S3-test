import React from "react";
import JMaterialTableSpanishSSJ from "jinssj-mat-table-spanish-noeditable";
import Jloading from "../Coordinador/FormRegistroAlumno/Jloading";

function Tabla(props) {
    //const [state, setState] = React.useState(data);  //ya no uso el state de material
    //ahora usamos props
    if(!props.tutores){
      return <Jloading mensaje={"Cargando Tutores"} size={"lg"} base />;
    }else
    return (      
      <JMaterialTableSpanishSSJ
        //title={props.titulo}
        //title=""
        //columns={state.columns}
        //data={state.data}

        title=""
        columns={props.tutores.columns}
        data={props.tutores.data}
        exportar
        /*options={{
          rowStyle: {
             backgroundColor: '#FFF',
           },
           headerStyle: {
            backgroundColor: '#3AAFA9',
            color: '#FFF',
            fontSize: 16
          },
        }}*/
      />
    );
  }
export default Tabla;
