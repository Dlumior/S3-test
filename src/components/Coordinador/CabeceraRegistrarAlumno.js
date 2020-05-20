import React, { Component } from "react";
import { Typography } from "@material-ui/core";

const style = {
  registryTitle: {
    marginTop: "3%",
    marginLeft: "3%",
    alignItems: "center",
  },
};
class CabeceraRegistrarAlumno extends Component {
  render() {
    return (
      <Typography component="h1" variant="h5" style={style.registryTitle}>
        <h2>{this.props.titulo}</h2>
      </Typography>
    );
  }
}

export default CabeceraRegistrarAlumno;
