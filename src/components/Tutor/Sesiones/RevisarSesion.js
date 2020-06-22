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
import PlanDeAccion from '../Sesion/PlanDeAccion';
import { Grid, Paper, makeStyles,Typography, Checkbox } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import Alertas from "../../Coordinador/Alertas"

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
  if (e.target.value.length > 250) {
    document.getElementById("res").value = e.target.value.substring(0,250);
  }
  setDatosForm({
    ...datosForm,
    resultado: e.target.value,
  });
  console.log("resu",datosForm.resultado);

};

const handleDogsAssistance = (e, datosForm, setDatosForm) => {
  console.log("asistencia del guau guau PRE",e.target.value);
  datosForm.asistencia = 0;
  setDatosForm({
    ...datosForm,
    asistencia: e.target.value,
  });

  console.log("asistencia del guau guau POST",datosForm.asistencia);
}

const RevisarSesion = (cita) => {
  console.log("DEBUG NOW NOW NOW ", cita)
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
  const [open, setOpen] = React.useState(true);
  const [plan,setPlan]=useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleClick = async (e, datosForm, setDatosForm) => {
    if (datosForm.asistencia == "yes") {
      var doggysAssistance = 1;
    } else if (datosForm.asistencia == "no") {
      var doggysAssistance = 0;
    } else {
      setSeveridad({
        severidad:severidad.severE,
      });     
      setAlerta({
        mensaje:"Te falta llenar la asistencia pe cachorro",
      }); 
      return;
    }
    const resultadosSesion = {
      sesion: {
        ID_SESION: cita.cita.ID_SESION,
        RESULTADO: datosForm.resultado,
        COMPROMISOS: [],
        AREAS_APOYO: ["1"],
        ALUMNOS:[cita.cita.ALUMNOs[0].ID_ALUMNO],
        ASISTENCIA:[doggysAssistance]
      },
    }
    const props = { servicio: "/api/registrarResultadoCita", request: resultadosSesion };
    console.log("saving new sesion in DB:", resultadosSesion);
    let sesion = await Controller.POST(props);
    console.log("ASISTENCIA PRUEBA",sesion);
    if (sesion) {
      alert("Sesion registrada Satisfactoriamente");
    }
    console.log("got updated sesion from back:", sesion);
      

    setDatosForm({
      ...datosForm,
    });
  };

  return (
    <div>
      {/* <Button 
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>
        Registrar Sesión
      </Button> */}
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
          <Typography variant="h5">Datos Sesión</Typography>
        </DialogTitle>
        <DialogContent>
          <Paper elevation={0} style={style.paper}>
          <Grid container md={12} spacing={3}>
            {/* <Grid item md={6}>
              <TextField
                  required
                  id="codigo  "
                  label="Código"
                  variant="outlined"
                  onChange={(e) => handleName(e, datosForm, setDatosForm)}
                  value = {cita.ALUMNOS[0].USUARIO.}
                  fullWidth   
              />
            </Grid> */}
            <Grid item md={1} justify="flex-start">
            </Grid>
            <Grid item md={12}>
              <TextField
                  disabled
                  id="alumno"
                  label="Alumno"
                  value={cita.cita.ALUMNOs[0].USUARIO.NOMBRE + cita.cita.ALUMNOs[0].USUARIO.APELLIDOS}
                  fullWidth   
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                  disabled
                  required
                  margin="dense"
                  type="date"
                  id="Fecha"
                  label="Fecha"
                  value={cita.cita.FECHA}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleFecha(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <Grid item md={4} >
              <TextField
                  disabled
                  required
                  margin="dense"
                  type="time"
                  id="Hora"
                  value={cita.cita.HORA_INICIO}
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
                  disabled
                  required
                  margin="dense"
                  type="time"
                  id="Hora fin"
                  label="Hora Fin"
                  value={cita.cita.HORA_FIN}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleHoraFin(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                  disabled
                  id="lugar"
                  label="Lugar"
                  value={cita.cita.LUGAR}
                  onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                  fullWidth   
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
                  defaultValue={cita.cita.RESULTADO}
                  onChange={(e) => handleResultados(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <p>
              <Typography variant="h6">
                  ¿Asistió a la cita?
              </Typography><br></br>
              <input type="radio" id="asistio" name="asistencia" value="yes" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)}></input>
              <label for="asistio">Sí</label>
              <input type="radio" id="noasistio" name="asistencia" value="no" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)}></input>
              <label for="noasistio">No</label>
            </p>
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
export default RevisarSesion;