import React, { Component } from "react";
import DisponibilidadCard from "./DisponibilidadCard";
import { GET } from "../../../Conexion/Controller";
import { Paper, Typography } from "@material-ui/core";
import SesionesCard from "../../Tutor/Sesiones/SesionesCard"

class ArregloHorarios extends Component {
  constructor() {
    super();
    this.state = {
      horarios: [],
    };
    this.renderHorarios = this.renderHorarios.bind(this);
  }
  renderHorarios = (horarios) => {
    console.log("this.props",this.props);
    if (horarios.data) {
      return (
        <div>
          {horarios.data.map((element) => (
            this.props.tipo==="disponibilidad"?
            <DisponibilidadCard disponibilidad={element} 
            fexaForm = {this.props.fexaForm}/>
            : 
            <SesionesCard cita={element}/>
          ))}
          {horarios.data.length===0?
          <Paper>
            <Typography variant="h6">
            Aun no hay horarios disponibles
            </Typography>

          </Paper>:<></>}
        </div>
      );
    }
  };
  async componentDidMount() {
    if (!this.props.servicio) {
      console.log("no habia servico");
      return;
    }
    const servicio = this.props.servicio;
    let horarios = await GET({ servicio: servicio });
    this.setState({ horarios: horarios });
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.servicio !== this.props.servicio) {
      let horarios = await GET({ servicio: nextProps.servicio });
      this.setState({ horarios: horarios });
    }
  }
  render() {
    return <>{this.renderHorarios(this.state.horarios)}</>;
  }
}

export default ArregloHorarios;
