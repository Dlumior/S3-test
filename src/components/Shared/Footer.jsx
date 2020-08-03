import { Grid, withStyles, TextField, Paper, Button, ThemeProvider } from "@material-ui/core";
import React, { Component } from "react";
import { GET, POST } from "../../Conexion/Controller";
import "./Footer.css";
import ImagenCircular from "./ImagenCircular";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import { openMensajePantalla } from "../../Sesion/actions/dialogAction";
import { DialogContext } from "../../Sesion/dialog";
import theme from "../../theme";

const style = {
  paper: {
    marginTop: "1%",
    marginLeft: "7%",
    marginRight: "7%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
    minHeight: 400,
  },
  paperTutor: {
    marginTop: "1%",
    marginLeft: "1%",
    marginRight: "1%",
  },
  papermini: {
    marginTop: "1%",
    marginLeft: "1%",
    marginRight: "1%",
  },
  envoltorioFormulario: {
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "2%",
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
  tabs: {
    backgroundColor: "#ffffff",
  },
};

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
    this.setState({ dataMotivo: "", open: false }); //<=aca es donde despues se limpia el campo
    this.setState({ esValido: true });

  }

  async handleOnclickEnviarBuzon() {

    const nuevaSolicitud = {
      sugerencia: this.state.motivoSugerencia,
    };

    console.log(">>RESUL=>", nuevaSolicitud);
    const props = { servicio: "/api/sugerencia", request: nuevaSolicitud };
    let sesionTyS = await POST(props);

    if (!sesionTyS) return;

    //console.log("SESIONtYS XXX ", sesionTyS);

    if (!sesionTyS.message) {
      if (!sesionTyS.error) {
        let [{ openMensaje, mensaje }, dispatchDialog] = this.context;
        openMensajePantalla(dispatchDialog, {
          postClose: this.handleOnCloseSugerenciaEnviada,
          open: true,
          mensaje:
            "C>¡ Sugerencia Enviada Satisfactoriamente !",
        });

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
      this.setState({ institucion: institucion.institucion });
    }
  }

  handleOnChangeCT = (e) => {
    if (e.target.value.length === 0) {
      this.setState({ esValido: true }); //que seria un "es invalido"
    } else {
      this.setState({ esValido: false });
    }

    this.setState({ [e.target.name]: e.target.value });
    this.setState({ motivoSugerencia: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { institucion } = this.state;
    return (


      <ThemeProvider theme={theme}>

        <Paper elevation={0} >
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
                        <strong>{"Ututor.net "}</strong>
                    es una plataforma web de gestión y administración de
                    procesos de tutorías. Está dirigida para apoyar el desempeño
                    profesional de alumnos de la Pontificia Universidad Católica
                    del Perú.
                  </p>
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <h3 style={{ textAlign: "center" }}>NOSOTROS</h3>

                      <ul class="a">
                        <li >
                          <p class="text-justify">
                            {
                              "Proyecto desarrollado por el grupo KND-Los Chicos de Software de para el curso de Ingeniería de Software - PUCP"
                            }
                          </p>

                        </li>
                        <li>
                          <p class="text-justify">

                            {
                              "Este proyecto fue implementato utilizando react.js y Express.js y está corriendo en una maquina virtual en Amazon AWS."
                            }
                          </p>


                        </li>
                      </ul>

                      {/*<a href="about-us.html">Read More</a>
                     */}

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

                      <Grid elevation={0} style={estilos.paper}>
                        <Paper container spacing={0}>
                          <Grid item md={12} style={{ marginBottom: "3%" }}>
                            <TextField
                              value={this.state.dataMotivo}
                              color="primary"
                              name="dataMotivo"
                              fullWidth
                              //validacion={{ lim: 100 }}
                              variant={"outlined"}
                              rows={5}
                              multiline={true}
                              required={true}
                              // inicial=""
                              onChange={this.handleOnChangeCT}
                            //validarEntrada={this.validarEntradaCT}
                            />

                            <br />
                          </Grid>
                        </Paper>

                        <div style={{ textAlign: "center" }}>
                          <Button
                            size="large"
                            variant="contained"
                            color="white"
                            disabled={this.state.esValido}
                            onClick={this.handleOnclickEnviarBuzon}   >
                            Enviar
                      </Button>
                          <br />
                        </div>

                      </Grid>
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
                      <strong>{"Ututor.net "}</strong>
                  es una plataforma web de gestión y administracion de procesos
                  de tutorias. Está dirigida para apoyar el desempeño
                  profesional de alumnos de la Pontificia Universidad Católica
                  del Perú.
                </p>
                  </Grid>
                </div>
                <div class="copyright">
                  Copyright © 2020 Ututor.net | {institucion?.NOMBRE || "PUCP"} - Todos los derechos reservados.
            </div>
              </div>
            </div>
          </footer>
        </Paper>




      </ThemeProvider>

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