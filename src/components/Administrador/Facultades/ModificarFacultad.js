import React, {  useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles, List, ListItem, ListItemText } from "@material-ui/core";
import { GET } from "../../../Conexion/Controller";
import Alertas from "../../Coordinador/Alertas"
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {getUser} from "../../../Sesion/Sesion";

import errorObj from "../../Coordinador/FormRegistroTutor/errorObj";
import validateName from "../../Coordinador/FormRegistroTutor/validateName.js";

const useStyles = makeStyles((theme) => ({
  foto: {
    backgroundImage:
      "url(https://pps.whatsapp.net/v/t61.24694-24/97969579_3102912936463371_7208379054937379558_n.jpg?oe=5EC495F5&oh=68e4ca58a0f65f680df95105f6ba41ae)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    alignItems:"center",
    padding: theme.spacing(5),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const handleName = (e, datosForm, setDatosForm, errors, setErrors) => {
    setDatosForm({
      ...datosForm,
      NOMBRE: e.target.value,
    });
    const res = validateName(e.target.value);
    setErrors({ ...errors, name: res });
};

const handleDiasDisponibilidad = (e, datosForm, setDatosForm) => {
  setDatosForm({
    ...datosForm,
    DIAS_DISP: Number(e.target.value),
  });
  //console.log("valuedisp",e.target.value);
  //console.log("valuedisp",datosForm.DIAS_DISP);

};
const handleDiasCancelacionCita = (e, datosForm, setDatosForm) => {
  setDatosForm({
    ...datosForm,
    DIAS_CITA: Number(e.target.value),
  });
};
const ModificarFacultad = (props) => {
  const {open,close,facultad,parentCallback}=props;
  const [flag, setFlag] = useState(0);//actualizar lista facu

  const [datosForm, setDatosForm] = React.useState({
    ID_INSTITUCION:"",
    ID_FACULTAD:"",
    ID_PROGRAMA:"",
    NOMBRE: "",
    IMAGEN: null,
    DIAS_DISP:0,
    DIAS_CITA:0,
  });
  const [coordinadores, setCoordinadores] = useState([]);
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

  const [errors, setErrors] = useState(errorObj);

  const [selectedValue, setSelectedValue] = React.useState();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    function fetchData() {  
      datosForm.ID_FACULTAD=facultad.ID_FACULTAD;
      datosForm.ID_PROGRAMA=facultad.ID_PROGRAMA;
      datosForm.NOMBRE=facultad.NOMBRE;
      datosForm.ID_INSTITUCION=facultad.ID_INSTITUCION;
      datosForm.DIAS_DISP=facultad.ANTICIPACION_DISPONIBILIDAD;
      datosForm.DIAS_CITA=facultad.ANTICIPACION_CANCELAR_CITA;

      //datosForm.COORDINADORES=props.facultad.ROL_X_USUARIO_X_PROGRAMAs;
      setDatosForm({
        ...
        datosForm,
      });
      //console.log("datosForm:", datosForm);
      //console.log("flag",props.flag);
    }
     fetchData();
  }, {});

  //coordinadores de la facultad
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/facultad/"+facultad.ID_PROGRAMA;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      //console.log("coordinadores de la facu:", res);
      if (res.facultad){
        setCoordinadores(res.facultad.USUARIOs);
      }      
      //console.log("coord:", coordinadores);
    }
     fetchData();
  }, {});

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
    //agregar condicion para que cree una programa unico asignado a esa facultad
  };

  

  const handleClick = async (e, datosForm, setDatosForm) => {
    if (
      errors.name.error || datosForm.NOMBRE===''
    ) {
      setSeveridad({
        severidad:severidad.severE,
      });     
      setAlerta({
        mensaje:"Existen errores al completar el formulario",
      });      
      //console.log("severidad= ",severidad.severidad);
      return;
    } else {
      /*
      if (checked){
        datosForm.INDEPENDIENTE=1;
      }else{
        datosForm.INDEPENDIENTE=0;
      }*/
      //console.log("disp",datosForm.DIAS_DISP);
      //datosForm.DIAS_DISP=parseInt(datosForm.DIAS_DISP);
      setDatosForm({
        ...datosForm
      });
      //console.log(datosForm);

      const props = { servicio: "/api/facultad/modificar", request: {facultad: datosForm} };
      //console.log("saving new coord in DB:", datosForm);
      let nuevaFacu = await Conexion.POST(props);
      //console.log("got updated coord from back:", nuevaFacu);

      //si se registro bien ok==1, duplicado ok===0, otro error=-1
      if (nuevaFacu){
        if(nuevaFacu.modificacion.ok===1){
          setSeveridad({
            severidad:"success",
          });     
          setAlerta({
            mensaje:"Facultad modificada satifactoriamente",
          });      
          //console.log("severidad= ",severidad.severidad);
          
  
        }else{
          setSeveridad({
            severidad:"error",
          });     
          setAlerta({
            mensaje:"La Facultad ya ha sido registrada",
          });      
  
        }
      }
      
      //actualizamos lista 
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
        <Grid container md={12} spacing={1}>
            <Grid item md={11} >
              Formulario Modificación de Facultad
            </Grid>
            <Grid item md={1} alignContent="flex-end">
              <CloseRoundedIcon onClick={close}/>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid item md={12} sm container>
            <Grid item xs container direction="column" justify={"center"} spacing={2}>
              <Grid item xs>
                <TextField
                disabled
                  required
                  error={errors.name.error}
                  margin="dense"
                  id="NOMBRE"
                  label="Nombre"
                  value={datosForm.NOMBRE}
                  fullWidth
                  onChange={(e) => handleName(e, datosForm, setDatosForm, errors, setErrors)}
                  helperText={errors.name.mesage}
                />
              </Grid>
              <Grid item>
                {getUser().rol!=="Administrador" &&
                  <TextField
                  margin="dense"
                  id="antDias"
                  label="Días de anticipación al registrar disponibilidad"
                  fullWidth
                  defaultValue={datosForm.DIAS_DISP? datosForm.DIAS_DISP:0}
                  onChange={(e) => handleDiasDisponibilidad(e, datosForm, setDatosForm)}
                  type= "number"
                  inputProps = {{min: 0}}                
                />}
              </Grid>
              <Grid item>
                {getUser().rol!=="Administrador" &&
                  <TextField
                  margin="dense"
                  id="antDias"
                  label="Días de anticipación al cancelar una cita"
                  defaultValue={datosForm.DIAS_CITA? datosForm.DIAS_CITA:0}
                  fullWidth
                  onChange={(e) => handleDiasCancelacionCita(e, datosForm, setDatosForm)}
                  type= "number"
                  inputProps = {{min: 0}}                
                />}
              </Grid>
            <Grid item>
            {/*<Checkbox
              checked={checked}
              onChange={handleChangeChecked}
              color="primary"
              label="Facultad Independiente"
            />
            <Typography variant="h7" align="center">
                {" "}Facultad Independiente
            </Typography>*/}
            {getUser().rol==="Administrador" &&
            coordinadores!==undefined &&
                <List>
                <Grid item style={{marginLeft:"2%"}}>
                  <h3>Lista Coordinadores:</h3>
                </Grid>
                  {coordinadores.map((value) => {
                      return (
                      <ListItem>
                          <ListItemText primary={value.NOMBRE+" "+value.APELLIDOS} />
                      </ListItem>
                      );
                  })}
                  </List>}
            </Grid>
            </Grid>
            </Grid>
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
export default ModificarFacultad;
