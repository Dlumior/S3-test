import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import EnConstruccion from "../../Shared/EnConstruccion";
import TituloFormulario from "./TituloFormulario";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
  logo: {
    backgorundSize: "cover",
    width: "100%",
    height:800,
  },
};
class ListaTutorias extends Component {
  render() {
    /**
     * Please do not touch my code
     *
     * I'm in construction
     */
    return (
      <>
        <TituloFormulario titulo="Lista de Tutorias TO-DO" />

        <iframe
          src="http://3.89.195.222:3000/Registrarse"
          width="100%"
          frameborder="0"
          allowfullscreen
          sandbox
          style={style.logo}
        >
          <p>
            {" "}
            <a href="https://developer.mozilla.org/en-US/docs/Glossary">
              Fallback link for browsers that don't support iframes
            </a>{" "}
          </p>
        </iframe>
      </>
    );
  }
}

export default ListaTutorias;
