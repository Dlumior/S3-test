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
import ComboBoxPrograma from "./ComboBoxPrograma";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Alertas from "../../Coordinador/Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';


import IconButton from '@material-ui/core/IconButton';
import errorObj from "../../Coordinador/FormRegistroTutor/errorObj.js";
import validateName from "../../Coordinador/FormRegistroTutor/validateName.js";
import validateLastNames from "../../Coordinador/FormRegistroTutor/validateLastNames.js";
import validatePhoneNumber from "../../Coordinador/FormRegistroTutor/validatePhoneNumber.js";
import validateAddress from "../../Coordinador/FormRegistroTutor/validateAddress.js";
import validateCode from "../../Coordinador/FormRegistroTutor/validateCode.js";
import validateEmail from "../../Coordinador/FormRegistroTutor/validateEmail.js";
import { wait } from "@testing-library/react";
import Facultades from "./Facultades";


const useStyles = makeStyles((theme) => ({
  foto: {
    backgroundImage:
      "url(https://pps.whatsapp.net/v/t61.24694-24/97969579_3102912936463371_7208379054937379558_n.jpg?oe=5EC495F5&oh=68e4ca58a0f65f680df95105f6ba41ae)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: theme.spacing(2),
    width: theme.spacing(15),
    height: theme.spacing(30),
  },
}));

const handleCodigo = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      CODIGO: e.target.value,
    });
    /*Busco por codigo, no debe repetirse, en caso devuelve datos del coord */
    const res = validateCode(e.target.value);
    setErrors({ ...errors, code: res });
};

const handleName = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      NOMBRE: e.target.value,
    });
    const res = validateName(e.target.value);
    setErrors({ ...errors, name: res });
};

const handleApellidos = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      APELLIDOS: e.target.value,
    });
    const res = validateLastNames(e.target.value);
    setErrors({ ...errors, lastnames: res });
};

const handleCorreo = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      CORREO: e.target.value,
    });
    const res = validateEmail(e.target.value);
    setErrors({ ...errors, email: res });
};
const handleTelefono = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      TELEFONO: e.target.value,
    });
  const res = validatePhoneNumber(e.target.value);
  setErrors({ ...errors, phoneNumber: res });
};
/*
const handleAlertas = (e, datosForm, setDatosForm, errors, setErrors) => {
  setAlertas({
    ...datosForm,
    TELEFONO: e.target.value,
  });
*/

const RegistrarCoordinador = (props) => {
  const {flag,setFlag}=props;
  const [datosForm, setDatosForm] = React.useState({
    CODIGO: "",
    NOMBRE: "",
    APELLIDOS: "",
    CORREO: "",
    TELEFONO: "",
    USUARIO: "",
    CONTRASENHA: "",
    DIRECCION: "",
    IMAGEN: null,
    FACULTAD:[],
  });
  const [programasSeleccionados,setProgramasSeleccionados]=useState([]);
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState([]);
  const [errors, setErrors] = useState(errorObj);
  const [alerta, setAlerta]=useState({
    mensajeStrong: "",
    mensajeStrongError: "porfavor revisalos!",
    mensajeStrongExito: "satisfactoriamente!",
    mensajeError: "Existen errores al completar el formulario",
    mensajeExito: "Coordinador registrado",
    mensaje: "",
  });
  const [severidad, setSeveridad] = useState({
    severidad:"",
    severW:"warning",
    severE:"error",
    severS:"success"
  });

 useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/facultad";
    const params = { servicio: endpoint };
    const res = await GET(params);    
    console.log("proogramasss:", res);
    setProgramas(res.facultad);
    console.log("proograma:", programa);
  }
   fetchData();
}, {});

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
  };

 

  const handleClick = async (e, datosForm, setDatosForm) => {
    if (
      errors.name.error ||
      errors.lastnames.error ||
      errors.email.error ||
      errors.phoneNumber.error ||
      errors.address.error ||
      errors.code.error ||
      datosForm.NOMBRE==='' || datosForm.APELLIDOS==='' ||
      datosForm.CORREO==='' || datosForm.CODIGO===''
    ) {

      //let alerta = Object.assign({}, alert);
      //console.log("alerta",alerta);
      //alerta.mensaje = alerta.mensajeError;
      //severidad="error";
      setSeveridad({
        severidad:severidad.severE,
      });     
      setAlerta({
        mensaje:alerta.mensajeError,
      });      
      console.log("severidad= ",severidad.severidad);

    } else {
      console.log("programa ha actualizar: ",programasSeleccionados);
      /*
      let arregloProg=[];
      for (let element of programasSeleccionados){
        //arregloProg.push(element.ID_PROGRAMA)
        datosForm.PROGRAMA.push(element)        
      }
      console.log("arreglo ha actualizar: ",arregloProg);
      */
      console.log("programa",programa)
      programasSeleccionados.push(programa);
      console.log("programasSelecc",programasSeleccionados)

      datosForm.FACULTAD=programasSeleccionados;
      datosForm.CONTRASENHA="contra";
      setDatosForm({
        ...datosForm,
      });

      console.log(datosForm);      
      const props = { servicio: "/api/coordinadorfacultad", request: {coordinador: datosForm} };
      console.log("saving new coord in DB:", datosForm);
      let nuevoCoord = await Conexion.POST(props);
      console.log("got updated coord from back:", nuevoCoord);

      if (nuevoCoord){      
        setSeveridad({
          severidad:severidad.severS,
        });     
        setAlerta({
          mensaje:"Se registro al coordinador satisfactoriamente",
        });      
        console.log("severidad= ",severidad.severidad);
        //setFlag(flag=>flag+1);
        console.log("flag: ",flag);
        //setOpen(false);
      }

    }  
    /*
    if (datosForm.NOMBRE===''){      
      alert("Debe colocar un nombre");
    } else if (datosForm.APELLIDOS===''){      
      alert("Debe colocar un apellido");
    } else if (datosForm.CORREO===''){      
      alert("Debe colocar un correo");
    }else if (datosForm.CODIGO===''){      
      alert("Debe colocar un codigo");
    }else{
      const props = { servicio: "/api/coordinador", request: {coordinador: datosForm} };
      console.log("saving new coord in DB:", datosForm);
      let nuevoCoord = await Conexion.POST(props);
      console.log("got updated coord from back:", nuevoCoord);

      if (nuevoCoord){      
        alert("Se registro coordinador Correctamente");
      }

    }
/*
    apiMethod();
    console.log(datosForm);
*/
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
          <Grid container md={12}>
            <Grid item md={11} >
              Formulario de registro de coordinador
            </Grid>
            <Grid item md={1} alignItems="flex-end">
              <CloseRoundedIcon onClick={handleClose}/>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container md={12} spacing={2}> 
            <Grid item md={4}>
              <Paper className={classes.foto}>Foto</Paper>
            </Grid>
            <Grid item md={8}>
              <TextField
                required
                error={errors.code.error}
                margin="dense"
                id="CODIGO"
                label="Codigo"
                onChange={(e) => handleCodigo(e, datosForm, setDatosForm, errors, setErrors)}
                helperText={errors.code.mesage}
                fullWidth
              />
              <TextField
                required
                error={errors.name.error}
                margin="dense"
                id="NOMBRE"
                label="Nombre"
                onChange={(e) => handleName(e, datosForm, setDatosForm, errors, setErrors)}
                helperText={errors.name.mesage}
                fullWidth
              />
              <TextField
                required
                error={errors.lastnames.error}
                margin="dense"
                id="APELLIDOS"
                label="Apellidos"
                onChange={(e) => handleApellidos(e, datosForm, setDatosForm, errors, setErrors)}
                helperText={errors.lastnames.mesage}
                fullWidth
              />
              <TextField
                required
                error={errors.email.error}
                margin="dense"
                id="CORREO"
                label="Correo electrónico"
                type="email"
                onChange={(e) => handleCorreo(e, datosForm, setDatosForm, errors, setErrors)}
                fullWidth
              />
              <TextField
                error={errors.phoneNumber.error}
                margin="dense"
                id="TELEFONO"
                label="Teléfono"
                onChange={(e) => handleTelefono(e, datosForm, setDatosForm, errors, setErrors)}
                fullWidth
              /> 
              {/*<Button
                color="primary"
                variant="outlined">
                Asignar Facultades
              </Button>*/}
              <Facultades 
                programasSeleccionados={programasSeleccionados}
                setProgramasSeleccionados={setProgramasSeleccionados}
                programa={programa}
                setPrograma={setPrograma}
                programas={programas}
                setProgramas={setProgramas}/>     
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
export default RegistrarCoordinador;
