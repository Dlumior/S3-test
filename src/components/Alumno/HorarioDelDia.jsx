import React, { Component } from "react";
import {  Paper } from "@material-ui/core";
import {  diasSemana } from "./Util.js";
import DisponibilidadCard from "./DisponibilidadCard";
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
      fecha: new Date(),
    };
    this.renderHorarios=this.renderHorarios.bind(this);
  }
  componentDidMount(){
   // GET backend
   if(this.props.fecha){

     this.setState({fecha: this.props.fecha});
   }
  }
  renderHorarios(){

  }
  render() {
    return (
      <><h2 style={styles.control}>
          {diasSemana[this.props.Ndia] + " " + this.props.diaSemana}
        </h2>
      <Paper elevation={5} style={styles.paper}>
        
        <DisponibilidadCard
        />
        <DisponibilidadCard/>
        <DisponibilidadCard/>
        <DisponibilidadCard/><DisponibilidadCard/>
      </Paper>
      </>
    );
  }
}

export default HorarioDelDia;
