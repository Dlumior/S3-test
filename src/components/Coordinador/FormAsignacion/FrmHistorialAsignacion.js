import React,{useState,useEffect} from "react";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import { Grid} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText} from "@material-ui/core";

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
const FrmHistorialAsignacion = () => {
const [datosForm, setDatosForm] = React.useState({
    usuarioCodigo:0,
    usuarioNombre:'',
});
  return (
      <div>
        <Paper elevation={0} style={style.paper}>
            Hola
        </Paper>
      </div>
  );
}

export default FrmHistorialAsignacion;

