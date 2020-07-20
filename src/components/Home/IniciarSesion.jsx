import React, { Component } from "react";
import { Paper, Grid, Button, Typography, Divider } from "@material-ui/core";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import SaltoDeLinea from "../Shared/SaltoDeLinea";
import { UserContext, getUser } from "../../Sesion/Sesion";
import { iniciarSesion } from "../../Sesion/actions/sesionAction";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import Alertas from "../Coordinador/Alertas";

class IniciarSesion extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {
      Usuario: "",
      Contrasenia: "",
      errores: [],
      alert: {
        mensajeStrong: "",
        mensajeStrongError: "por favor revísalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "El nombre de usuario o contraseña son incorrectos",
        mensajeExito: "Proceso de Tutoría registrado",
        mensaje: "",
      },
      severidad: "warning",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
    this.onSignInNormal = this.onSignInNormal.bind(this);
    // this.onFailure = this.onFailure.bind(this);
    this.mostrarAlert = this.mostrarAlert.bind(this);
    this.limpiarAlerta = this.limpiarAlerta.bind(this);
  }
  validarEntrada(error) {
    console.log("errores:", error);
  }
  onSignInNormal = async (e) => {
    e.preventDefault();
    //console.log("validacion al click: ", this.state.errores);
    let [{ usuario }, dispatch] = this.context;
    console.log("this.context ", usuario);
    const { Usuario, Contrasenia } = this.state;
    //console.log("GAAAAAA"+Usuario+" "+Contrasenia);

    let status = await iniciarSesion(dispatch, Usuario, Contrasenia);
    console.log("LOGIN: ", status);
    if (status.error) {
      this.mostrarAlert();
      return;
    }
    if (status.status) {
      console.log("Parece que login", status);
      const move_to = status.data;
      //console.log(move_to.ROL_X_USUARIO_X_PROGRAMAs);
      this.props.history.push("./" + move_to.rol.toLowerCase().split(" ")[0]);
    } else {
      this.mostrarAlert();
      console.log("Parece NO que login", status);
      //levanar alerta de fallo en iniciar sesion
    }
  };
  async mostrarAlert() {
    new Promise(async (resolve, reject) => {
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = "Revisalos y vuelve a intentar";
      console.log("LOGIN: ", alert);
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });
      resolve();
    });

    new Promise(async (resolve, reject) => {
      await setTimeout(async () => {
        this.limpiarAlerta();
      }, 3000);
      resolve();
    });
  }
  limpiarAlerta() {
    let alert = Object.assign({}, this.state.alert);
    alert.mensaje = "";
    alert.mensajeStrong = "";
    this.setState({ alert: alert });
    this.setState({ severidad: "warning" });
  }
  handleOnChange = (e) => {
    this.setState({ [e.name]: e.value });
  };
  render() {
    let yo = getUser();
    console.log("DESTNO", yo);

    if (yo) {
      //en caso ya este logueado
      const DESTINO = yo.rol.toLowerCase().split(" ")[0];
      this.props.history.push("./" + DESTINO);
      console.log("DESTNO", DESTINO);
    }
    return (
      <>
        <Grid container spacing={0}>
          <Grid item md={4} xs={4} />
          {/** automargen */}
          <Grid item md={6} xs={6}>
            <Paper elevation={5} style={estilos.paper}>
              <Grid container spacing={0}>
                <Grid item md={12} xs={12}>
                  <Alertas
                    severity={this.state.severidad}
                    titulo={"Observacion"}
                    alerta={this.state.alert}
                  />
                </Grid>
                <Grid item md={2} xs={2}></Grid>
                <Grid item md={8} xs={8}>
                  <img
                    style={estilos.logo}
                    src="https://ututor-recursos.s3.amazonaws.com/Imagenes/ututor-main-logo-inverted.png"
                    alt="logo-ututor"
                  />
                  <Typography variant="h6" align="center">
                    Iniciar Sesión
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
                    inicial="josefeliciano@pucp.edu.pe"
                    validacion={{ lim: 30 }}
                    onChange={this.handleOnChange}
                    validarEntrada={this.validarEntrada}
                  />
                  {/* Contraseña */}
                  <CampoDeTexto
                    requerido={true}
                    autoFocus={true}
                    name="Contrasenia"
                    label="Contraseña"
                    inicial="contra"
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
                        onClick={this.onSignInNormal}
                      >
                        Iniciar Sesión
                      </Button>
                    </Grid>
                    <Grid item md={1} xs={1}></Grid>
                  </Grid>
                  <SaltoDeLinea N={1} />
                  <Divider variant="middle" />

                  <h5 align="center">o Inicia Sesión con Google</h5>
                  {/** google */}
                  <Grid container spacing={0}>
                    <Grid item md={1} xs={1}></Grid>
                    <Grid item md={10} xs={10}>
                      <div
                        className="g-signin2"
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
          <button
            id="AlertGmail"
            style={{ display: "none" }}
            onClick={this.mostrarAlert}
          ></button>
        </Grid>
      </>
    );
  }
}

export default compose(withRouter)(IniciarSesion);
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
