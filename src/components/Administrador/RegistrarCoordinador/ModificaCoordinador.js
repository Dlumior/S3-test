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
import ComboBoxFacuSelected from "./ComboBoxFacuSelected";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Alertas from "../../Coordinador/Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import {getUser} from "../../../Sesion/Sesion";

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

const ModificaCoordinador = (props) => {
  const {open,close,codigo,parentCallback}=props;
  const [datosForm, setDatosForm] = React.useState({
    ID:"",
    CODIGO: "",
    NOMBRE: "",
    APELLIDOS: "",
    CORREO: "",
    TELEFONO: "",
    USUARIO: "",
    DIRECCION: "",
    IMAGEN: null,
    FACULTAD:[],
  });
  const [flag, setFlag] = useState(0);//actualizar lista 

  const [programasSeleccionados,setProgramasSeleccionados]=useState([]);//facultades
  const [nombreFacultades,setNombreFacultades]=useState([]);//nombre facultades
  const [programaAñadido,setProgramaAñadido]=useState([]);//facultades

  const [programas, setProgramas] = useState([]);//las facultades que le muestra
  const [programa, setPrograma] = useState("");//Arrgelo de programas q selecciona
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
  const [cantProgramas, setCantPrograma]=useState(0);
      
  const handleCantPrograma = (func) => {
      if (func>0){
        if (func>cantProgramas){  
          setCantPrograma(cantProgramas => func);
          //console.log("func",func);
          if (programa!==""){
            programasSeleccionados.push(programa);
          }          
          //console.log("programasSelecc",programasSeleccionados);
          //console.log("programas ",programas);
          //console.log("programa ",programa);
        }else{
          setCantPrograma(cantProgramas => func);
          //console.log("func",func)
          if (programasSeleccionados.length>=cantProgramas){
            programasSeleccionados.splice(-1);
          }          
          //console.log("programasSelecc",programasSeleccionados)
        }
      }else{
        setCantPrograma(cantProgramas => 0);
      }
    };
  

  const renderPrograma = (cantProgramas) => {
      //console.log("cant=",cantProgramas);
      let n=cantProgramas;
      let arregloProg=[];
      for (let i=0;i<n;i++){
        arregloProg.push(i);
      }
        return(
          <div>
            <Grid item md={8}>
              {arregloProg.map((item) => (            
                  <ComboBoxFacuSelected
                    cantProgramas={cantProgramas}
                    programas={programas}
                    programa={programaAñadido[item]}
                    setPrograma={setPrograma}
                    setProgramas={setProgramas}
                    nombre={nombreFacultades[item]}
                  />      
              ))}
            </Grid>
          </div> 
      );    
  }

 useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/coordinador/"+props.id;
    const params = { servicio: endpoint };
    const res = await GET(params);    
    //console.log("COORDINADOR:", res);
    if (res){
      datosForm.ID=res.coordinador.ID_USUARIO;
      datosForm.USUARIO=res.coordinador.USUARIO;
      datosForm.NOMBRE=res.coordinador.NOMBRE;
      datosForm.APELLIDOS=res.coordinador.APELLIDOS;
      datosForm.CORREO=res.coordinador.CORREO;
      datosForm.CODIGO=res.coordinador.CODIGO;
      datosForm.TELEFONO=res.coordinador.TELEFONO;
      datosForm.DIRECCION=res.coordinador.DIRECCION;    
    
      let cantProg=res.coordinador.PROGRAMAs.length;
      //console.log("long prog:", cantProg);
      setCantPrograma(cantProg);
  
      let arreglillo = [];
      for (let element of res.coordinador.PROGRAMAs){
  
        if (getUser().rol==="Administrador" && element.ROL_X_USUARIO_X_PROGRAMA.ID_ROL===6){
          programasSeleccionados.push(element.ID_PROGRAMA);
          nombreFacultades.push(element.NOMBRE); 
        }else if(getUser().rol==="Coordinador Facultad"){
          programasSeleccionados.push(element.ID_PROGRAMA);
          nombreFacultades.push(element.NOMBRE); 
        }
  
        //programa.push(element.ID_PROGRAMA);
      }
      //datosForm.FACULTAD=programasSeleccionados;
      //console.log("proogramaSelecc:", programasSeleccionados);
      //console.log("proogramaD:", programa);
      //console.log("nombreFacultades:", nombreFacultades);
  
      
    }
   

    setDatosForm({
      ...
      datosForm,
    });
    
    /*
    programasSeleccionados={programasSeleccionados}
    setProgramasSeleccionados={setProgramasSeleccionados}
    programa={programa}
    setPrograma={setPrograma}
    programas={programas}
    setProgramas={setProgramas

    */
    //console.log("datosForm:", datosForm);
    //setProgramas(res.facultad);
    ////console.log("COORDINADOR:", programa);
  }
   fetchData();
}, {});

useEffect(() => {
  async function fetchData() {
    if (getUser().rol==="Administrador"){
      const endpoint = "/api/facultad";
      const params = { servicio: endpoint };
      const res = await GET(params);    
      //console.log("proogramasss:", res);
      if (res){
        setProgramas(res.facultad);
      }
    }else{
      const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      //console.log("proogramasss:", res);
      if (res){
        setProgramas(res.facultades);
      }
    }
  }
   fetchData();
}, {});
/*
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setSeveridad({
      severidad:"",
    });     
    setAlerta({
      mensaje:"",
    });   
  };
*/
 

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
      //console.log("programa ha actualizar: ",programasSeleccionados);
      //console.log("programa",programa)

      if (programasSeleccionados.length<cantProgramas){
        programasSeleccionados.push(programa);
      }      
      //console.log("programasSelecc",programasSeleccionados)

      datosForm.FACULTAD=programasSeleccionados;
      setDatosForm({
        ...datosForm,
      });

      //console.log(datosForm);      
      const props = { servicio: "/api/coordinadorfacultad/modificar", request: {coordinador: datosForm} };
      //console.log("saving new coord in DB:", datosForm);
      let nuevoCoord = await Conexion.POST(props);
      //console.log("got updated coord from back:", nuevoCoord);
      if (nuevoCoord.error){
        setSeveridad({
          severidad:"error",
        });     
        setAlerta({
          mensaje:nuevoCoord.error,
        });      

      }else{
        if (nuevoCoord){    

          setSeveridad({
            severidad:severidad.severS,
          });     
          setAlerta({
            mensaje:"Se modificaron los datos del coordinador satisfactoriamente",
          });      
          //console.log("severidad= ",severidad.severidad);
        }

      }

      //actualizamos lista coord
      const newValue = flag + 1;
      setFlag(newValue);
      parentCallback(newValue);
      

    }  
    
  };


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
          <Grid container md={12}>
            <Grid item md={11} >
              Formulario de registro de coordinador
            </Grid>
            <Grid item md={1} alignItems="flex-end">
              <CloseRoundedIcon onClick={close}/>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container md={12} spacing={2}> 
            <Grid item md={12}>
              <TextField
                required
                disabled
                error={errors.code.error}
                margin="dense"
                id="CODIGO"
                label="Codigo"
                value={datosForm.CODIGO}
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
                value={datosForm.NOMBRE}
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
                value={datosForm.APELLIDOS}
                onChange={(e) => handleApellidos(e, datosForm, setDatosForm, errors, setErrors)}
                helperText={errors.lastnames.mesage}
                fullWidth
              />
              <TextField
                required
                disabled
                error={errors.email.error}
                margin="dense"
                id="CORREO"
                label="Correo electrónico"
                type="email"
                value={datosForm.CORREO}
                onChange={(e) => handleCorreo(e, datosForm, setDatosForm, errors, setErrors)}
                fullWidth
              />
              <TextField
                error={errors.phoneNumber.error}
                margin="dense"
                id="TELEFONO"
                label="Teléfono"
                value={datosForm.TELEFONO}
                onChange={(e) => handleTelefono(e, datosForm, setDatosForm, errors, setErrors)}
                fullWidth
              /> 
              {/*<Facultades
                programasSeleccionados={programasSeleccionados}
                setProgramasSeleccionados={setProgramasSeleccionados}
                programa={programa}
                setPrograma={setPrograma}
                programas={programas}
              setProgramas={setProgramas}/>*/ }
              <Grid container md={12} spacing={1}>
                <Grid item md={8} >
                      {/*<ComboBoxFacuSelected
                        cantProgramas={cantProgramas}
                        programas={programas}
                        programa={programa[0]}
                        setPrograma={setPrograma}
                        nombre={nombreFacultades[0]}
                      />*/}
                      {cantProgramas>0 ? renderPrograma(cantProgramas): null}  
                </Grid>                           
                    <Grid item md={4}> 
                        <IconButton color="primary" onClick={()=> handleCantPrograma(cantProgramas+1)}>
                        <AddBoxRoundedIcon
                        color="primary"
                        fontsize="large" />
                    </IconButton>
                    <IconButton color="primary" onClick={()=> handleCantPrograma(cantProgramas-1)}>
                        <IndeterminateCheckBoxRoundedIcon
                        color="primary"
                        fontsize="large" />
                    </IconButton> 
                    </Grid>         
                      
                </Grid>     
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={close} color="inherit">
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
export default ModificaCoordinador;

const estilo = {
  imagen: {
      width: "90%",
      borderRadius: "100%",
  }
}