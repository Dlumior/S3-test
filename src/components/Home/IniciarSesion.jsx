import React, { Component } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormHelperText,
  Typography,
  Divider,
} from "@material-ui/core";
import { POST } from "../../Conexion/Controller";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import SaltoDeLinea from "../Shared/SaltoDeLinea";

class IniciarSesion extends Component {
  constructor() {
    super();
    this.state = {
      usuario: {
        Usuario: "",
        Contraseña: "",
      },
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }
  validarEntrada(error) {
    console.log("errores:", error);
  }
  async handleOnClick(e) {
    console.log("validacion al click: ", this.state.errores);
    /*if (this.state.errores.length === 0) {
      e.preventDefault();
      console.log("alumno: ", this.state.alumno);
      let {
        nombres,
        apellidos,
        codigo,
        correo,
        programa,
        telefono,
        direccion,
      } = this.state.alumno;
      const nuevoEstudiante = {
        alumno: {
          APELLIDOS: apellidos,
          CODIGO: codigo,
          CONTRASENHA: "sudo tys",
          CORREO: correo,
          DIRECCION: direccion,
          NOMBRE: nombres,
          PROGRAMA: programa,
          TELEFONO: telefono,
          USUARIO: "UsuarioPruebaRegistrar",
          ETIQUETA: this.state.etiqueta,
        },
      };
      const props = { servicio: "/api/alumno", request: nuevoEstudiante };
      console.log("saving new student in DB:", nuevoEstudiante);
      let nuevoAlumno = await POST(props);
      if (nuevoAlumno) {
        let alert = Object.assign({}, this.state.alert);
        alert.mensaje = alert.mensajeExito;
        alert.mensajeStrong = alert.mensajeStrongExito;
        this.setState({ alert: alert });
        this.setState({ severidad: "success" });
        this.state.alert.mensaje = this.state.alert.mensajeExito;
        //alert("Alumno registrado Satisfactoriamente");
        //entonces viajo al tab de listado de alumnos
      }
      console.log("got updated alumno from back:", nuevoAlumno);
    } else {
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = alert.mensajeStrongError;
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });

      this.state.alert.mensaje = this.state.alert.mensajeError;

      //mostrar warning
    }*/
  }
  handleOnChange = (e) => {
    // nombre y descripcion
    let usuario = Object.assign({}, this.state.usuario);
    console.log(e);
    usuario[e.name] = e.value;
    this.setState({ usuario: usuario });
    console.log("Show ", usuario);
  };

  onFailure(error) {
    console.log(error);
  }
  onSignIn(googleUser) {
    console.log("HAAAAAAAA");
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  render() {
    

    return (
      <Grid container spacing={0}>
        <Grid item md={4} xs={4} />
        {/** automargen */}
        <Grid item md={6} xs={6}>
          <Paper elevation={5} style={estilos.paper}>
            <Grid container spacing={0}>
              <Grid item md={2} xs={2}></Grid>
              <Grid item md={8} xs={8}>
                <img
                  style={estilos.logo}
                  src="https://ututor-recursos.s3.amazonaws.com/Imagenes/ututor-main-logo-inverted.png"
                  alt="logo-ututor"
                />
                <Typography variant="h6" align="center">
                  Iniciar Sesión en uTutor
                </Typography>
              </Grid>
              <Grid item md={2} xs={2} />
            </Grid>
            {/** formulario */}
            <Grid container spacing={0}>
              <Grid item md={12} xs={12}>
                {/* Usuario */}
                <CampoDeTexto
                  requerido={true}
                  autoFocus={true}
                  name="Usuario"
                  label="Usuario"
                  inicial=""
                  validacion={{ lim: 25 }}
                  onChange={this.handleOnChange}
                  validarEntrada={this.validarEntrada}
                />
                {/* Contraseña */}
                <CampoDeTexto
                  requerido={true}
                  autoFocus={true}
                  name="Contraseña"
                  label="Contraseña"
                  validacion={{ lim: 50 }}
                  onChange={this.handleOnChange}
                  validarEntrada={this.validarEntrada}
                  tipo={"password"}
                />
                {/* Guardar */}
                <br />
                <Grid container spacing={0}>
                  <Grid item md={1} xs={1}></Grid>
                  <Grid item md={10} xs={10}>
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={this.handleOnClick}
                    >
                      Iniciar Sesión
                    </Button>
                  </Grid>
                  <Grid item md={1} xs={1}></Grid>
                </Grid>
                <SaltoDeLinea N={2} />
                <Divider variant="middle" light />
                <Typography align="center">
                  <p>o Inicia Sesión con Gmail</p>
                </Typography>
                {/** google */}
                <Grid container spacing={0}>
                  <Grid item md={1} xs={1}></Grid>
                  <Grid item md={10} xs={10}>
                    <div
                      class="g-signin2"
                      data-onsuccess="onSignIn"
                      align="center"
                    ></div>
                  </Grid>
                  <Grid item md={1} xs={1}></Grid>
                </Grid>
                <SaltoDeLinea N={2} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/** automargen */}
        <Grid item md={4} xs={4} />
      </Grid>
    );
  }
}

export default IniciarSesion;
const estilos = {
  paper: {
    backgroundColor: "#ffffff",
    opacity: 0.84,
    marginTop: "1%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
    display: "flex",
    heigh: "100%",
    padding: "4%",
  },
  logo: {
    borderRadius: "50%",
    objectFit: "cover",
    width: "100%",
  },
};
