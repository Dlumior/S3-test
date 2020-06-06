import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import EnConstruccion from "../../Shared/EnConstruccion";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
};
class FormularioImportarAlumnos extends Component {
  render() {
    /**
     * Please do not touch my code
     *
     * I'm in construction
     */
    return (
      <Paper elevation={5} style={style.paper}>
        Cargar Alumnos Masivamente TO-DO
        <EnConstruccion/>
      </Paper>
    );
  }
}

export default FormularioImportarAlumnos;
