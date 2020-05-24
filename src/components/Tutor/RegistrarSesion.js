import React from "react";
import * as Conexion from "./../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles } from "@material-ui/core";


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
            Registrar Sesión
        </DialogTitle>
        <DialogContent>
          <Grid container xs={12}>
            <Grid item xs={8}>
                Alumno: Ignacio Barraza Gonzales
            <Grid/>
            <Grid item xs={4}>
                <Button 
                variant="outlined"
                color="primary">
                Derivar
                </Button>
            </Grid>
              <TextField
                autoFocus
                margin="dense"
                id="NOMBRE"
                label="Nombre"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="APELLIDOS"
                label="Apellidos"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="CORREO"
                label="Correo electrónico"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="TELEFONO"
                label="Teléfono"
                fullWidth
              />
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
