import React, { useState, useEffect } from "react";
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
import ComboBoxPrograma from "../../Coordinador/FormRegistroTutor/comboBoxProgramas";
import ComboBoxFacus from "../../Coordinador/RegistrarCoordPrograma/ComboBoxFacus";
import ComboBoxProcesoTutoria from "../../Coordinador/FormAsignacion/ComboBoxProcesoTutoria";
import moment from 'moment';
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
    fecha: moment(new Date()).format("YYYY-MM-DD"),
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
  const [pDisabled, setPDisabled] = useState(true);
  const [prDisabled, setPrDisabled] = useState(true);
  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");  
  const [procesosTutoria, setProcesosTutoria] = useState([]);
  const [procesoTutoria, setProcesoTutoria] = useState("");
  const [compromiso,setCompromiso]=useState({
    campo:'',
    check:false, 
  });

//faultades por coordinador de prog o facu
useEffect(() => {
  async function fetchData() {
      const endpoint = "/api/facultad/tutor/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("facultades:", res);
      if (res){
        setFacultades(res.facultades);
      }      
      console.log("facultad:", facultades);
    }
   fetchData();
}, {});

//programas a partir de un coordinador de Facultad
useEffect(() => {
    async function fetchData() {
        const endpoint = "/api/programa/lista/tutor/"+getUser().usuario.ID_USUARIO+"/"+facultad;
        const params = { servicio: endpoint };
        const res = await GET(params);    
        console.log("proogramasss:", res);
        if (res){
            setProgramas(res.programas);
        }
        console.log("proograma:", programas);
      }     
      if (facultad!=""){
          fetchData();
      }
},[facultad]);

//proceso de tutoria a partir de un programa
useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/tutoria/lista/"+programa;
    const params = { servicio: endpoint };
    const res = await GET(params);
    console.log("tutoria: ",res);
    if (res !== []) {
      setProcesosTutoria(res.tutoria);
    }
  }
  if (facultad!=="" && programa !== "") {
    fetchData();
  }
},[programa]);

  async function fetchData(cod, datosForm, setDatosForm) {
    const endpoint = "/api/alumno/buscar/" + cod;
    const params = { servicio: endpoint };
    const res = await GET(params);
    if (res){
      datosForm.alumnos.pop();
      if (res.alumno === null) {  
        setSeveridad({
          severidad:"error",
        }); 
        setAlerta({
          mensaje:"No existe ningún alumno con ese código",
        }); 
        setDatosForm({
          ...datosForm,
          alumnoNombre: "",
        });
        console.log("severidad= ",severidad.severidad);
      } else {
        setSeveridad({
          severidad:"",
        }); 
        setAlerta({
          mensaje:"",
        }); 
        console.log("fechaa", moment(new Date()).format("DD-MM-YYYY"))
        console.log("alumnocod",res.alumno);
        datosForm.alumnos.push(res.alumno.ID_ALUMNO);
        setDatosForm({
          ...datosForm,
          alumnoNombre: res.alumno.USUARIO.NOMBRE + " " + res.alumno.USUARIO.APELLIDOS,
        }); 
        console.log("alumnos: ",datosForm.alumnos);
      }

    }
    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleCompromiso = (comp) => {
    console.log("thisisit",comp);
    setCompromiso(comp);
  };
  const handleClose = () => {
    setOpen(false);
    setSeveridad({
      severidad:"",
    }); 
    setAlerta({
      mensaje:"",
    }); 
    setDatosForm({
      alumnoCodigo:0,
      alumnoNombre:'',
      alumnos:[],
      fecha: moment(new Date()).format("YYYY-MM-DD"),
      horaini:'',
      horafin:0,
      resultado:'',
      lugar:'',
      descripcion:"",
      apoyo:[],
    });
    window.location.reload();
  };
  const handleOnChangeEtiquetas = (etiqueta) => {
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
  
  const handleClick = async (e, datosForm, setDatosForm) => {
    setSeveridad({
      severidad:"",
    }); 
    setAlerta({
      mensaje:"",
    });
    if (datosForm.fecha === "" || datosForm.horaini === "" || datosForm.horafin === "0" || datosForm.resultado === "" ||datosForm.alumnos === []) {
      setSeveridad({
        severidad:"error",
      }); 
      setAlerta({
        mensaje:"Complete los campos obligatorios (*)",
      }); 
    } else {
      //agrega el ultimo compromiso
      //plan.push(compromiso);
      const nuevaSesion = {
        sesion: {
          ID_TUTOR: (getUser()).usuario.ID_USUARIO,
          ID_PROCESO_TUTORIA: datosForm.procesoTutoria,
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
      console.log("sesion debug xaeee: ", sesion);
      if (sesion) {
        console.log("ENTRE AL IF: ");
        if(sesion.message){
          setSeveridad({
            severidad:"error",
          }); 
          setAlerta({
            mensaje:sesion.message,
          });
        }else if (sesion.error){
          setSeveridad({
            severidad:"error",
          }); 
          setAlerta({
            mensaje:"Ocurrió un error en la operación, intente de nuevo",
          }); 
        }else{
          setSeveridad({
            severidad:"success",
          }); 
          setAlerta({
            mensaje:"La sesión se ha registrado satisfactoriamente",
          }); 
        }
      }
      console.log("got updated sesion from back:", sesion);
        
  
      // setDatosForm({
      //   ...datosForm,
      // });
      // setSeveridad({
      //   severidad:"success",
      // }); 
      // setAlerta({
      //   mensaje:"",
      // }); 
    }
  };

  //Obtener a los alumnos una vez seleccionado el programa y el procesos de tutoria
  useEffect(() => {
    async function fetchData() {
      setDatosForm({
        ...datosForm,
        procesoTutoria: procesoTutoria,
      });
    }

    if (procesoTutoria !== "") {
      fetchData();
    }
  }, [procesoTutoria]);

  

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
                  aria-readonly
                  id="alumno"
                  label="Alumno"
                  value={datosForm.alumnoNombre}
                  fullWidth   
              />
            </Grid>

            <Grid item md={12}>
              <ComboBoxFacus
                setPrDisabled={setPDisabled}
                facultades={facultades}
                facultad={facultad}
                setFacultad={setFacultad}
              />
            </Grid>

            <Grid item md={12}>
              <ComboBoxPrograma
                prDisabled={prDisabled}
                setPDisabled={setPDisabled}
                programas={programas}
                programa={programa}
                setPrograma={setPrograma}
              />
            </Grid>

            <Grid item md={12}>
              <ComboBoxProcesoTutoria
                pDisabled={pDisabled}
                procesosTutoria={procesosTutoria}
                procesoTutoria={procesoTutoria}
                setProcesoTutoria={setProcesoTutoria}
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                  required
                  margin="dense"
                  type="date"
                  id="Fecha"
                  label="Fecha"
                  defaultValue={datosForm.fecha}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue = {moment(new Date()).format("YYYY-MM-DD")}
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
              ultimoCompromiso={handleCompromiso}
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
