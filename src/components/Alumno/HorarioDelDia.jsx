import React, { Component } from "react";
import {  Paper } from "@material-ui/core";
import {  diasSemana } from "./Util.ts";
import DisponibilidadCard from "./DisponibilidadCard";
const styles = {
  paper: {
    backgroundColor: "#f2f2f2",
    marginTop: "3%",
    flexDirection: "column",
    backgroundImage: "",
    height: "400px",
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
  }

  render() {
    return (
      <Paper elevation={5} style={styles.paper}>
        <h3 style={styles.control}>
          {diasSemana[this.props.Ndia] + " " + this.props.diaSemana}
        </h3>
        <DisponibilidadCard/>
      </Paper>
    );
  }
}

export default HorarioDelDia;
