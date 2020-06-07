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

const style = {
  paper: {
    marginTop: "4%",
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: "5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundImage: "",
  },
  paperitem: {
      marginTop: "2%",
      marginLeft: "4%",
    },
    foto: {
      marginTop: "2%",
      marginLeft: "4%",
      marginTop: "4%",
      flexDirection: "row",
      alignItems: "center",
      backgroundImage: "",
    }
};

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
          <Paper elevation={0} style={style.paper}>
          <Grid container md={12} spacing={3}>
            <Grid item md={12}
              container
              justify="center" >
              <TextField
                  required
                  margin="dense"
                  id="alumno"
                  label="Alumno"
                  fullWidth   
              />
            </Grid>
            <Grid item md={12}
              container
              justify="center" >
              <TextField
                  required
                  margin="dense"
                  id="Fecha"
                  label="Fecha"
                  fullWidth   
              />
            </Grid>
            <Grid item md={12}
              container
              justify="center" >
              <TextField
                  required
                  margin="dense"
                  id="Hora"
                  label="Hora"
                  fullWidth   
              />
            </Grid>
            <Grid item md={12} justify="center" >
                <Paper elevation={0} style={style.paperitem}>
                    <Typography variant="h6">
                        Plan de Acción
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={12}
              container
              justify="center" >
              <TextField
                  multiline
                  rows={5}
                  id="plan"
                  label="Descripción"
                  variant="outlined"
                  fullWidth   
              />
            </Grid>
            <Grid item md={12} justify="center" >
                <Paper elevation={0} style={style.paperitem}>
                    <Typography variant="h6">
                        Resultados
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={12}
              container
              justify="center" >
              <TextField
                  multiline
                  rows={5}
                  id="res"
                  label="Descripción"
                  variant="outlined"
                  fullWidth   
              />
            </Grid>
          </Grid>
          </Paper>
          
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
