/*import React, { Component } from "react";
import * as Conexion from "./../../Conexion/Controller";


import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles } from "@material-ui/core";

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

class RegistrarCoordinador extends Component {
  constructor() {
    super();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    this.state = {
      coordinador: {
        codigo: "",
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        usuario: "",
        contrasenha: "",
        direccion: ""
        //imagen: NULL,
      },
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    //const [open, setOpen] = React.useState(false);
    
  }
  async handleOnClick(e) {
    e.preventDefault(); //prevenir que se refresque la pantalla
    let {
      codigo,
      nombre,
      apellidos,
      correo,
      telefono,
      usuario,
      contrasenha,
      direccion
      //imagen,
    } = this.state.coordinador;
    const nuevoCoordinador = {
      coordinador: {
        codigo:codigo,
        nombre:nombre,
        apellidos:apellidos,
        correo:correo,
        telefono:telefono,
        usuario:usuario,
        contrasenha:contrasenha,
        direccion:direccion
        //imagen:imagen,
      },
    };
    const props = { endpoint: "/api/coordinador", request: nuevoCoordinador };
    console.log("cargando nuevo coordinador en la BD:", nuevoCoordinador);
    let nuevosCoordinadores = await Conexion.POST(props);
    console.log("got updated coord from back:", nuevosCoordinadores);
  }
  
  handleClickOpen = () => {
    setOpen(true);
  };

const handleName = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      nombre: e.target.value,
    });
};

  render() {
    return (
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
                id="codigo"
                label="Codigo"
                onChange={this.handleOnChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="nombre"
                label="Nombre"
                onChange={this.handleOnChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="apellido"
                label="Apellidos"
                onChange={this.handleOnChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="correo"
                label="Correo electrónico"
                type="email"
                onChange={this.handleOnChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="telefono"
                label="Teléfono"
                onChange={this.handleOnChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleOnClick} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}
*/

const handleCorreo = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      correo: e.target.value,
    });
};
const handleTelefono = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      correo: e.target.value,
    });
};

const RegistrarCoordinador = () => {
  
  const [datosForm, setDatosForm] = React.useState({
    codigo: "",
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    usuario: "",
    contrasenha: "",
    direccion: "",
    imagen: null,
  });
  const [res, apiMethod] = useFetchData({
    url: "/api/tutor",
    payload: datosForm,
  });
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e, datosForm, setDatosForm) => {
    setDatosForm({
      ...datosForm,
      contrasenha: datosForm.nombre + datosForm.apellidos,
    });
    apiMethod();
    console.log(datosForm);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
                id="codigo"
                label="Codigo"
                onChange={(e) => handleCodigo(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="nombre"
                label="Nombre"
                onChange={(e) => handleName(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="apellido"
                label="Apellidos"
                onChange={(e) => handleApellidos(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="correo"
                label="Correo electrónico"
                type="email"
                onChange={(e) => handleCorreo(e, datosForm, setDatosForm)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="telefono"
                label="Teléfono"
                onChange={(e) => handleTelefono(e, datosForm, setDatosForm)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>

          <Button 
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
            color="primary">
                
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
*/
//export default RegistrarCoordinador;
