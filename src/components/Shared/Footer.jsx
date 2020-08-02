import { Grid, withStyles, TextField, Paper, Button, } from "@material-ui/core";
import React, { Component } from "react";
import { GET, POST } from "../../Conexion/Controller";
import "./Footer.css";
import ImagenCircular from "./ImagenCircular";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import { openMensajePantalla } from "../../Sesion/actions/dialogAction";
import { DialogContext } from "../../Sesion/dialog";
const styles = (theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    alignText: "center",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class Footer extends Component {
  static contextType = DialogContext;

  constructor() {
    super();
    this.state = {
      institucion: undefined,
      motivoSugerencia: "",
      dataMotivo: "",
      esValido: true,

    };

    this.handleOnclickEnviarBuzon = this.handleOnclickEnviarBuzon.bind(this);
    this.handleOnCloseSugerenciaEnviada = this.handleOnCloseSugerenciaEnviada.bind(this);



  };


  handleOnCloseSugerenciaEnviada() {
    this.setState({ dataMotivo: "", open: false });
  }

  async handleOnclickEnviarBuzon() {

    const nuevaSolicitud = {
      sugerencia: this.state.motivoSugerencia,
    };

    console.log(">>RESUL=>", nuevaSolicitud);
    const props = { servicio: "/api/sugerencia", request: nuevaSolicitud };
    let sesionTyS = await POST(props);

    if (!sesionTyS) return;

    console.log("SESIONtYS XXX ", sesionTyS);

    if (!sesionTyS.message) {
      if (!sesionTyS.error) {
        let [{ openMensaje, mensaje }, dispatchDialog] = this.context;
        openMensajePantalla(dispatchDialog, {
          postClose: this.handleOnCloseSugerenciaEnviada,
          open: true,
          mensaje:
            "C>¡ Sugerencia Enviada Satisfactoriamente !",
        });
        this.setState({ actuTys: !this.state.actuTys });

        //this.setState({ mensajillo: "¡ Resultados Registrados Satisfactoriamente !" });

      }

      else {
        // this.setState({
        //     mensajillo:
        //       "Ups, Error Inesperado.   Por favor, Inténtelo más tarde.",
        //   });
        let [{ openMensaje, mensaje }, dispatchDialog] = this.context;

        openMensajePantalla(dispatchDialog, {
          open: true,
          mensaje:
            "X>Ups, Error Inesperado.   Por favor, Inténtelo más tarde.",
        });
      }

    } else {

      //this.setState({ mensajillo: sesionTyS.message });
      let [{ openMensaje, mensaje }, dispatchDialog] = this.context;

      openMensajePantalla(dispatchDialog, {
        open: true,
        mensaje:
          `X>${sesionTyS.message}`,
      });
    }


  }

  async componentDidMount() {
    let institucion = await GET({ servicio: "/api/institucion" });
    if (institucion?.institucion) {
      this.setState({ institucion });
    }
  }

  handleOnChangeCT = (e) => {
    if (e.target.value.length === 0) {
      this.setState({
        mensajeError: "¡ Debe ingresar un mensaje !",
        esValido: true,
      }); //que seria un "es invalido"
    } else {
      this.setState({ mensajeError: "", esValido: false });
    }

    this.setState({ [e.target.name]: e.target.value });
    this.setState({ motivoSugerencia: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { institucion } = this.state;
    return (
      <div>
        <footer>
        <div class="footer-wrap">
          <div class="container">
            <div className={classes.sectionDesktop}>
              <Grid container spacing={0}>
                <Grid item md={1} ></Grid>
                <Grid item md={2} xs={12}>
                  <ImagenCircular
                    size={"xs"}
                    square={true}
                    src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
                  />
                  <p class="text-justify">
                    <strong>{"uTutor.net "}</strong>
                    es una plataforma web de gestión y administracion de
                    procesos de tutorias. Esta dirigida para apoyar el desempeño
                    profesional de alumnos de la Pontificia Universidad Católica
                    del Perú.
                  </p>
                </Grid>

                <Grid item md={3} xs={12}>
                  <h3 style={{ textAlign: "center" }}>NOSOTROS</h3>
                  <p class="text-justify">
                    <ul>
                      <li>
                        {
                          "Proyecto desarrollado por el grupo KND-Los Chicos de Software de para el curso de Ingeniería de Software - PUCP"
                        }
                      </li>
                      <li>
                        {
                          "Este proyecto fue implementato utilizando react.js y Express.js y está corriendo en una maquina virtual en Amazon AWS."
                        }
                      </li>
                    </ul>

                    {/*<a href="about-us.html">Read More</a>
                     */}
                  </p>
                </Grid>
                <Grid item md={2} xs={12}>
                  <h3 style={{ textAlign: "center" }}>Ubícanos</h3>

                  <div class="address">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {institucion?.UBICACION || " Av. Universitaria 1801, San Miguel Lima 32, Perú"}
                  </div>
                  <div class="address">
                    <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                    {institucion?.TELEFONO || "(01) 626-2000"}
                  </div>
                </Grid>



                <Grid item md={3} xs={12}>
                  <h3 style={{ textAlign: "center" }}>Envíanos tus sugerencias: </h3>

                  <Paper elevation={0} style={estilos.paper}>
                    <Grid container spacing={0}>
                      <Grid item md={12}>
                        <TextField
                          style={{ marginTop: "5%", }}
                          value={this.state.dataMotivo}
                          color="primary"
                          autoFocus={true}
                          name="dataMotivo"
                          label="Ingrese su sugerencia aquí "
                          fullWidth
                          //validacion={{ lim: 100 }}
                          variant={"outlined"}
                          rows={6}
                          multiline={true}
                          required={true}
                          // inicial=""
                          onChange={this.handleOnChangeCT}
                        //validarEntrada={this.validarEntradaCT}
                        />

                        <br />
                      </Grid>
                    </Grid>

                    <div style={{ textAlign: "center" }}>
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        disabled={this.state.esInvalido}
                        onClick={this.handleOnclickEnviarBuzon}   >
                        Enviar
                      </Button>
                      <br />
                    </div>

                  </Paper>
                </Grid>
                <Grid item md={1} ></Grid>

              </Grid>
            </div>
            <div className={classes.sectionMobile}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <ImagenCircular
                  size={"xs"}
                  square={true}
                  src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
                />
                <p class="text-justify">
                  <strong>{"uTutor.net "}</strong>
                  es una plataforma web de gestión y administracion de procesos
                  de tutorias. Está dirigida para apoyar el desempeño
                  profesional de alumnos de la Pontificia Universidad Católica
                  del Perú.
                </p>
              </Grid>
            </div>
            <div class="copyright">
              Copyright © 2020 uTutor.net | {institucion?.NOMBRE || "PUCP"} - Todos los derechos reservados.
            </div>
          </div>
        </div>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);

const estilos = {
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
    flexDirection: "column",
  },
};