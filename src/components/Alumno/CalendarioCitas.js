import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid } from "@material-ui/core";
import Controles from "./Controles";
class CalendarioCitas extends Component {
  constructor() {
    super();
    this.state = {
        mesActual:"Enero",
        semanaActual:1
    };
    this.renderCabioSemana = this.renderCabioSemana.bind(this);
    this.renderCambioMes = this.renderCambioMes.bind(this);
  }
  renderCabioSemana(semana) {}
  renderCambioMes(mes) {}
  render() {
    return (
      <Controles
        mes={this.state.mesActual}
        semana={this.state.semanaActual}
        cambiarSemana={this.renderCabioSemana}
        cambiarMes={this.renderCambioMes}
      />
      
    );
  }
}

export default CalendarioCitas;
