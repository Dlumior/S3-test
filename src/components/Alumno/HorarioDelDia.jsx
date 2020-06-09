import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { diasSemana, fechaEstandar } from "./Util.js";
import DisponibilidadCard from "./DisponibilidadCard";
import { GET } from "../../Conexion/Controller.js";
import "./Horario.css";
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
class HorarioDelDia extends Component {
  constructor() {
    super();
    this.state = {
      diaSemanaStr: "Lunes",
      diaSemanaNum: 1,
      fecha: "",
      horarios: [],
      disponibilidades: "",
    };
    this.renderHorarios = this.renderHorarios.bind(this);
    this.renderCabecera = this.renderCabecera.bind(this);
  }

  renderCabecera = (fecha) => {
    const cabecera = new Date(fecha);
    console.log("horahio: ", cabecera);
    return (
      <>
      <div style={styles.titutloDia}>
        <Typography
          variant="button"
          component="h2"
          style={styles.control}
          display="block"
          gutterBottom
        >
          <strong>
            {diasSemana[cabecera.getDay()] + " " + cabecera.getDate()}
          </strong>
        </Typography>
      </div>
      <div className="tituloDia" elevation={5} style={styles.paper}>
      {this.renderHorarios(this.state.horarios)}
    </div>
    </>
    );
  };

  async componentDidMount() {
    if (!this.props.fecha) return;
    const fechaRecibida = new Date(this.props.fecha);
    //console.log(fechaRecibida);
    this.setState({ fecha: new Date(this.props.fecha) });
    const servicio =
      this.props.servicio + fechaRecibida.toISOString().split("T")[0];
    let horarios = await GET({ servicio: servicio });
    this.setState({ horarios: horarios });
    console.log("horariooos: ", this.state.horarios);
    //console.log("fecha: ", fechaRecibida.toISOString().split('T')[0]);
  }
  renderHorarios = (horarios) => {
    if (horarios.data) {
      return (
        <div>
          {horarios.data.map((element) => (
            <DisponibilidadCard disponibilidad={element} />
          ))}
        </div>
      );
    }
    console.log("long mayor a cero", horarios.data);

    //return <div>{horarios.map((element)=>(<h1>HAAAA</h1>))}</div>
  };
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.disponibilidades !== this.state.disponibilidades) {
      return true;
    }
    if (nextProps.fecha !== this.props.fecha) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <div>
        {this.renderCabecera(this.props.fecha)}
        
      </div>
    );
  }
}

export default HorarioDelDia;
