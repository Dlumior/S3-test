import React, { Component } from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@material-ui/core";
/**
 * Para reutilizar:
 *
 * primero preparar un props de la forma:
 *
 *    {
 *        titulo : "titulo del grupo de radio button"
 *        radios :[ { titulo:"titulo" , valor: <valor> } ] ,
 *        obtenerSeleccion: <function(valor)>,
 *    }
 *
 * para llamarlo desde otro componente:
 *
 *    ... some code
 *     <GrupoRadioButton radios={array} obtenerSeleccion={funcion}>
 *
 */
const style = {
  estilosRadio: {
    marginTop: "7%",
    textAlign: "center",
  },
};
const estilos = {
  paper: {
    //textAlign: "center",

    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "2%",
    flexDirection: "column",
  },
  paperSmall: {
    textAlign: "center",
    marginLeft: "12%",
    marginRight: "3%",
    marginTop: "1%",
    flexDirection: "column",
  },
};
class GrupoRadioButton extends Component {
  constructor() {
    super();
    this.state = {
      seleccion: 0,
    };
    this.obtenerSeleccion = this.obtenerSeleccion.bind(this);
  }
  renderRadios(radios) {
    if (radios) {
      return radios.map((radio) => (
        <FormControlLabel
          control={<Radio value={radio.titulo} color="primary" />}
          label={radio.titulo}
          labelPlacement="end"
        />
      ));
    }
  }
  obtenerSeleccion(e) {
    this.props.obtenerSeleccion({
      name: this.props.name,
      value: e.target.value,
    });
    this.setState({ seleccion: e.target.value });
  }
  componentDidMount() {
    this.setState({ seleccion: this.props.radios[0].titulo });
  }
  render() {
    return (
      <Paper
        elevation={0}
        style={this.props.stretch ? estilos.paperSmall : estilos.paper}
      >
        {this.props.stretch ? <></> : <br />}
        <FormLabel component="legend" color="primary">
          {this.props.titulo}
        </FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={this.state.seleccion}
          onChange={this.obtenerSeleccion}
        >
          {this.renderRadios(this.props.radios)}
        </RadioGroup>
      </Paper>
    );
  }
}

export default GrupoRadioButton;
