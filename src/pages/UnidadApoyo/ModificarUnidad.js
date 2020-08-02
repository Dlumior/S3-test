import React, { Component, useEffect,useState } from "react";
//import useFetchData from "../../Conexion/useFetchData";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Grid, Paper, makeStyles, ListItem, ListItemText, List } from "@material-ui/core";
import * as Controller from "../../Conexion/Controller";
import errorObj from "../../components/Coordinador/FormRegistroTutor/errorObj";
import Alertas from "../../components/Coordinador/Alertas";
import validateEmail from "../../components/Coordinador/FormRegistroTutor/validateEmail"
import validateName from "../../components/Coordinador/FormRegistroTutor/validateName";
import { getUser } from "../../Sesion/Sesion";

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
    if (e.target.value.length > 40) {
        const error = {
            error: true,
            mesage: "La longitud máxima del nombre es de 40 caracteres."
        }
        setErrors({ ...errors, name: error });
    } else {
        const error = {
            error: false,
            mesage: ""
        }
        setErrors({ ...errors, name: error });

        setDatosForm({
            ...datosForm,
            NOMBRE: e.target.value,
        });
    }
};

const handleTelefono = (e, datosForm, setDatosForm, errors, setErrors) => {
    if (isNaN(e.target.value)) {
        const error = {
            error: true,
            message: "El teléfono debe ser una cadena numérica."
        }
        setErrors({ ...errors, telefono: error });
    } else if (e.target.value.length > 15) {
        const error = {
            error: true,
            message: "El teléfono debe ser máximo de 15 caracteres."
        }
        setErrors({ ...errors, telefono: error });
    } else {
        const error = {
            error: false,
            message: ""
        }
        setErrors({ ...errors, telefono: error });

        setDatosForm({
            ...datosForm,
            TELEFONO: e.target.value,
        });
    }
};

const handleCorreo = (e, datosForm, setDatosForm, errors, setErrors, dominio1, dominio2) => {
    const res = validateEmail(e.target.value, dominio1, dominio2);
    setErrors({ ...errors, email: res });
    
    setDatosForm({
      ...datosForm,
      CORREO: e.target.value,
    });
};

const handleContacto = (e, datosForm, setDatosForm, errors, setErrors) => {
    if (e.target.value.length > 100) {
        const error = {
            error: true,
            message: "La longitud máxima del nombre es de 100 caracteres."
        }
        setErrors({ ...errors, contacto: error });
    } else {
        const error = {
            error: false,
            message: ""
        }
        setErrors({ ...errors, contacto: error });

        setDatosForm({
            ...datosForm,
            CONTACTO: e.target.value,
        });
    }
};



const  ModificarUnidad = (props) => {
  const {open,close,unidad,parentCallback}=props;
  const [flag, setFlag] = useState(0);//actualizar lista 
  const [datosForm, setDatosForm] = React.useState({
    ID_AREA_APOYO:unidad.ID_AREA_APOYO,
    NOMBRE:unidad.NOMBRE,
    TELEFONO: unidad.TELEFONO,
    CORREO:unidad.CORREO,
    CONTACTO:unidad.CONTACTO,
});

  const [errors, setErrors] = useState(errorObj);  
  const classes = useStyles();
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
const [dominio1, setDominio1] = useState("");
const [dominio2, setDominio2] = useState("");

useEffect(() => {
    async function fetchDominios() {
        let institucion = await Controller.GET({servicio:"/api/institucion"});
        if (institucion){
          if (institucion.institucion){
            setDominio1(institucion.institucion.DOMINIO);
            setDominio2(institucion.institucion.DOMINIO2);
          }
        }
    }

    fetchDominios();
}, [dominio1, dominio2]);


  
  const handleClick = async (e, datosForm, setDatosForm) => {

    if (datosForm.NOMBRE==="" || datosForm.CORREO==="" || datosForm.TELEFONO==="" || datosForm.CONTACTO==="") {
        //console.log("error vacia");
        setSeveridad( {severidad: "error"} );     
        setAlerta( {mensaje: "Todos los datos son obligatorios."} ); 

        return;
    } 
    if (errors.name.error) {
        //console.log("error nombre");
        setSeveridad( {severidad: "error"} );     
        setAlerta( {mensaje: errors.name.mesage} ); 

        return
    }
    if (errors.telefono.error) {
        //console.log("error telefono");
        setSeveridad( {severidad: "error"} );     
        setAlerta( {mensaje: errors.telefono.message} ); 

        return
    }
    if (errors.email.error) {
        //console.log("error email");
        setSeveridad( {severidad: "error"} );     
        setAlerta( {mensaje: errors.email.mesage} ); 

        return
    }
    if (errors.contacto.error) {
        //console.log("error contacto");
        setSeveridad( {severidad: "error"} );     
        setAlerta( {mensaje: errors.name.message} ); 

        return
    }
    setDatosForm({
    ...datosForm,
    });
    console.log(datosForm);

    const props = { servicio: "/api/areaapoyo/modificar", request: {areaApoyo: datosForm} };
    console.log("saving new prog in DB:",  datosForm);
    let nuevaUnidad = await Controller.POST(props);
    console.log("got updated prog from back:", nuevaUnidad);
     if (nuevaUnidad){
      if (nuevaUnidad.areaApoyo!==null){ 
          setSeveridad({
            severidad:"success",
          });     
          setAlerta({
            mensaje:"Unidad de Apoyo modificada satisfactoriamente",
          });      
          const newValue = flag + 1;
          setFlag(newValue);
          parentCallback(newValue);
      }else{
        setSeveridad({
          severidad:"error",
        });     
        setAlerta({
          mensaje:"La unidad ya existe",
        });      
      }
    }

    }  

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
      <Alertas
        severity={severidad.severidad}
        titulo={"Observacion:"}
        alerta={alerta}
      />
        <DialogTitle id="form-dialog-title">
        <Grid container  md={12} justify="space-between" direction="row">          
            <Grid item md={11} >
              Modificar Unidad de Apoyo
            </Grid>
            <Grid item md={1} alignContent="flex-end">
              <CloseRoundedIcon onClick={close}/>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} container style={{marginRight:"1%",marginLeft:"1%"}}>
                <TextField
                    required
                    error={errors.name.error}
                    margin="dense"
                    id="nombre"
                    label="Nombre"
                    fullWidth
                    defaultValue={datosForm.NOMBRE}
                    onChange={(e) => handleName(e, datosForm, setDatosForm, errors, setErrors)}
                    helperText={errors.name.mesage}
                />
                <TextField
                    required
                    error={errors.telefono.error}
                    margin="dense"
                    id="TELEFONO"
                    label="Teléfono"
                    fullWidth
                    defaultValue={datosForm.TELEFONO}
                    onChange={(e) => handleTelefono(e, datosForm, setDatosForm, errors, setErrors)}
                    helperText={errors.telefono.message}
                />
                <TextField
                    required
                    error={errors.email.error}
                    margin="dense"
                    id="CORREO"
                    label="Correo"
                    fullWidth
                    defaultValue={datosForm.CORREO}
                    onChange={(e) => handleCorreo(e, datosForm, setDatosForm, errors, setErrors, dominio1, dominio2)}
                    helperText={errors.email.mesage}
                />
                <TextField
                    required
                    error={errors.contacto.error}
                    margin="dense"
                    id="CONTACTO"
                    label="Contacto"
                    fullWidth
                    defaultValue={datosForm.CONTACTO}
                    onChange={(e) => handleContacto(e, datosForm, setDatosForm, errors, setErrors)}
                    helperText={errors.contacto.message}
                />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={props.close} color="primary">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
            color="primary"
          >
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
);
  };
export default  ModificarUnidad;
