import React, { Component, useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import ListaProgramas from "../ListaProgramas";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles, ListItem, ListItemText, List } from "@material-ui/core";
import { GET } from "../../../Conexion/Controller";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Programas from "../../../pages/Coordinador/Programas";
import ComboBoxFacu from "./ComboBoxFacus"
import errorObj from "../FormRegistroTutor/errorObj";
import validateName from "../FormRegistroTutor/validateName.js";
import Alertas from "../Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { getUser } from "../../../Sesion/Sesion";


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



const  ModificarPrograma = (props) => {
  const {programa,parentCallback}=props;
  const [flag, setFlag] = useState(0);//actualizar lista 
  const [datosForm, setDatosForm] = React.useState({
    ID_FACULTAD:"",
    ID_PROGRAMA:"",
    ID_INSTITUCION:"",
    NOMBRE: "",
    IMAGEN: null,
    NOMBREFACU:"",
    COORDINADORES:[]
  });
  const [pDisabled, setPDisabled] = useState(true);
  const [errors, setErrors] = useState(errorObj);  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");
  const [alerta, setAlerta]=useState({
    mensajeStrong: "",
    mensajeStrongError: "por favor revisalos!",
    mensajeStrongExito: "satisfactoriamente!",
    mensajeError: "Existen errores al completar el formulario",
    mensajeExito: "Programa registrado",
    mensaje: "",
  });
  const [severidad, setSeveridad] = useState({
    severidad:"",
    severW:"warning",
    severE:"error",
    severS:"success"
  });

  /*/facultades por coordinador
  useEffect(() => {
    async function fetchData() {
      console.log("idCoordinador: ",getUser().usuario.ID_USUARIO);
      const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("facultades:", res);
      setFacultades(res.facultades);
      console.log("facultades:", facultades);
    }
     fetchData();
  }, {});*/

  useEffect(() => {
    async function fetchData() {
        console.log("cpp",getUser().rol );
      if(getUser().rol === "Coordinador Facultad"){
        const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
        const params = { servicio: endpoint };
        const res = await GET(params);    
        console.log("facultades:", res);
        setFacultades(res.facultades);
        console.log("facultad:", facultades);
      }else{
        const endpoint = "/api/facultad/lista/"+getUser().usuario.ID_USUARIO;
        const params = { servicio: endpoint };
        const res = await GET(params);    
        console.log("ENTREE:", res);
        setFacultades(res.facultades);
        console.log("facultades:", facultades);
      }
    }
     fetchData();
  }, {});

  useEffect(() => {
    function fetchData() {
      datosForm.ID_FACULTAD=programa.ID_FACULTAD;
      datosForm.ID_PROGRAMA=programa.ID_PROGRAMA;
      datosForm.NOMBRE=programa.NOMBRE;
      datosForm.ID_INSTITUCION=programa.ID_INSTITUCION;
      datosForm.NOMBREFACU=programa.FACULTAD.NOMBRE;
      datosForm.COORDINADORES=programa.ROL_X_USUARIO_X_PROGRAMAs;
      setDatosForm({
        ...
        datosForm,
      });
      console.log("datosForm:", datosForm);
    }
     fetchData();
  }, {});

  const handleChangeSelected = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = async (e, datosForm, setDatosForm) => {
    if (
      errors.name.error || datosForm.NOMBRE===''
    ) {
      setSeveridad({
        severidad:severidad.severE,
      });     
      setAlerta({
        mensaje:alerta.mensajeError,
      });      
      console.log("severidad= ",severidad.severidad);

      return;
    } else {
      console.log("id_facu",facultad);
      datosForm.ID_FACULTAD=facultad!==""? facultad:programa.ID_FACULTAD;
      setDatosForm({
        ...datosForm,
      });
      console.log(datosForm);

      const props = { servicio: "/api/programa/modificar", request: {programa: datosForm} };
      console.log("saving new prog in DB:",  datosForm);
      let nuevoProg = await Conexion.POST(props);
      console.log("got updated prog from back:", nuevoProg);
     if (nuevoProg){
      if (nuevoProg.modificacion.ok===1){ 
          setSeveridad({
            severidad:"success",
          });     
          setAlerta({
            mensaje:"Programa Modificado Satisfactoriamente",
          });      
          console.log("severidad= ",severidad.severidad);
          //setOpen(false);        
      
      }else{
        setSeveridad({
          severidad:"error",
        });     
        setAlerta({
          mensaje:"El programa ya existe",
        });      
        console.log("severidad= ",severidad.severidad);      
      }
    }
    const newValue = flag + 1;
    setFlag(newValue);
    parentCallback(newValue);

    }  
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
      <Alertas
        severity={severidad.severidad}
        titulo={"Observacion:"}
        alerta={alerta}
      />
        <DialogTitle id="form-dialog-title">
        <Grid container  md={12} justify="space-between" direction="row">          
            <Grid item md={11} >
              Formulario de Registro de Programa
            </Grid>
            <Grid item md={1} alignContent="flex-end">
              <CloseRoundedIcon onClick={props.close}/>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} sm container>
            <Grid item xs container direction="column" justify={"center"} spacing={2}>
              <Grid item xs>
                <TextField
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
                  <ComboBoxFacu
                  facultades={facultades}
                  facultad={facultad}
                  setFacultad={setFacultad}
                  nombre={datosForm.NOMBREFACU}
                  id={datosForm.ID_FACULTAD}
                /> 
              </Grid>
              <Grid>
                {console.log(datosForm.COORDINADORES)}
                {datosForm.COORDINADORES!==undefined &&
                <List>
                <Grid item style={{marginLeft:"2%"}}>
                  <h3>Lista Coordinadores:</h3>
                </Grid>
                  {datosForm.COORDINADORES.map((value) => {
                      return (
                      <ListItem>
                          <ListItemText primary={value.USUARIO.NOMBRE+" "+value.USUARIO.APELLIDOS} />
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
            onClick={props.close} color="primary">
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
export default  ModificarPrograma;
