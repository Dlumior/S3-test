import React,{useState,useEffect} from "react";
//import useFetchData from "../../Conexion/useFetchData";
import { GET,POST } from "../../../Conexion/Controller";
import { Grid, TextField, Typography, Button, IconButton} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText} from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import ComboBoxPrograma from "../../Coordinador/FormRegistroTutor/comboBoxProgramas";
import ComboBoxFacus from "../../Coordinador/RegistrarCoordPrograma/ComboBoxFacus";
import ComboBoxProcesoTutoria from "../../Coordinador/FormAsignacion/ComboBoxProcesoTutoria";
import ListaAsignaciones from "../../Coordinador/FormAsignacion/ListaAsignaciones";
import ListaAlumnos from "../../Coordinador/FormAsignacion/ListaAlumnosPorPrograma";
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import Looks3RoundedIcon from '@material-ui/icons/Looks3Rounded';
import Alertas from "../../Coordinador/Alertas";


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight:"3%",
      marginBottom:"3%",
      display: "flex",
      alignItems: "left",
      flexDirection: "row",
      backgroundImage: "",
    },
    paper2: {
      marginTop: "1%",
      marginLeft: "3%",
      marginRight:"3%",
      marginBottom:"3%",
      display: "flex",
      flexDirection: "row",
      alignItems: "left",
      backgroundImage: "",
    },
    paper3: {
        marginTop: "3%",
        marginLeft: "3%",
        marginRight:"3%",
        marginBottom:"3%",
        display: "flex",
      },
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

const FrmHistorialAsignacion = () => {
const [datosForm, setDatosForm] = React.useState({
    usuarioCodigo:0,
    usuarioNombre:'',
    fecha: new Date(),
    horaini:'',
    horafin:0,
    lugar:'',
});
const [facultades, setFacultades] = useState([]);
const [facultad, setFacultad] = useState("");
const [programas, setProgramas] = useState([]);
const [programa, setPrograma] = useState("");  
const [procesosTutoria, setProcesosTutoria] = useState([]);
const [procesoTutoria, setProcesoTutoria] = useState("");
const [alumnos,setAlumnos]=useState([]);
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
    const endpoint = "/api/tutoriafija/"+programa;
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

const handleOnChangeAlumnos = (alumnos) => {
    console.log("alumnos: ",alumnos );
    setAlumnos(alumnos);
  };

const handleOnClick = async(e) => {
    if (datosForm.fecha == "" || datosForm.horaini == "" || datosForm.horafin == "0" || alumnos == []) {
        setSeveridad({
          severidad:"error",
        }); 
        setAlerta({
          mensaje:"Complete los campos obligatorios (*)",
        }); 
      } else {
        const nuevaSesion = {
          sesion: {
            ID_TUTOR: (getUser()).usuario.ID_USUARIO,
            ID_PROCESO_TUTORIA: procesoTutoria,
            LUGAR: datosForm.lugar,
            FECHA: datosForm.fecha,
            HORA_INICIO: datosForm.horaini,
            HORA_FIN: datosForm.horafin,
            ALUMNOS:alumnos,
          },
        }
        const props = { servicio: "/api/registrarSesion", request: nuevaSesion };
        console.log("saving new sesion in DB:", nuevaSesion);
        let sesion = await POST(props);
        console.log("sesion debug xaeee: ", sesion);
        if (sesion) {
          console.log("ENTRE AL IF: ");
          setSeveridad({
            severidad:"success",
          }); 
          setAlerta({
            mensaje:"La sesión se ha registrado satisfactoriamente",
          }); 
        }
        console.log("got updated sesion from back:", sesion);
      }
    };

  return (
      <div>
        <Alertas
        severity={severidad.severidad}
        titulo={"Observacion:"}
        alerta={alerta}
        />
        <Paper style={style.paper}>        
        <Grid container md={12} style={style.paper2} spacing={3}>            
            <Grid item md={12}>
                <Typography variant="h6">
                    Datos Sesión
                </Typography>
            </Grid>
            <Grid item md={3}>
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
            <Grid item md={3} >
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
            <Grid item md={3} >
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
            <Grid item md={3}>
              <TextField
                  id="lugar"
                  label="Lugar"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={12}>
                <Typography variant="h6">
                    Seleccionar Alumnos
                </Typography>
            </Grid>
            <Grid item md={3}>
                <ComboBoxFacus
                    facultades={facultades}
                    facultad={facultad}
                    setFacultad={setFacultad}
                /> 
            </Grid>
            <Grid item md={2} style={{marginRight:"5%"}}>
                <ComboBoxPrograma
                    programas={programas}
                    programa={programa}
                    setPrograma={setPrograma}
                />
            </Grid>
            <Grid item md={3}>
                <ComboBoxProcesoTutoria
                    procesosTutoria={procesosTutoria}
                    procesoTutoria={procesoTutoria}
                    setProcesoTutoria={setProcesoTutoria}
                />
            </Grid>
        </Grid>
        </Paper>
        {/*<Paper elevation={0} style={style.paper}>
            Tabla Tutores por proceso de tutoria
          </Paper>*/}
        {procesoTutoria &&
            <Grid md={12}>
                <ListaAsignaciones idTutoria={procesoTutoria}/> 
            </Grid> 
        }
        {procesoTutoria &&
        <Grid style={style.paper2} justify="flex-end">
            <Button variant="contained" color="primary"
                onClick={handleOnClick}>
                Guardar
            </Button>
        </Grid> }            
      </div>
  );
}

export default FrmHistorialAsignacion;

