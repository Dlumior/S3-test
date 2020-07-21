import React, { Component } from "react";
import { Typography } from "@material-ui/core";
const estilo = {
  centerizable: {
    textAlign: "center",
    color: "#ffffff"
  },
  verderizable: {
    backgroundColor: "#3AAFA9",
  },
};
class TituloFormulario extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
    };
  }

  render() {
    return (
        <div style={estilo.verderizable}>
        <br />
        <Typography variant="h6" style={estilo.centerizable}>
          {this.props.titulo}
        </Typography>
        <br />
      </div>
    );
  }
}

export default TituloFormulario;
