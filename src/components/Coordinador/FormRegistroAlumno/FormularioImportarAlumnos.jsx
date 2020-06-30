import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import EnConstruccion from "../../Shared/EnConstruccion";
import TituloFormulario from "../Tutorias/TituloFormulario";
import { getUser } from "../../../Sesion/Sesion";
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
    return (
      <>
        
        {/**
         * Te la creiste Wey aun esta en construcción XDDDD
         * Lo que viste fue una ilusion XD
         * PD. holiiiiiiisss aha ha ha haaaa (Cat-2012)
         * PD2. TE ODIO HOOKS
         * PD3. lo subo cuando lo acabe de hacerloXDDDDDD
         */}
          <EnConstruccion src="https://ututor-recursos.s3.amazonaws.com/holiiiis4.png"/>

      </>
    );
  }
}

export default FormularioImportarAlumnos;
