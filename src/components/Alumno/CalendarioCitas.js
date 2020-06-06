import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Controles from "./Controles";
import { NdiasMes, mesesAnio } from "./Util.js";
import HorarioDelDia from "./HorarioDelDia";
const styles = {
  control: {
    textAlign: "center",
  },
  tituloDia: {
    textAlign: "center",
    marginTop: "3%",
  },
};
class CalendarioCitas extends Component {
  constructor() {
    super();
    this.state = {
      semanaDias: [],
      semanaActual: 1,
      mesActual: 1,
      mostrarNdias: 6,
      fechaActual: new Date(),
      inicioSemana: 5,
      fechaControles: "",
    };
    
    this.saltarEnElTiempo = this.saltarEnElTiempo.bind(this);
  }
  /**
   * @param {number} salto es el valor de cambio de fecha y podria ser hacia el pasado o hacia el futuro
   */
  saltarEnElTiempo(salto) {
    //funcion generica de viaje en el tiempo
    if (!salto) return;
    let fechaActual = this.state.fechaActual;
    console.log("fecha actual: ", fechaActual);
    fechaActual.setDate(fechaActual.getDate() + salto);
    this.setState({ fechaActual: fechaActual });
    console.log("fecha actual: ", fechaActual);
  }
  renderDias(semanaDias) {
    //const numeracioSemana = this.state.inicioSemana;
    if (!semanaDias) return;
    let Ndia = 0;
    return (
      <>
        {semanaDias.map((diaSemana) => (
          <Grid item md={2} xs={2}>
            <HorarioDelDia
              fecha={this.state.fechaActual}
              Ndia={++Ndia}
              diaSemana={diaSemana}
            />
          </Grid>
        ))}
      </>
    );
  }
  setFecha(fechaActualizada) {}
  componentDidMount() {
    const fechaActual = this.state.fechaActual;
    let regreso =
      fechaActual.getDay() - (this.state.fechaActual.getUTCDate() - 1);
    if (regreso <= 0) {
      regreso = NdiasMes[fechaActual.getMonth() + 1 - 1] + regreso + 1;
    }
    //regreso=28;
    let inicio = regreso;
    let semanaDias = [];
    for (let i = 0; i < 6; i++) {
      if (inicio > NdiasMes[fechaActual.getMonth() + 1 - 1]) {
        inicio = 1;
      }
      semanaDias.push(inicio);
      inicio++;
    }
    this.setState({ semanaDias: semanaDias });
    this.setState({ inicioSemana: regreso });
    this.setState({ mesActual: fechaActual.getMonth() + 1 });
    this.setState({
      fechaControles: {
        mes: mesesAnio[fechaActual.getMonth() + 1],
        semana: this.state.semanaActual,
      },
    });
  }

  render() {
    return (
      <div>
        <Controles
          fecha={this.state.fechaControles}
          saltoEnElTiempo={this.saltarEnElTiempo}
        />
        <Grid container spacing={4} alignContent="center">
          {this.renderDias(this.state.semanaDias)}
        </Grid>
      </div>
    );
  }
}

export default CalendarioCitas;
