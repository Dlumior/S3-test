import React, { Component } from "react";
import {  Paper } from "@material-ui/core";
import {  diasSemana } from "./Util.ts";
import DisponibilidadCard from "./DisponibilidadCard";
const styles = {
  paper: {
    backgroundColor: "#ffffff",
    marginTop: "3%",
    flexDirection: "column",
    backgroundImage: "",
  },
  control: {
    textAlign: "center",
  },
};
class HorarioDelDia extends Component {
  constructor() {
    super();
    this.state = {
      
    };
    this.renderHorarios=this.renderHorarios.bind(this);
  }
  componentDidMount(){
   // 
  }
  renderHorarios(){

  }
  render() {
    return (
      <Paper elevation={5} style={styles.paper}>
        <h3 style={styles.control}>
          {diasSemana[this.props.Ndia] + " " + this.props.diaSemana}
        </h3>
        <DisponibilidadCard/>
        <DisponibilidadCard/>
        <DisponibilidadCard/>
        <DisponibilidadCard/>
        <DisponibilidadCard/>
      </Paper>
    );
  }
}

export default HorarioDelDia;
