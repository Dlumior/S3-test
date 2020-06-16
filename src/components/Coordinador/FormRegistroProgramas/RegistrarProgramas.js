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
import ComboBoxFacu from "./ComboBoxFacus"
import errorObj from "../../Coordinador/FormRegistroTutor/errorObj";
import validateName from "../../Coordinador/FormRegistroTutor/validateName.js";
import Alertas from "../Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { getUser } from "../../../Sesion/Sesion";


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
    ID_INSTITUCION:"1",
    NOMBRE: "",
    IMAGEN: null
  });
  const [pDisabled, setPDisabled] = useState(true);
  const [errors, setErrors] = useState(errorObj);  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState([]);
  const [alerta, setAlerta]=useState({
    mensajeStrong: "",
    mensajeStrongError: "por favor revisalos!",
    mensajeStrongExito: "satisfactoriamente!",
    mensajeError: "Existen errores al completar el formulario",
    mensajeExito: "Programa registrado",
    mensaje: "",
  });
  const [severidad, setSeveridad] = useState({
    severidad:"",
    severW:"warning",
    severE:"error",
    severS:"success"
  });

  //facultades por coordinador
  useEffect(() => {
    async function fetchData() {
      console.log("idCoordinador: ",getUser().usuario.ID_USUARIO);
      const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("facultades:", res);
      setFacultades(res.facultades);
      console.log("facultades:", facultades);
    }
     fetchData();
  }, {});


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSeveridad({
      severidad:"",
    });     
    setAlerta({
      mensaje:"",
    });      
    console.log("severidad= ",severidad.severidad);
    //setOpen(false);
    
  };

  const handleChangeSelected = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = async (e, datosForm, setDatosForm) => {
    if (
      errors.name.error || datosForm.NOMBRE===''
    ) {
      setSeveridad({
        severidad:severidad.severE,
      });     
      setAlerta({
        mensaje:alerta.mensajeError,
      });      
      console.log("severidad= ",severidad.severidad);

      return;
    } else {
      console.log("id_facu",facultad);
      datosForm.ID_FACULTAD=facultad;
      setDatosForm({
        ...datosForm,
      });
      console.log(datosForm);

      const props = { servicio: "/api/programa", request: {programa: datosForm} };
      console.log("saving new prog in DB:",   );
      let nuevoProg = await Conexion.POST(props);
      console.log("got updated prog from back:", nuevoProg);
     if (nuevoProg){
      if (nuevoProg.registro.ok===1){
        if (nuevoProg){      
          setSeveridad({
            severidad:"success",
          });     
          setAlerta({
            mensaje:"Programa Registrado Satisfactoriamente",
          });      
          console.log("severidad= ",severidad.severidad);
          //setOpen(false);        
      }
    }else if(nuevoProg.registro.ok===0){
      setSeveridad({
        severidad:"error",
      });     
      setAlerta({
        mensaje:"El programa ya existe",
      });      
      console.log("severidad= ",severidad.severidad);
      
    }

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
      <Alertas
        severity={severidad.severidad}
        titulo={"Observacion:"}
        alerta={alerta}
      />
        <DialogTitle id="form-dialog-title">
        <Grid container md={12} spacing={1}>
            <Grid item md={11} >
              Formulario de Registro de Programa
            </Grid>
            <Grid item md={1} alignContent="flex-end">
              <CloseRoundedIcon onClick={handleClose}/>
            </Grid>
          </Grid>
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
                <ComboBoxFacu
                  facultades={facultades}
                  facultad={facultad}
                  setFacultad={setFacultad}
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
