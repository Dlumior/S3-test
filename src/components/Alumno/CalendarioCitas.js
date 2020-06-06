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
      Ndias: 6,
      fechaActual: new Date(),
      lunesActual: "",
      fechaControles: {},
    };
    this.saltarEnElTiempo = this.saltarEnElTiempo.bind(this);
  }
  /**
   * @param {number} salto es el valor de cambio de fecha y podria ser hacia el pasado o hacia el futuro
   */
  async saltarEnElTiempo(salto) {
    //funcion generica de viaje en el tiempo
    if (!salto) return;
    let lunesActual = new Date(this.state.lunesActual);
    this.setState({ lunesActual: await new Date(lunesActual.setDate(lunesActual.getDate()+salto)) });
    console.log("salto actual: ", this.state.lunesActual);
  }
  renderDias = (lunesActual) => {
    console.log("luneeees",lunesActual);
    //const numeracioSemana = this.state.inicioSemana;
    if (!lunesActual) return;
    let fechaInicial = new Date(lunesActual);
    console.log("fechaInicial",fechaInicial);
    let fechasDias = [];
    for (let i = 0; i < 6; i++) {
      fechasDias.push(new Date(fechaInicial.setDate(fechaInicial.getDate())));
      fechaInicial.setDate(fechaInicial.getDate() + 1);
    }
    console.log("fechasDias",fechasDias);
    return (
      <>
        {fechasDias.map((diaSemana) => (
          <Grid item md={2} xs={2}>
            <HorarioDelDia fecha={diaSemana} />
          </Grid>
        ))}
      </>
    );
  }
  obtenerLunes(fechaActual) {}

  async componentDidMount() {
    const fechaActual = this.state.fechaActual;
    let offset = 0;
    const lunes = 1;
    offset = fechaActual.getDay() - lunes;

    this.setState({
      fechaControles: { mes: mesesAnio[fechaActual.getMonth() + 1], semana: 1 },
    });
     this.setState({
      lunesActual: new Date(
        await fechaActual.setDate(fechaActual.getDate() - offset)
      ),
    });
    console.log("lunes Actual: ", this.state.lunesActual);
  }

  render() {
    return (
      <div>
        <Controles
          fecha={this.state.fechaControles}
          saltoEnElTiempo={this.saltarEnElTiempo}
        />
        <Grid container spacing={4} alignContent="center">
          {this.renderDias(this.state.lunesActual)}
        </Grid>
      </div>
    );
  }
}

export default CalendarioCitas;
