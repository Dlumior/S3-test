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

const RegistrarFacultad = () => {
  const [datosForm, setDatosForm] = React.useState({
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

      const props = { servicio: "/api/facultad", request: {facultad: datosForm} };
      console.log("saving new coord in DB:", datosForm);
      let nuevaFacu = await Conexion.POST(props);
      console.log("got updated coord from back:", nuevaFacu);

      if (nuevaFacu){      
        alert("Se registro Facultad",nuevaFacu.NOMBRE);
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
          Formulario de registro de Facultad
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
            <Grid item>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel 
                  value="end" 
                  control={<Radio color="primary" />} 
                  label="Facultad Independiente" 
                  onChange={handleChangeSelected}/>
              </RadioGroup>
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
export default RegistrarFacultad;
