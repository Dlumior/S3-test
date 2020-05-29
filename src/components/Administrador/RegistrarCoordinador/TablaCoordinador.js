import React from "react";
import MaterialTable from "material-table";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    fontsize:18,
  }
});

function Tabla(props) {
  const classes = useStyles();

    return (      
      <MaterialTable 
        //className={classes.table} 
        title=""
        columns={props.coordinadores.columns}
        data={props.coordinadores.data}
       
      />
    );
  }
export default Tabla;
