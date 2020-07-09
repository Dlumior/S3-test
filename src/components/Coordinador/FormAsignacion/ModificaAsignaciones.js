import React, { Component, useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";  
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { GET } from "../../../Conexion/Controller";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Alertas from "../../Coordinador/Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import ModificaListaAlumnos from "./ModificaListaAlumnos";


const ModificaAsignaciones = (props) => {
  const {open,close,alumnos}=props;
  const [datosForm, setDatosForm] = React.useState({
    ID:"",
    CODIGO: "",
    NOMBRE: "",
    APELLIDOS: "",
    CORREO: "",
    TELEFONO: "",
    USUARIO: "",
    DIRECCION: "",
    IMAGEN: null,
    FACULTAD:[],
  });    


  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          <Grid container md={12}>
            <Grid item md={12} >
              Alumnos:
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container md={12}> 
            <ModificaListaAlumnos alumnos={alumnos}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            onClick={close}
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModificaAsignaciones;