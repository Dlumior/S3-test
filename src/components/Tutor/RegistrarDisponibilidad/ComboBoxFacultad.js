import React, { Component } from "react";
import { getUser } from "../../../Sesion/Sesion";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { LooksOne } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     marginTop: theme.spacing(1),
//   },
//   formControl: {
//     // margin: theme.spacing(1),
//     minWidth: "100%",
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const Programas = [
//   { id: 1, nombre: "Programa Tipo1" },
//   { id: 2, nombre: "Programa Tipo2" },
//   { id: 3, nombre: "Programa Tipo3" },
// ];

class ComboBoxFacultad extends Component {
    constructor(){
        super();
        this.state = {}
    }
    handleChangeFacultad = (event) => { 
        this.props.empezarCarga();  
        let alerta = {...this.props.alerta};
        alerta.mostrar = false;
        this.props.setAlerta(alerta);     
        this.props.setFacultad(event.target.value);
        this.props.actualizarBandera();
    };


    render() {
        return (
            <>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                label={this.props.facultad}
                id="demo-simple-select"                
                value={this.props.facultad}
                defaultValue = {this.props.facultad}
                onChange={this.handleChangeFacultad}
                >
                {this.props.facultades.map((item) => (
                    <MenuItem key={item.FACULTAD.ID_PROGRAMA} value={item.FACULTAD.ID_PROGRAMA} >
                    {item.FACULTAD.NOMBRE}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </>
        );
    }
};

export default ComboBoxFacultad;
