import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Controles from "./Controles";
import { NdiasMes, mesesAnio } from "./Util.js";
import HorarioDelDia from "./HorarioDelDia";
import FrmSolicitarCitaTutor_granito from "../FrmSolicitarCitaTutor_granito";
const styles = {
  control: {
    textAlign: "center",
  },
  tituloDia: {
    textAlign: "center",
    marginTop: "3%",
  },
  container: {
    marginLeft: "2%",
    marginRight: "2%",
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
      modoBatallador: true,
    };
    this.saltarEnElTiempo = this.saltarEnElTiempo.bind(this);
    this.handleFiltroPrograma = this.handleFiltroPrograma.bind(this);
    this.handleFiltroTutor = this.handleFiltroTutor.bind(this);
    this.handleModoBatallador = this.handleModoBatallador.bind(this);
  }
  /**
   * @param {number} salto es el valor de cambio de fecha y podria ser hacia el pasado o hacia el futuro
   */
  async saltarEnElTiempo(salto) {
    //funcion generica de viaje en el tiempo
    if (!salto) return;
    let lunesActual = new Date(this.state.lunesActual);
    this.setState({
      lunesActual: await new Date(
        lunesActual.setDate(lunesActual.getDate() + salto)
      ),
    });
    console.log("salto actual: ", this.state.lunesActual);
  }
  /**
   *
   * @param {Date} lunesActual el lunes de la semana actual
   */
  renderDias = (lunesActual) => {
    if (!lunesActual) return;
    let fechaInicial = new Date(lunesActual);
    let fechasDias = [];
    for (let i = 0; i < 6; i++) {
      fechasDias.push(new Date(fechaInicial.setDate(fechaInicial.getDate())));
      fechaInicial.setDate(fechaInicial.getDate() + 1);
    }
    return (
      <>
        {fechasDias.map((diaSemana) => (
          <Grid item md={2} xs={2}>
            <HorarioDelDia
              fecha={{
                fecha: diaSemana,
                servicio:
                  this.props.servicio + diaSemana.toISOString().split("T")[0],
                tipo: this.props.tipo,
              }}
            />
          </Grid>
        ))}
      </>
    );
  };

  async componentDidMount() {
    const fechaActual = this.state.fechaActual;
    let offset = 0;
    const lunes = 1;
    offset = fechaActual.getDay() - lunes;
    this.setState({
      fechaControles: {
        mes: mesesAnio[fechaActual.getMonth() + 1],
        semana: 1,
        fecha: fechaActual,
      },
    });

    console.log("CALENDARIO_CITAS>>> XXXXX ", this.props.servicio);

    this.setState({
      lunesActual: new Date(
        await fechaActual.setDate(fechaActual.getDate() - offset)
      ),
    });
  }
  handleFiltroPrograma(idProceso) {}
  handleFiltroTutor(idTutor) {}
  handleModoBatallador(modoBatallador) {
    this.setState({ modoBatallador: modoBatallador });
  }
  render() {
    return (
      <div style={styles.container}>
        <Controles
          fecha={this.state.fechaControles}
          saltoEnElTiempo={this.saltarEnElTiempo}
          filtroProceso={true}
          filtroTutores={true}
          handleFiltroProceso={this.handleFiltroProceso}
          handleFiltroTutores={this.handleFiltroTutores}
          modoBatallador={this.handleModoBatallador}
        />
        {this.state.modoBatallador ? (
          <Grid container spacing={4} alignContent="center">
            {this.renderDias(this.state.lunesActual)}
          </Grid>
        ) : (
          <FrmSolicitarCitaTutor_granito />
        )}
      </div>
    );
  }
}

export default CalendarioCitas;
