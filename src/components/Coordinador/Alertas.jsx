import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

class Alertas extends Component {
  renderAlerta() {
    if (this.props.alerta.mensaje === "") {
      return <></>;
    } else {
      return (
        <Alert severity={this.props.severity}>
          <AlertTitle>Observación</AlertTitle>
          {this.props.alerta.mensaje + " - "}
          <strong>{this.props.alerta.mensajeStrong}</strong>
        </Alert>
      );
    }
  }
  render() {
    
      return this.renderAlerta();
    
  }
}

export default Alertas;
