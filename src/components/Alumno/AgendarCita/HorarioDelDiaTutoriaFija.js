import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { diasSemana, fechaEstandar } from "./Util.js";
import "./Horario.css";
import ArregloHorariosTutoriaFija from "./ArregloHorariosTutoriaFija.js";

const styles = {
  paper: {
    marginTop: "1%",
    flexDirection: "column",
    backgroundImage: "",
    minHeight: "500px",
    maxHeight: "800px",
    whiteSpace: "nowrap",
  },
  control: {
    textAlign: "center",
  },
  titutloDia: {
    borderTop: "2px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
};

/**
 * Recibo una fecha (Date) y sobre esta es que me renderizo XD
 */

 class HorarioDelDiaTutoriaFija extends Component {
  constructor() {
    super();
    this.state = {
      diaSemanaStr: "Lunes",
      diaSemanaNum: 1,
      fecha: "",
      horarios: [],
      disponibilidades: "",
    };
    //this.renderHorarios = this.renderHorarios.bind(this);
    this.renderCabecera = this.renderCabecera.bind(this);
  }

  renderCabecera = (fecha) => {
    const cabecera = new Date(fecha);
    return (
      <div style={styles.titutloDia}>
        <Typography
          variant="button"
          component="h2"
          style={styles.control}
          display="block"
          gutterBottom
        >
          <strong> {diasSemana[cabecera.getDay()] + " " + cabecera.getDate()}  </strong>
        </Typography>        
      </div>
    );
  };

  render() {
    //console.log("this.props",this.props);
    return (
      <div>        
        {this.renderCabecera(this.props.fecha.fecha)}
        <div className="tituloDia" elevation={5} style={styles.paper}>
          <ArregloHorariosTutoriaFija servicio={this.props.fecha.servicio} tipo={this.props.fecha.tipo}
          fexaForm={this.props.fecha.fecha}/>
        </div>
      </div>
    );
  }
}
export default HorarioDelDiaTutoriaFija;
