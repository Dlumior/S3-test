import React, { Component } from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
const style ={
    estilosRadio:{
        marginTop: "7%",
    }
}
class GrupoRadioButton extends Component {
  constructor() {
    super();
    this.state = {
      seleccion: "",
    };
    this.obtenerSeleccion=this.obtenerSeleccion.bind(this);
  }
  renderRadios(radios) {
    if (radios) {
      return radios.map((radio) => (
        <FormControlLabel
          
          control={<Radio value={radio.valor} color="primary"/>}
          label={radio.titulo}
          labelPlacement="end"
          
        />
      ));
    }
  }
  obtenerSeleccion(e) {
    this.props.obtenerSeleccion(e.target.value);
    this.setState({seleccion:e.target.value});
  }
  componentDidMount() {
      this.setState({seleccion:this.props.radios[0].valor});
  }
  render() {
    return (
      <div style={style.estilosRadio}>
        <FormLabel component="legend" color="primary">
          {this.props.titulo}
        </FormLabel>
        <RadioGroup
        
          row
          aria-label="gender" name="gender1" value={this.state.seleccion} onChange={this.obtenerSeleccion}
        >
          {this.renderRadios(this.props.radios)}
        </RadioGroup>
      </div>
    );
  }
}

export default GrupoRadioButton;
