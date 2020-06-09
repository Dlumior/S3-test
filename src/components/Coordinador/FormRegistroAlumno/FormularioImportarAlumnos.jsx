import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import EnConstruccion from "../../Shared/EnConstruccion";
import TituloFormulario from "../Tutorias/TituloFormulario";
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
      <>
        <TituloFormulario titulo="Importar Alumnos" />
        <EnConstruccion/>
      </>
    );
  }
}

export default FormularioImportarAlumnos;
