import React,{useState,useEffect} from "react";
//import useFetchData from "../../Conexion/useFetchData";
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
      flexDirection: "row",
      alignItems: "left",
      backgroundImage: "",
    },
    paper2: {
      marginTop: "1%",
      marginLeft: "3%",
      marginRight:"3%",
      display: "flex",
      flexDirection: "row",
      alignItems: "left",
      backgroundImage: "",
    }
  };
const FrmResultados = () => {
    return (
        <div>
          <Paper elevation={0} style={style.paper}>
              Resultados
          </Paper>
          
        </div>
    );
  }
  
  export default FrmResultados;
  