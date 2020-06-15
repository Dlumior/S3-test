import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid, Typography, Paper } from "@material-ui/core";
import ListaComboBox from "../../Coordinador/Tutorias/ListaComboBox";
import ListaEtiquetas from "../../Coordinador/Tutorias/ListaEtiquetas";
const styles = {
  control: {
    textAlign: "center",
  },
  paper: {
    borderTop: "2px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
};
class Controles extends Component {
  constructor() {
    super();
    this.state = {
      atras: -1,
      adelante: 1,
    };
    this.saltoEnElTiempoLocal = this.saltoEnElTiempoLocal.bind(this);
  }
  handleOnChangeEtiquetas(){

  }
  saltoEnElTiempoLocal = (saltoEnElTiempo) => {
    //console.log( "1 semana al pasado");
    this.props.saltoEnElTiempo(saltoEnElTiempo);
  };
  handleOnChangeProceso(proceso) {
    console.log("proceso seleccionado: ", proceso);
  }
  render() {
    return (
      <Paper style={styles.paper}>
        <Grid container spacing={0} alignContent="center">
          {/** mes control*/}
          <Grid item md={2} xs={2}>
            <h2 style={styles.control}>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => this.saltoEnElTiempoLocal(-30)}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>

              {this.props.fecha.mes || "Mes Actual"}

              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => this.saltoEnElTiempoLocal(30)}
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </h2>
          </Grid>
          {/** filtro de programa*/}
          <Grid item md={3} xs={3}>
            <ListaComboBox
              mensaje="proceso"
              titulo={"Proceso"}
              enlace={"/api/tutoria"}
              id={"ID_PROCESO_TUTORIA"}
              nombre={"NOMBRE"}
              keyServicio={"tutoria"}
              escogerItem={this.handleOnChangeProceso}
              small={true}
              inicial={true}
              placeholder={"Escoja el proceso de tutoria"}
            />
          </Grid>
          {/** fecha actual*/}
          <Grid item md={2} xs={3}>
            <h2 style={styles.control}>
              {"Hoy: " + new Date(this.props.fecha.fecha).toDateString()}{" "}
            </h2>
          </Grid>
          {/** tutor filtro */}
          <Grid item md={3} xs={3}>
          <ListaEtiquetas
              obtenerEtiquetas={this.handleOnChangeEtiquetas}
              enlace={"/api/tutor"}
              small={true}
              label={"Tutores"}
            />
          </Grid>
          {/** semana control*/}
          <Grid item md={2} xs={1}>
            <h2 style={styles.control}>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => this.saltoEnElTiempoLocal(-7)}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              {"Semana " + this.props.fecha.semana || "Semana Actual"}
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => this.saltoEnElTiempoLocal(7)}
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </h2>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Controles;
