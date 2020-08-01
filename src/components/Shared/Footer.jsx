import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { GET } from "../../Conexion/Controller";
import "./Footer.css";
import ImagenCircular from "./ImagenCircular";
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
  constructor(){
    super();
    this.state={
      institucion: undefined,
    }
  }
  async componentDidMount(){
    let institucion = await GET({servicio:"/api/institucion"});
    if(institucion?.institucion){
      this.setState({institucion});
    }
  }
  render() {
    const { classes } = this.props;
    const {institucion} = this.state;
    return (
      <div>
        <div class="footer-wrap">
          <div class="container">
            <div className={classes.sectionDesktop}>
              <Grid container spacing={0}>
                <Grid item md={3} />
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
                <Grid item md={2} xs={12}>
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
                <Grid item md={3} />
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
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
