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
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { GET } from "../../../Conexion/Controller";
import ComboBoxPrograma from "./ComboBoxPrograma";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Alertas from "../../Coordinador/Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

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

const handleCorreo = (e, datosForm, setDatosForm, errors, setErrors, dominio1, dominio2) => {
    setDatosForm({
      ...datosForm,
      CORREO: e.target.value,
    });
    const res = validateEmail(e.target.value, dominio1, dominio2);
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

const RegistrarCoordinador = (props) => {
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
  const [datosAsignacion, setDatosAsignacion] = React.useState({
    idUsuario:0,
    roles:[6],
    idPrograma:'',
  });
  const [nombre,setNombre]=useState({
    usuario:"",
  });
  const [programasSeleccionados,setProgramasSeleccionados]=useState([]);
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");
  const [errors, setErrors] = useState(errorObj);
  const [alerta, setAlerta]=useState({
    mensajeStrong: "",
    mensajeStrongError: "por favor revisalos!",
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

  const [dominio1, setDominio1] = useState("");
  const [dominio2, setDominio2] = useState("");

  useEffect(() => {
    async function fetchTutores() {
      let institucion = await Conexion.GET({servicio:"/api/institucion"});
      console.log("RegistrarCoordinador institucion: ", institucion);
      setDominio1(institucion.institucion.DOMINIO);
      setDominio2(institucion.institucion.DOMINIO2);
      console.log("RegistrarCoordinador dominio1: ", dominio1);
      console.log("RegistrarCoordinador dominio2: ", dominio2);
    }

    fetchTutores();
  }, [dominio1, dominio2]);

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
  const [openAviso, setOpenAviso] = React.useState(false);


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

  const handleClickOpenAviso = () => {
    setOpenAviso(true);
  };

  const handleCloseAviso = () => {
    setOpenAviso(false);
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

      setSeveridad({
        severidad:"error",
      });     
      setAlerta({
        mensaje:"Hay errores en el formulario",
      });      

    } else {
      console.log("programa ha actualizar: ",programasSeleccionados);
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
      if (nuevoCoord.error){
        setSeveridad({
          severidad:"error",
        });     
        setAlerta({
          mensaje:nuevoCoord.error,
        });
        setOpenAviso(true);
        
        const propsUsuario = { servicio: "/api/usuario/buscar/"+datosForm.CODIGO }

        console.log("PROOOOOPSUSUARIO: ", propsUsuario);
        const resUsuario = await GET(propsUsuario);
        console.log("got updated coord from back:", resUsuario);

        setNombre({
          usuario:resUsuario.usuario.NOMBRE + " " + resUsuario.usuario.APELLIDOS
        });

        const props2 = { servicio: 
        nuevoCoord.error==="Correo repetido"? 
        "/api/usuario/" + datosForm.CORREO : 
        "/api/usuario/buscar/" + datosForm.CODIGO};

        console.log("PROOOOOPS2: ", props2);
        const res = await GET(props2);
        console.log("got updated coord from back:", res);
        setDatosAsignacion({
          ...datosAsignacion,
          idUsuario:res.usuario.ID_USUARIO
        });

      }else{
        if (nuevoCoord){    

          setSeveridad({
            severidad:severidad.severS,
          });     
          setAlerta({
            mensaje:"Se registro al coordinador satisfactoriamente",
          });      
          console.log("severidad= ",severidad.severidad);
        }

      }
      

    }  
    
  };

  const handleClickAviso = async (e) =>{
    for (let facu of datosForm.FACULTAD){
      const nuevaAsignacion = {
        asignacion: {
            ID_USUARIO: datosAsignacion.idUsuario,
            ID_ROLES: [6],
            ID_PROGRAMA: facu,
        },
      };
        console.log("lo que va:", nuevaAsignacion);
  
        const props = { servicio: "/api/usuario/asignarrol", request: nuevaAsignacion };
        console.log("saving new asignacion in DB:", nuevaAsignacion);
        let asignado = await Conexion.POST(props);
        console.log("asignado",asignado); 
    }
    setOpenAviso(false);
  }


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
        <Grid container md={12} justify="space-between" direction="row">
          <Grid item md={11} >
              <Typography variant="h5">
                Formulario de registro de coordinador
              </Typography>
          </Grid>
          <Grid item md={1}>
              <CloseRoundedIcon onClick={handleClose}/>
          </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container md={12} spacing={2}> 
            <Grid item md={12}>
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
                onChange={(e) => handleCorreo(e, datosForm, setDatosForm, errors, setErrors, dominio1, dominio2)}
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
              <Facultades 
                programasSeleccionados={programasSeleccionados}
                setProgramasSeleccionados={setProgramasSeleccionados}
                programa={programa}
                setPrograma={setPrograma}
                programas={programas}
                setProgramas={setProgramas}
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
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
            color="primary"
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
      {openAviso &&
        <Dialog
        open={openAviso}
        onClose={handleCloseAviso}
        aria-labelledby="nuevorol"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container md={12} justify="center">
              <WarningRoundedIcon style={{ fontSize: 70,fill:"orange" }}/>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container md={12} spacing={2}>
            El usuario {nombre.usuario} ya cuenta con ese código
            ¿Desea asignarle el rol de coordinador de Facultad?
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={handleCloseAviso} color="primary">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            onClick={(e) => handleClickAviso(e)}
            color="primary"
          >
            Asignar
          </Button>
        </DialogActions>

      </Dialog>}

    </div>
  );
};
export default RegistrarCoordinador;

const estilo = {
  imagen: {
      width: "90%",
      borderRadius: "100%",
  }
}