import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

import * as Controller from "../../../Conexion/Controller";

const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight:"3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    }
  };


class FrmReporte extends React.Component {
  constructor() {
    super();
    this.state = {
    };

  }
  

render(){
    return (
        <div>
            <Paper elevation={0} style={style.paper}>
                Hola
            </Paper>
        </div>
    );
}

}

export default FrmReporte;

const estilo={
imagen:{
    width :"75%"
}
}
