import React from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
//import { Button } from "@material-ui/core";

function Tabla(props) {
    //const [state, setState] = React.useState(data);  //ya no uso el state de material
    //ahora usamos props
    return (   
      <Grid md={15} contained>
        <MaterialTable
        //title={props.titulo}
        //title=""
        //columns={state.columns}
        //data={state.data}

        title=""
        columns={props.tutores.columns}
        data={props.tutores.data}
       
      />

      </Grid>   
      
    );
  }
export default Tabla;
