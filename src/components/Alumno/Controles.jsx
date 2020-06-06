import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid } from "@material-ui/core";
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
    this.handleBackSemana = this.handleBackSemana.bind(this);
    this.handleFordwardSemana = this.handleFordwardSemana.bind(this);
    this.handleBackMes = this.handleBackMes.bind(this);
    this.handleFordwardMes = this.handleFordwardMes.bind(this);
  }
  handleBackSemana(e) {
    //console.log( "1 semana al pasado");
    this.props.cambiarSemana(this.state.atras);
  }
  handleFordwardSemana(e) {
    //console.log( "1 semana al futuro");
    this.props.cambiarSemana(this.state.adelante);

  }
  handleBackMes(e) {
    //console.log( "1 mes al pasado");
    this.props.cambiarMes(this.state.atras);

  }
  handleFordwardMes(e) {
    //console.log( "1 mes al futuro");

    this.props.cambiarMes(this.state.adelante);

  }
  render() {
    return (
      <div>
        <Grid container spacing={6} alignContent="center">
          <Grid item md={3} xs={5}>
            <h1 style={styles.control}>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={this.handleBackMes}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              {this.props.fecha.mes || "Mes Actual"}
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={this.handleFordwardMes}
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </h1>
          </Grid>
          <Grid item md={6} xs={5}></Grid>
          <Grid item md={3} xs={5}>
            <h1 style={styles.control}>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={this.handleBackSemana}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              {"Semana " + this.props.fecha.semana || "Semana Actual"}
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={this.handleFordwardSemana}
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
