import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid, Typography } from "@material-ui/core";
const styles = {
  control: {
    textAlign: "center",
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
  saltoEnElTiempoLocal = (saltoEnElTiempo) => {
    //console.log( "1 semana al pasado");
    this.props.saltoEnElTiempo(saltoEnElTiempo);
  };

  render() {
    return (
      <div>
        <Grid container spacing={3} alignContent="center">
          <Grid item md={3} xs={5}>
            <h1 style={styles.control}>
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
            </h1>
          </Grid>
          <Grid item md={6} xs={5}>
            <Typography variant="h4" style={styles.control}>
              {"Hoy: "+ (new Date(this.props.fecha.fecha)).toDateString()}{" "}
            </Typography>
          </Grid>
          <Grid item md={3} xs={5}>
            <h1 style={styles.control}>
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
            </h1>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Controles;
