import React, {  useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { GET,POST } from "../../../Conexion/Controller";
import Alertas from "../../Coordinador/Alertas"
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {getUser} from "../../../Sesion/Sesion";
import moment from 'moment';

import errorObj from "../../Coordinador/FormRegistroTutor/errorObj";
import validateName from "../../Coordinador/FormRegistroTutor/validateName.js";
import ListaTutores from "./ListaTutores";
import ModificaListaAlumnos from "./ModificaListaAlumnos";
import ListaProcesoTut from "./ListaProcesoTut";
import ModificarAsignacionAlumnos from "./ModificarAsignacionAlumnos";
import ListaAlumnos from "./ListaAlumnosPorPrograma";

const ModificarAsignacion = (props) => {
  const {open,close,asignacion,parentCallback,idPrograma,alumnos}=props;
  const [flag, setFlag] = useState(0);//actualizar lista facu
  const [grupal, setGrupal] = useState(false);

  const [datosForm, setDatosForm] = React.useState({
    idAsignacion:asignacion.ID_ASIGNACION,
    idTutor:asignacion.ID_TUTOR,
    idProceso:asignacion.ID_PROCESO_TUTORIA,
    tutor:asignacion.TUTOR.USUARIO.NOMBRE+" "+asignacion.TUTOR.USUARIO.APELLIDOS,
    proceso:asignacion.PROCESO_TUTORIA.NOMBRE,
    alumnos:[],
  });
  useEffect(() => {
    async function fetchTutores() {
      let tuto = await Conexion.GET({servicio:"/api/tutoria/"+asignacion.ID_PROCESO_TUTORIA});
      if (tuto){
        if (tuto.tutoria.GRUPAL === 0) {
          setGrupal(false);
        } else {
          setGrupal(true);
        }
      }
      //alumnos Selecc
      for (let ele of asignacion.ALUMNOS){
        if (datosForm.alumnos.findIndex(v => v === ele.ID_ALUMNO)===-1){
          datosForm.alumnos.push(ele.ID_ALUMNO);
        }
      }
      console.log("ALUMNOSELCC",datosForm.alumnos);
    }

    fetchTutores();
  }, [grupal]);
  const [alerta, setAlerta]=useState({
    mensajeStrong: "",
    mensajeStrongError: "por favor revisalos!",
    mensajeStrongExito: "satisfactoriamente!",
    mensajeError: "Existen errores al completar el formulario",
    mensajeExito: "Facultad registrada",
    mensaje: "",
  });
  const [severidad, setSeveridad] = useState({
    severidad:"",
    severW:"warning",
    severE:"error",
    severS:"success"
  });

  const handleOnChangeTutor = (tutor) => {
    //console.log("tutor: ", tutor);
    setDatosForm({
        ...datosForm,
        idTutor:tutor.ID_TUTOR,
        tutor:tutor.USUARIO.NOMBRE+" "+tutor.USUARIO.APELLIDOS,
    });
  };
  const handleOnChangeTutoria = (tutoria) => {
    //console.log("tutoria: ", tutoria);
    if (tutoria.GRUPAL === 0) {
        setGrupal(false);
      } else {
        setGrupal(true);
      }

    setDatosForm({
        ...datosForm,
        idProceso:tutoria.ID_PROCESO_TUTORIA,
        proceso:tutoria.NOMBRE,
    });
  };
  const handleOnChangeAlumnos = (alumnosSelecc) => {
    console.log("alumnos: ", alumnosSelecc);
    datosForm.alumnos=[];
    for (let ele of alumnosSelecc){
        datosForm.alumnos.push(ele);
    }
    console.log("datosForm con alumnos: ", datosForm);
  };

  const handleClick = async () => {   
    console.log("validando: ", datosForm.idProceso,datosForm.idTutor,datosForm.alumnos.length);
    if (datosForm.idProceso==='' || datosForm.idTutor==='' || (grupal && datosForm.alumnos.length<2)){
        if ((grupal && datosForm.alumnos.length<2)){
          setSeveridad({
            severidad:"error",
          });     
          setAlerta({
              mensaje:"Una tutoría grupal debe tener al menos dos alumnos",
          });          
        }else{
          setSeveridad({
            severidad:"error",
          });     
          setAlerta({
              mensaje:"Falta completar los datos del formulario",
          });    
        }  
        return;
    }else{
        const nuevaAsignacion = {
            asignacionTutoria: {
              ID: datosForm.idAsignacion,
              PROCESO_TUTORIA: datosForm.idProceso,
              TUTOR: datosForm.idTutor,
              ALUMNOS:datosForm.alumnos,
              FECHA_ASIGNACION: moment(new Date()).format("YYYY-MM-DD"),
            },
        };
        let asignado;
        let props;
        console.log("grupal", grupal);
        props = { servicio: "/api/asignacion/modificar", request: nuevaAsignacion };
        console.log("saving new asignacion in DB:", nuevaAsignacion);
        asignado = await POST(props);
        console.log("asignado", asignado);
        /*
        if (grupal) {
            props = { servicio: "/api/asignacion/modificar", request: nuevaAsignacion };
            console.log("saving new asignacion in DB:", nuevaAsignacion);
            asignado = await POST(props);
            console.log("asignado", asignado);
        } else {
            let newasig;
            let alu;
            let enlace;
            for (let element of datosForm.alumnos) {
              console.log("CREA UNA NUEVA",alumnos.findIndex(v => v === element)!==-1);
                if (alumnos.findIndex(v => v === element)!==-1){//si no esta crea una asignacion individual
                    enlace="/api/asignacion";
                    alu = []; //guarda un unico alumo
                    alu.push(element);
                    newasig = {
                        asignacionTutoria: {
                            PROCESO_TUTORIA: datosForm.idProceso,
                            TUTOR: datosForm.idTutor,
                            ALUMNOS: alu,
                            FECHA_ASIGNACION: moment(new Date()).format("YYYY-MM-DD"),
                        },
                    };
                }else{//si esta modifico la asignacion
                    enlace="/api/asignacion/modificar";
                    alu = []; //guarda un unico alumo
                    alu.push(element);
                    newasig = {
                        asignacionTutoria: {
                            ID: datosForm.idAsignacion,
                            PROCESO_TUTORIA: datosForm.idProceso,
                            TUTOR: datosForm.idTutor,
                            ALUMNOS: alu,
                            FECHA_ASIGNACION: moment(new Date()).format("YYYY-MM-DD"),
                        },
                    };
                }
                console.log("new", newasig);
                props = { servicio: enlace, request: newasig }; //aqui seria la asignacion indi
                console.log("saving new asignacion in DB:", newasig);
                asignado = await POST(props);
            }
        }
        */
       if (asignado) {
        setSeveridad({
            severidad: "success",
        });
        setAlerta({
            mensaje: "Asignación modificada satisfactoriamente",
        });
        //alert("Alumno asignado Satisfactoriamente");
    }
    console.log("got updated alumno from back:", asignado);
    }
      
    //actualizamos lista 
    const newValue = flag + 1;
    setFlag(newValue);
    parentCallback(newValue);
    
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
      <Alertas
        severity={severidad.severidad}
        titulo={"Observacion:"}
        alerta={alerta}
      />
        <DialogTitle id="form-dialog-title">
        <Grid container md={12} spacing={1}>
            <Grid item md={11} >
              Modificacion de Asignación
            </Grid>
            <Grid item md={1} alignContent="flex-end">
              <CloseRoundedIcon onClick={close}/>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid item md={6}>
                <Typography variant="subtitle1">
                    {"Tutor: "+datosForm.tutor}
                </Typography>
            </Grid>
            <Grid item md={4} style={{marginLeft:"3%",marginBottom:"2%"}}>
                <ListaTutores
                    titulo={"Tutor"}
                    escogerTutor={handleOnChangeTutor}
                    enlace={"/api/tutor/lista/" + idPrograma}
                />
            </Grid>
            {/*<Grid item md={6}>
                <Typography variant="subtitle1">
                    {"Tutoria: "+datosForm.proceso}
                </Typography>
            </Grid>
            <Grid item md={4} style={{marginLeft:"3%",marginBottom:"2%"}}>
                <ListaProcesoTut
                    titulo={"Proceso de Tutoría"}
                    escogerTutoria={handleOnChangeTutoria}
                    enlace={"/api/tutoriafijaasignada/" + idPrograma}
                />
            </Grid>*/}
            {grupal &&
              <Grid item md={12} style={{marginBottom:"1%"}}>
                <Typography variant="subtitle1">
                    {"Alumnos: "}
                </Typography>
            </Grid>}
            {grupal &&
              <Grid item md={12}>
                <ModificarAsignacionAlumnos
                    escogerAlumnos={handleOnChangeAlumnos}
                    enlace={"/api/alumno/listar/"+datosForm.idTutor+"/"+datosForm.idProceso+"/"+idPrograma}
                    programa={idPrograma}
                    proceso={datosForm.idProceso}
                    alumnos={alumnos}
                />
            </Grid>}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={close} color="primary">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            onClick={handleClick}
            color="primary"
          >
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModificarAsignacion;
