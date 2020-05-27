import React, { Component, useEffect,useState } from "react";
import * as Conexion from "./../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import ListaProgramas from "../Coordinador/ListaProgramas";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { GET } from "../../Conexion/Controller";
import ComboBoxPrograma from "./ComboBoxPrograma";
import errorObj from "../Coordinador/FormRegistroTutor/errorObj.js";
import validateName from "../Coordinador/FormRegistroTutor/validateName.js";
import validateLastNames from "../Coordinador/FormRegistroTutor/validateLastNames.js";
import validatePhoneNumber from "../Coordinador/FormRegistroTutor/validatePhoneNumber.js";
import validateAddress from "../Coordinador/FormRegistroTutor/validateAddress.js";
import validateCode from "../Coordinador/FormRegistroTutor/validateCode.js";
import validateEmail from "../Coordinador/FormRegistroTutor/validateEmail.js";

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

const handleCodigo = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      CODIGO: e.target.value,
    });
    /*Busco por codigo, no debe repetirse, en caso devuelve datos del coord */
};

const handleName = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      NOMBRE: e.target.value,
    });
};

const handleApellidos = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      APELLIDOS: e.target.value,
    });
};

const handleCorreo = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      CORREO: e.target.value,
    });
};
const handleTelefono = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      TELEFONO: e.target.value,
    });
};
const RegistrarCoordinador = () => {
  const [datosForm, setDatosForm] = React.useState({
    ID_ROL:"2",
    CODIGO: "",
    NOMBRE: "",
    APELLIDOS: "",
    CORREO: "",
    TELEFONO: "",
    USUARIO: "",
    CONTRASENHA: "",
    DIRECCION: "",
    IMAGEN: null,
    PROGRAMA:"",
  });
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");
  const [pDisabled, setPDisabled] = useState(true);

  /*
  const [res, apiMethod] = useFetchData({
    url: "/api/coordinador",
    payload: datosForm,
  });
  */
 useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/programa";
    const params = { servicio: endpoint };
    const res = await GET(params);    
    console.log("proogramasss:", res);
    setProgramas(res.programa);
    console.log("proograma:", programa);
  }
   fetchData();
}, {});

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      CONTRASENHA: datosForm.nombre + datosForm.APELLIDOS,
    });
    if (datosForm.NOMBRE===''){      
      alert("Debe colocar un nombre");
    } else if (datosForm.APELLIDOS===''){      
      alert("Debe colocar un apellido");
    } else if (datosForm.CORREO===''){      
      alert("Debe colocar un correo");
    }else if (datosForm.CODIGO===''){      
      alert("Debe colocar un codigo");
    }else{
      const props = { servicio: "/api/coordinador", request: {coordinador: datosForm} };
      console.log("saving new coord in DB:", datosForm);
      let nuevoCoord = await Conexion.POST(props);
      console.log("got updated coord from back:", nuevoCoord);

      if (nuevoCoord){      
        alert("Se registro coordinador Correctamente");
      }

    }
/*
    apiMethod();
    console.log(datosForm);
*/
  };

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>

        Registrar coordinador
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Formulario de registro de coordinador
        </DialogTitle>
        <DialogContent>
          <Grid container xs={12}>
            <Grid item xs={4}>
              <Paper className={classes.foto}>Foto</Paper>
            </Grid>
            <Grid item xs={8}>
              <TextField
                autoFocus
                margin="dense"
                id="CODIGO"
                label="Codigo"
                onChange={(e) => handleCodigo(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="NOMBRE"
                label="Nombre"
                onChange={(e) => handleName(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="APELLIDOS"
                label="Apellidos"
                onChange={(e) => handleApellidos(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="CORREO"
                label="Correo electrónico"
                type="email"
                onChange={(e) => handleCorreo(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="TELEFONO"
                label="Teléfono"
                onChange={(e) => handleTelefono(e, datosForm, setDatosForm)}
                fullWidth
              />
              <ComboBoxPrograma
                setPDisabled={setPDisabled}
                programas={programas}
                programa={programa}
                setPrograma={setPrograma}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={handleClose} color="primary">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
            color="primary"
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RegistrarCoordinador;
