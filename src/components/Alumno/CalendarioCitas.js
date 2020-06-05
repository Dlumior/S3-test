import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Controles from "./Controles";
import { NdiasMes, mesesAnio } from "./Util.ts";
import HorarioDelDia from "./HorarioDelDia";
const styles = {
  control: {
    textAlign: "center",
  },
  tituloDia: {
    textAlign: "center",
    marginTop: "3%",
  }
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
    };
    this.renderCabioSemana = this.renderCabioSemana.bind(this);
    this.renderCambioMes = this.renderCambioMes.bind(this);
    this.renderDias = this.renderDias.bind(this);
  }
  renderCabioSemana(semana) {}
  renderCambioMes(mes) {}
  renderDias() {
    //const numeracioSemana = this.state.inicioSemana;
    let Ndia = 0;
    return (
      <>
        {this.state.semanaDias.map((diaSemana) => (
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
  }
  render() {
    return (
      <div>
        <Controles
          mes={mesesAnio[this.state.mesActual]}
          semana={this.state.semanaActual}
          cambiarSemana={this.renderCabioSemana}
          cambiarMes={this.renderCambioMes}
        />
        <Grid container spacing={4} alignContent="center">
          {this.renderDias()}
        </Grid>
      </div>
    );
  }
}

export default CalendarioCitas;
