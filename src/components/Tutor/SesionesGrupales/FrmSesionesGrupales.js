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
import ListaGrupos from "./ListaGrupos";
import ListaAlumnos from "../../Coordinador/FormAsignacion/ListaAlumnosPorPrograma";
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import Looks3RoundedIcon from '@material-ui/icons/Looks3Rounded';
import Alertas from "../../Coordinador/Alertas";
import moment from "moment"


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
    //console.log("fecha",e.target.value);
    setDatosForm({
      ...datosForm,
      fecha: e.target.value,
    });
    //console.log("fecha",datosForm.fecha);
  };
  const handleHoraIni = async (e, datosForm, setDatosForm,duracion) => {
    //console.log("horaini",e.target.value);
    let hi=e.target.value;
    let hf;
    if (moment(e.target.value,'HH:mm').format('HH:mm')>moment('22:30','HH:mm').format('HH:mm')){
      if (duracion===30){
        document.getElementById("Hora").value = '23:30';
        hi=moment('23:30','HH:mm').format('HH:mm');
        hf=moment(e.target.value,'HH:mm').add(duracion,'minutes').format('HH:mm');
      }else if (duracion===60){
        document.getElementById("Hora").value = '23:00';
        hi=moment('23:00','HH:mm').format('HH:mm');
        hf=moment(e.target.value,'HH:mm').add(duracion,'minutes').format('HH:mm');
      }else if (duracion===90){
        document.getElementById("Hora").value = '22:30';
        hi=moment('22:30','HH:mm').format('HH:mm');
        hf=moment('00:00','HH:mm').format('HH:mm');
      }
    }
    //console.log("duracionn: ",duracion);
    //console.log("horaini: ",moment(e.target.value,'HH:mm').format('HH:mm'));
    //console.log("horafin: ",moment(e.target.value,'HH:mm').add(duracion,'minutes').format('HH:mm'));
    await setDatosForm({
      ...datosForm,
      horaini:moment(hi,'HH:mm').format('HH:mm'),
      horafin: moment(hi,'HH:mm').add(duracion,'minutes').format('HH:mm'),
    });
    //console.log("horaini",datosForm.horaini);   
  };
  
  const handleLugar = (e, datosForm, setDatosForm) => {
    //console.log("lugar",e.target.value);
    if (e.target.value.length > 45) {
      document.getElementById("lugar").value = e.target.value.substring(0,45);
    }
    setDatosForm({
      ...datosForm,
      lugar: e.target.value,
    });
    //console.log("lugar",datosForm.lugar);
  
  };

const FrmSesionesGrupales = () => {
const [datosForm, setDatosForm] = React.useState({
    usuarioCodigo:0,
    usuarioNombre:'',
    fecha: moment(new Date()).format("YYYY-MM-DD"),
    horaini:'',
    horafin:'',
    lugar:'',
});
const [facultades, setFacultades] = useState([]);
const [facultad, setFacultad] = useState("");
const [programas, setProgramas] = useState([]);
const [programa, setPrograma] = useState("");  
const [procesosTutoria, setProcesosTutoria] = useState([]);
const [procesoTutoria, setProcesoTutoria] = useState("");
const [duracion, setDuracion] = useState(0);
const [prDisabled, setPrDisabled] = useState(true);
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
      //console.log("facultades:", res);
      if (res){
        setFacultades(res.facultades);
        if(res.facultades[0]){
          setFacultad(res.facultades[0].FACULTAD.ID_PROGRAMA)
        }
      }      
      //console.log("facultad:", facultades);
    }
   fetchData();
}, {});

//programas a partir de un coordinador de Facultad
useEffect(() => {
    async function fetchData() {
        const endpoint = "/api/programa/lista/tutor/"+getUser().usuario.ID_USUARIO+"/"+facultad;
        const params = { servicio: endpoint };
        const res = await GET(params);    
        //console.log("proogramasss:", res);
        if (res){
            setProgramas(res.programas);
            if(res.programas[0]){
              setPrograma(res.programas[0].ID_PROGRAMA)
              console.log("asdf", res.programas)
            }
        }
        //console.log("proograma:", programas);
      }     
      if (facultad!=""){
          fetchData();
      }
},[facultad]);

//proceso de tutoria a partir de un programa
useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/tutoriagrupal/"+programa;
    const params = { servicio: endpoint };
    const res = await GET(params);
    //console.log("tutoria: ",res);
    if (res !== []) {
      setProcesosTutoria(res.tutoria);
      setDuracion(res.tutoria[0].DURACION);
      if(res.tutoria[0]){
        setProcesoTutoria(res.tutoria[0].ID_PROCESO_TUTORIA)
        console.log("asdf", res.tutoria)
      }
    }
  }
  if (facultad!=="" && programa !== "") {
    fetchData();
  }
},[programa]);

const handleOnChangeAlumnos = (alumnos) => {
    //console.log("alumnos: ",alumnos );
    setAlumnos(alumnos);
  };

const handleOnClick = async(e) => {
  //console.log("validacion",datosForm.fecha,datosForm.horaini,datosForm.horafin,alumnos);
    if (datosForm.fecha === "" || datosForm.horaini === "" || datosForm.horafin === "" || alumnos === []) {
        setSeveridad({
          severidad:"error",
        }); 
        setAlerta({
          mensaje:"Complete los campos obligatorios (*)",
        }); 
      } else {
        //console.log("alumnos: ",alumnos );
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
        const props = { servicio: "/api/crearSesionGrupal", request: nuevaSesion };
        //console.log("saving new sesion in DB:", nuevaSesion);
        let sesion = await POST(props);
        //console.log("sesion debug xaeee: ", sesion);
        if (sesion) {
          //console.log("ENTRE AL IF: ");
          setSeveridad({
            severidad:"success",
          }); 
          setAlerta({
            mensaje:"La sesión se ha registrado satisfactoriamente",
          }); 
          if (sesion.message || sesion.error){
            //console.log("ENTRE AL IF: ");
            setSeveridad({
              severidad:sesion.message? "warning" : "error",
            }); 
            setAlerta({
              mensaje:sesion.message? sesion.message : "Problema de conexión",
            });
          }
        }
        //console.log("got updated sesion from back:", sesion);
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
                <ComboBoxFacus
                    setPrDisabled={setPrDisabled}
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
            <Grid item md={12}>
                <Typography variant="h6">
                    {""}
                </Typography>
            </Grid>
            <Grid item md={3}>
              <TextField
                  disabled={procesoTutoria===""}
                  required
                  margin="dense"
                  type="date"
                  id="Fecha"
                  label="Fecha"
                  defaultValue={datosForm.fecha}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleFecha(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={3} >
              <TextField
                  disabled={procesoTutoria===""}
                  required
                  margin="dense"
                  type="time"
                  id="Hora"
                  label="Hora Inicio"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleHoraIni(e, datosForm, setDatosForm,duracion)}
                  fullWidth
              />
            </Grid>
            <Grid item md={3} >
              <TextField
                  disabled
                  margin="dense"
                  type="time"
                  id="Hora fin"
                  label="Hora Fin"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={datosForm.horafin}
                  fullWidth
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                  disabled={procesoTutoria===""}
                  id="lugar"
                  label="Lugar"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
        </Grid>
        </Paper>
        {procesoTutoria &&
            <Grid md={12}>
                <ListaGrupos idTutoria={procesoTutoria} escogerAlumnos={handleOnChangeAlumnos}/> 
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

export default FrmSesionesGrupales;

