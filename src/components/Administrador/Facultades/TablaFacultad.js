import React from "react";
import MaterialTable from "material-table";
import { withStyles, makeStyles } from '@material-ui/core/styles';


function Tabla(props) {

    return (      
      <MaterialTable 
        //className={classes.table} 
        title=""
        columns={props.facultades.columns}
        data={props.facultades.data}
       
      />
    );
  }
export default Tabla;
