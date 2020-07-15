import React,{useState} from "react";
import * as Controller from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PlanDeAccion from '../Sesion/PlanDeAccion';
import { Grid, Paper,Typography } from "@material-ui/core";
import Alertas from "../../Coordinador/Alertas"
import ListaEtiquetas from "../Sesion/ListaEtiquetas";
import ModificaAsignaciones from "../../Coordinador/FormAsignacion/ModificaAsignaciones";
import ModificarPlanDeAccion from "./ModificarPlanDeAccion";

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
const handleOnChangeEtiquetas = (etiqueta, datosForm, setDatosForm) => {
  const listaEtiquetas = [];
    console.log("etiqueta",etiqueta);
    etiqueta.forEach((element) => {
      if (element.agregar) {
        console.log("agrega",element);
        listaEtiquetas.push(element.id);
      }
    });
    datosForm.apoyo=listaEtiquetas;
    setDatosForm({
      ...datosForm
    });
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
  console.log("RevisarSesion Debug ", cita.cita);
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
    asistencia:cita.cita.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO === 0 ? "no":"yes",
  });
  const [compromiso,setCompromiso]=useState({
    campo:'',
    check:false, 
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
  const [open2, setOpen2] = React.useState(false);
  const [plan,setPlan]=useState(cita.cita.COMPROMISOs);
  console.log("cita.cita.COMPROMISOs", cita.cita);
  console.log("test123plan", plan);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCompromiso = (comp) => {
    console.log("thisisit",comp);
    setCompromiso(comp);
  };
  const handleOnOpenVer = () => {
    setOpen2(true);
  }
  
  const handleOnCloseVer = () => {
    setOpen2(false);
    setSeveridad({
      severidad:"",
    });     
    setAlerta({
      mensaje:"",
    }); 
  }
  
  const handleOnclickVerAlmunos = (e, alumnos) => {
    setOpen2(true);
  }
  
  const handleClose = () => {
    setOpen(false);
    cita.onClose();
    setOpen2(false);
    setSeveridad({
      severidad:"",
    });     
    setAlerta({
      mensaje:"",
    }); 
    window.location.reload();
    
  };
  
  const handleClick = async (e, datosForm, setDatosForm) => {
    console.log('datosForm: ', datosForm);
    if (datosForm.asistencia === "yes") {
      var doggysAssistance = 1;
    } else if (datosForm.asistencia === "no") {
      var doggysAssistance = 0;
    } else if (datosForm.asistencia === null) {
      var doggysAssistance = 0; 
    }else {
      setSeveridad({
        severidad:severidad.severE,
      });     
      setAlerta({
        mensaje:"Falta llenar la asistencia.",
      }); 
      return;
    }
    //agrega el ultimo compromiso
    //plan.push(compromiso);
    console.log("este es el plan",plan);
    const resultadosSesion = {
      sesion: {
        ID_SESION: cita.cita.ID_SESION,
        RESULTADO: datosForm.resultado,
        COMPROMISOS: plan,
        ALUMNOS:[cita.cita.ALUMNOs[0].ID_ALUMNO],
        ASISTENCIA:[doggysAssistance],
        AREAS_APOYO: datosForm.apoyo
      },
    }
    const props = { servicio: "/api/registrarResultadoCita", request: resultadosSesion };
    console.log("saving new sesion in DB:", resultadosSesion);
    let sesion = await Controller.POST(props);
    console.log("ASISTENCIA PRUEBA",sesion);
    if (sesion) {
      setSeveridad({
        severidad:"success",
      });     
      setAlerta({
        mensaje:"Sesion modificada Satisfactoriamente",
      }); 
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
      {open2 &&
        <ModificaAsignaciones
          open={handleOnOpenVer}
          close={handleOnCloseVer}
          alumnos={cita.cita.ALUMNOs} />
          }
      <Dialog
        open={cita.open}
        onClose={cita.onClose}
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
            {/* <Grid item md={1} justify="flex-start">
            </Grid> */}
            {cita.cita.PROCESO_TUTORIum.GRUPAL?undefined:
            <Grid item md={12}>
              <TextField
                  disabled
                  id="alumno"
                  label="Alumno"
                  value={cita.cita.ALUMNOs[0].USUARIO.NOMBRE + " " + cita.cita.ALUMNOs[0].USUARIO.APELLIDOS}
                  fullWidth   
              />
            </Grid>}
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
            <Grid item md={12}>
              <TextField
                  disabled
                  id="tutoria"
                  label="Tutoría"
                  value={cita.cita.PROCESO_TUTORIum.NOMBRE}
                  onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            {cita.cita.PROCESO_TUTORIum.GRUPAL?
            <Grid item md={12}>
              <Button
                href="#text-buttons" color="primary"
                onClick={e => handleOnclickVerAlmunos(e, cita.cita.ALUMNOs)}>
                Ver Alumnos
              </Button>
            </Grid>:""}
            {console.log("estadoo",cita.cita.ESTADO)}
            {(cita.cita.ESTADO.includes("realizada_cita")) &&
              <ModificarPlanDeAccion
                plan={plan}
                setPlan={setPlan}
                ultimoCompromiso={handleCompromiso}
            />}
            {(cita.cita.ESTADO.includes("03") || cita.cita.ESTADO.includes("04")) &&
              <PlanDeAccion
                plan={plan}
                setPlan={setPlan}
                ultimoCompromiso={handleCompromiso}
            />}

            <Grid item md={12} justify="flex-start">
              <ListaEtiquetas
                strecht={true}
                titulo={""}
                obtenerEtiquetas={(e) => handleOnChangeEtiquetas(e, datosForm, setDatosForm)}
                enlace={"/api/listaAreasApoyo"}
                enlace2={"/api/listaSesiones/"+cita.cita.ID_TUTOR+"/"+cita.cita.FECHA}
                small={true}
                label={"Unidades de Apoyo"}
                idSesion={cita.cita.ID_SESION}
                ID={"ID_AREA_APOYO"}
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
              {/* <input type="radio" id="asistio" name="asistencia" value="yes" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)}></input> */}
              {cita.cita.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO ? <input type="radio" id="asistio" name="asistencia" value="yes" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)} checked></input> : <input type="radio" id="asistio" name="asistencia" value="yes" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)}></input>}
              <label for="asistio">Sí</label>
              {/* <input type="radio" id="noasistio" name="asistencia" value="no" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)}></input> */}
              {cita.cita.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO==false ? <input type="radio" id="noasistio" name="asistencia" value="no" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)} checked></input>: <input type="radio" id="noasistio" name="asistencia" value="no" onChange={(e) => handleDogsAssistance(e, datosForm, setDatosForm)}></input>} 
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