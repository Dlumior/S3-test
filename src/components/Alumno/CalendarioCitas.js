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
      fechaControles: ""
    };
    this.renderCabioSemana = this.renderCabioSemana.bind(this);
    this.renderCambioMes = this.renderCambioMes.bind(this);
    this.renderDias = this.renderDias.bind(this);
  }
  /**
   * podria usar una iteracion y restar fechas 
   */
  renderCabioSemana(semana) {
    // mas o menos 7 dias
    //manejar si estoy en los limites de un mes
    //manejar si estoy en los limites de un año
    if(!semana) return;
    let fechaActual = this.state.fechaActual;console.log("fecha actual: ",fechaActual);
    if(semana===-1){
      //viaje al pasado
      fechaActual.setDate(fechaActual.getDate()-7);
    }else{
      //viaje al futuro
      fechaActual.setDate(fechaActual.getDate()+7);
      this.setState({fechaActual:fechaActual});
    }
    console.log("fecha cambiada: ",fechaActual);

  }
  renderCambioMes(mes) {
    // mas o menos 30 dias
    //manejar si estoy en los limites de un mes
    //manejar si estoy en los limites de un año
  }
  renderDias(semanaDias) {
    //const numeracioSemana = this.state.inicioSemana;
    if(!semanaDias)return;
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
  setFecha(fechaActualizada){

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
    this.setState({ fechaControles: {mes: mesesAnio[fechaActual.getMonth() + 1], semana:this.state.semanaActual}});

  }
  

  render() {
    return (
      <div>
        <Controles
          fecha={this.state.fechaControles}
          cambiarSemana={this.renderCabioSemana}
          cambiarMes={this.renderCambioMes}
        />
        <Grid container spacing={4} alignContent="center">
          {this.renderDias(this.state.semanaDias)}
        </Grid>
      </div>
    );
  }
}

export default CalendarioCitas;
