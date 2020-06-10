import React, { Component, useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import ListaProgramas from "../../Coordinador/ListaProgramas";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { GET } from "../../../Conexion/Controller";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Programas from "../../../pages/Coordinador/Programas";

import errorObj from "../../Coordinador/FormRegistroTutor/errorObj";
import validateName from "../../Coordinador/FormRegistroTutor/validateName.js";

const useStyles = makeStyles((theme) => ({
  foto: {
    backgroundImage:
      "url(https://pps.whatsapp.net/v/t61.24694-24/97969579_3102912936463371_7208379054937379558_n.jpg?oe=5EC495F5&oh=68e4ca58a0f65f680df95105f6ba41ae)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    alignItems:"center",
    padding: theme.spacing(5),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const handleName = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      NOMBRE: e.target.value,
    });
    const res = validateName(e.target.value);
    setErrors({ ...errors, name: res });
};



const RegistrarProgramas = () => {
  const [datosForm, setDatosForm] = React.useState({
    ID_FACULTAD:"13",
    ID_PROGRAMA:"",
    ID_INSTITUCION:"1",
    NOMBRE: "",
    IMAGEN: null
  });
  const [errors, setErrors] = useState(errorObj);  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSelected = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = async (e, datosForm, setDatosForm) => {
    if (
      errors.name.error 
    ) {
      alert("El nombre es inválido, ingrese nuevamente");
      return;
    } else {
      setDatosForm({
        ...datosForm
      });
      console.log(datosForm);

      const props = { servicio: "/api/programa", request: {programa: datosForm} };
      console.log("saving new prog in DB:",   );
      let nuevoProg = await Conexion.POST(props);
      console.log("got updated prog from back:", nuevoProg);
      /*
      //para relacionarlo con el coordinador:
      const props = { servicio: "/api/programa", request: {programa: datosForm} };
      console.log("saving new prog in DB:", datosForm);
      let nuevoProg = await Conexion.POST(props);
      console.log("got updated prog from back:", nuevoProg);
      */
      if (nuevoProg){      
        alert("Se registro Programa",nuevoProg.NOMBRE);
        setOpen(false);
        return(
          <div>
            <Programas/>
          </div>
        );
      }

    }  
  };

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>
        Registrar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Formulario de registro de Programa
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} sm container>
            <Grid item xs container direction="column" justify={"center"} spacing={2}>
              <Grid item xs>
                <TextField
                  required
                  error={errors.name.error}
                  margin="dense"
                  id="NOMBRE"
                  label="Nombre"
                  fullWidth
                  onChange={(e) => handleName(e, datosForm, setDatosForm, errors, setErrors)}
                  helperText={errors.name.mesage}
                />
              </Grid>
            </Grid>
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
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
            color="primary"
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RegistrarProgramas;
