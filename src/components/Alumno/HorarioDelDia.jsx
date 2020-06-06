import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { diasSemana, fechaEstandar } from "./Util.js";
import DisponibilidadCard from "./DisponibilidadCard";
import { GET } from "../../Conexion/Controller.js";
const styles = {
  paper: {
    backgroundColor: "#ffffff",
    marginTop: "3%",
    flexDirection: "column",
    backgroundImage: "",
    overflow: "auto",
    minHeight: "500px",
    maxHeight: "800px",
    whiteSpace: "nowrap",
  },
  control: {
    textAlign: "center",
  },
};
/**
 * Recibo una fecha (Date) y sobre esta es que me renderizo XD
 */
class HorarioDelDia extends Component {
  constructor() {
    super();
    this.state = {
      diaSemanaStr: "Lunes",
      diaSemanaNum: 1,
      fecha: "",
    };
    //this.renderHorarios = this.renderHorarios.bind(this);
    this.renderCabecera = this.renderCabecera.bind(this);
  }

  renderCabecera = (fecha) => {
    
    const cabecera = new Date(fecha);
    console.log("horahio: ", cabecera);
    return (
      <h2 style={styles.control}>
        {diasSemana[cabecera.getDay()] +
          " " +
          cabecera.getDate()}
      </h2>
    );
  }
  async componentDidMount() {
    if (!this.props.fecha) return;
    const fechaRecibida = new Date(this.props.fecha);
    console.log(fechaRecibida);
    this.setState({ fecha: new Date(this.props.fecha) });
    //const fechaDeHoy = fechaEstandar(this.props.fecha);
    //let horarios = await GET({servicio: '/citas?fecha='+ fechaDeHoy});
    //console.log("fecha: ", fechaDeHoy);
  }
  render() {
    return (
      <>
        {this.renderCabecera(this.props.fecha)}
        <Paper elevation={5} style={styles.paper}>
          <DisponibilidadCard />
          <DisponibilidadCard />
          <DisponibilidadCard />
          <DisponibilidadCard />
          <DisponibilidadCard />
        </Paper>
      </>
    );
  }
}

export default HorarioDelDia;
