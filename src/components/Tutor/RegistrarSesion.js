import React from "react";
import * as Conexion from "./../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles,Typography } from "@material-ui/core";


const RegistrarSesion = () => {
  const [datosForm, setDatosForm] = React.useState({
    proceso:0,
    alumno:0,
    fecha:0,
    horaini:0,
    horafin:0,
    resultado:0
  });
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      CONTRASENHA: datosForm.nombre + datosForm.APELLIDOS,
    });
  };

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>
        Registrar Sesión
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5">Registar Sesion</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md
              container
              direction="column"
              alignItems="flex-start"
              justify="center" >
              <Typography variant="subtitle1">Alumno:Mauricio Gonzales </Typography>
              <Typography variant="subtitle1">Fecha: Viernes 27 de Julio del 2020 </Typography>
              <Typography variant="subtitle1">Hora:13:00 - 14:00</Typography>            
            {/*
            <Grid item md={4}>
                <Button 
                variant="outlined"
                color="primary">
                Derivar
                </Button>
            </Grid>*/}
             
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={handleClose} color="primary">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RegistrarSesion;
