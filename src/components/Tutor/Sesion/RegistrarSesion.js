import React,{useState} from "react";
import * as Controller from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PlanDeAccion from './PlanDeAccion';
import { Grid, Paper, makeStyles,Typography, Checkbox } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import Alertas from "../../Coordinador/Alertas"
import ListaEtiquetas from "./ListaEtiquetas";

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

const handleName = (e, datosForm, setDatosForm) => {
  console.log("cod",e.target.value);
  //fetchData(e.target.value);
  setDatosForm({
    ...datosForm,
    alumnoCodigo: e.target.value,
  });
};
const handleFecha = (e, datosForm, setDatosForm) => {
  console.log("fecha",e.target.value);
  setDatosForm({
    ...datosForm,
    fecha: e.target.value,
  });
  console.log("fecha",datosForm.fecha);
};
const handleHoraIni = (e, datosForm, setDatosForm) => {
  console.log("horaini",e.target.value);
  if (e.target.value < "08:00" || e.target.value > '19:30') {
    document.getElementById("Hora").value = "08:00"; 
  } else {
    setDatosForm({
      ...datosForm,
      horaini: e.target.value,
    });
    console.log("horaini",datosForm.horaini);
  }
  

};
const handleHoraFin = (e, datosForm, setDatosForm) => {
  console.log("horafin",e.target.value);

  if (e.target.value > '20:00' || e.target.value < "08:30") {
    document.getElementById("Hora fin").value = "20:00"; 
  } else {
    setDatosForm({
      ...datosForm,
      horafin: e.target.value,
    });
    console.log("horafin",datosForm.horafin);
  }
};
const handleLugar = (e, datosForm, setDatosForm) => {
  console.log("lugar",e.target.value);
  if (e.target.value.length > 45) {
    document.getElementById("lugar").value = e.target.value.substring(0,45);
  }
  setDatosForm({
    ...datosForm,
    lugar: e.target.value,
  });
  console.log("lugar",datosForm.lugar);

};
const handleResultados = (e, datosForm, setDatosForm) => {
  console.log("resu",e.target.value);
  if (e.target.value.length > 45) {
    document.getElementById("res").value = e.target.value.substring(0,250);
  }
  setDatosForm({
    ...datosForm,
    resultado: e.target.value,
  });
  console.log("resu",datosForm.resultado);

};

const RegistrarSesion = () => {
  const [datosForm, setDatosForm] = React.useState({
    alumnoCodigo:0,
    alumnoNombre:'',
    alumnos:[],
    fecha: new Date(),
    horaini:'',
    horafin:0,
    resultado:'',
    lugar:'',
    descripcion:"",
    apoyo:[],
  });
  const [alerta, setAlerta]= useState({
    mensajeStrong: "",
    mensajeStrongError: "por favor revisalos!",
    mensajeStrongExito: "satisfactoriamente!",
    mensajeError: "Existen errores al completar el formulario",
    mensajeExito: "Facultad registrada",
    mensaje: "",
  });
  const [severidad, setSeveridad] = useState({
    severidad:"error",
    severW:"warning",
    severE:"error",
    severS:"success"
  });
  const [open, setOpen] = React.useState(false);
  const [plan,setPlan]=useState([]);

  async function fetchData(cod, datosForm, setDatosForm) {
    const endpoint = "/api/alumno/buscar/" + cod;
    const params = { servicio: endpoint };
    const res = await GET(params);
  
    if (res.alumno == null) {  
      setSeveridad({
        severidad:"error",
      }); 
      setAlerta({
        mensaje:"No existe ningún alumno con ese código",
      }); 
      console.log("severidad= ",severidad.severidad);
    } else {
      console.log("alumnocod",res.alumno);
      datosForm.alumnos.push(res.alumno.ID_ALUMNO);
      setDatosForm({
        ...datosForm,
        alumnoNombre: res.alumno.USUARIO.NOMBRE,
      }); 
      console.log("alumnos: ",datosForm.alumnos);
    }
  
    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOnChangeEtiquetas = (etiqueta) => {
    const listaEtiquetas = [];
    etiqueta.forEach((element) => {
      if (element.agregar) {
        datosForm.apoyo.push(element.id);
      }
    });
    setDatosForm({
      ...datosForm,
    });
    console.log("areas: ",datosForm);
  };
  
  const handleClick = async (e, datosForm, setDatosForm) => {
    if (datosForm.fecha == "" || datosForm.horaini == "" || datosForm.horafin == "0" || datosForm.resultado == "" ||datosForm.alumnos == []) {
      setSeveridad({
        severidad:"error",
      }); 
      setAlerta({
        mensaje:"Complete los campos obligatorios (*)",
      }); 
    } else {
      setSeveridad({
        severidad:"success",
      }); 
      setAlerta({
        mensaje:"La sesión se ha registrado satisfactoriamente",
      }); 
      const nuevaSesion = {
        sesion: {
          ID_TUTOR: (getUser()).usuario.ID_USUARIO,
          ID_PROCESO_TUTORIA: "43",
          LUGAR: datosForm.lugar,
          MOTIVO: "PUCP",
          DESCRIPCION: datosForm.descripcion,
          FECHA: datosForm.fecha,
          HORA_INICIO: datosForm.horaini,
          HORA_FIN: datosForm.horafin,
          RESULTADO: datosForm.resultado,
          COMPROMISOS: plan,
          AREAS_APOYO: datosForm.apoyo,
          ALUMNOS:datosForm.alumnos,
        },
      }
      const props = { servicio: "/api/registrarSesion", request: nuevaSesion };
      console.log("saving new sesion in DB:", nuevaSesion);
      let sesion = await Controller.POST(props);
      console.log("sesion",sesion);
      if (sesion) {
        //alert("Sesion registrada Satisfactoriamente");
      }
      console.log("got updated sesion from back:", sesion);
        
  
      setDatosForm({
        ...datosForm,
      });
      setSeveridad({
        severidad:"success",
      }); 
      setAlerta({
        mensaje:"",
      }); 
    }
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
        <Alertas
          severity={severidad.severidad}
          titulo={"Observacion:"}
          alerta={alerta}
        />
        <DialogTitle id="form-dialog-title">
            <Grid container md={12} justify="space-between" direction="row">
            <Grid item md={9} >
                <Typography variant="h5">
                  Registar Sesión
                </Typography>
            </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
          <Paper elevation={0} style={style.paper}>
          <Grid container md={12} spacing={3}>
            <Grid item md={6}>
              <TextField
                  required
                  id="codigo  "
                  label="Código"
                  variant="outlined"
                  onChange={(e) => handleName(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <Grid item md={1} justify="flex-start">
              <IconButton color="primary" onClick={()=> fetchData(datosForm.alumnoCodigo, datosForm, setDatosForm)}>
                <SearchRoundedIcon
                color="primary"
                fontsize="large" />
              </IconButton> 
            </Grid>
            <Grid item md={12}>
              <TextField
                  id="alumno"
                  label="Alumno"
                  value={datosForm.alumnoNombre}
                  fullWidth   
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                  required
                  margin="dense"
                  type="date"
                  id="Fecha"
                  label="Fecha"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleFecha(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <Grid item md={4} >
              <TextField
                  required
                  margin="dense"
                  type="time"
                  id="Hora"
                  label="Hora Inicio"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleHoraIni(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={4} >
              <TextField
                  required
                  margin="dense"
                  type="time"
                  id="Hora fin"
                  label="Hora Fin"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleHoraFin(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                  id="lugar"
                  label="Lugar"
                  onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <Grid item md={12} justify="flex-start">
              <ListaEtiquetas
                strecht={true}
                titulo={""}
                obtenerEtiquetas={(e) => handleOnChangeEtiquetas(e)}
                enlace={"/api/listaAreasApoyo"}
                small={true}
                label={"Unidades de Apoyo"}
                ID={"ID_AREA_APOYO"}
              />
            </Grid>
            <PlanDeAccion
              plan={plan}
              setPlan={setPlan}
            />
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
                  rows={4}
                  id="res"
                  variant="outlined"
                  onChange={(e) => handleResultados(e, datosForm, setDatosForm)}
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
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RegistrarSesion;
