import React, { Component } from "react";
import { Grid, TextField, FormHelperText, Paper } from "@material-ui/core";
import validateEmail from "../FormRegistroTutor/validateEmail";
const estilos = {
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
    flexDirection: "column",
  },
};
/**
 * @deprecated Ahora se Usa FormularioNuevaTutoria.jsx
 */
class CampoDeTexto extends Component {
  constructor() {
    super();
    this.state = {
      validacionOk: true,
      texto: "",
      validacion: {},
      mensaje: "",
      mensajeError: "",
      regexEmail: /^[a-z0-9](\.?[a-z0-9]){5,}@pucp(\.edu)?\.pe$/,
    };
    this.validacion = this.validacion.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  validacion(texto) {
    if (!this.state.validacion) {
      return true;
    }
    if (texto.length > this.state.validacion.lim) {
      this.setState({
        mensajeError:
          this.props.name +
          " debe ser maximo de " +
          this.state.validacion.lim +
          " caracteres",
      });
      return false;
    }
    if (this.state.validacion.email) {
      if (!this.state.regexEmail.test(String(texto))) {
        this.setState({
          mensajeError:
            this.props.name +
            " debe contener caracteres alfanumericos y ser de dominio pucp",
        });
        return true;
      }
    }
    this.setState({
      mensajeError: "",
    });
    return true;
  }
  handleOnChange = (e) => {
    const textoActual = e.target.value;
    let error = this.props.name;
    if (this.validacion(textoActual)) {
      this.setState({ texto: textoActual });
      this.props.onChange({name: e.target.name, value:textoActual});
      if(textoActual.length>0){
        error='';
      }
      this.props.validarEntrada({llave:this.props.name, error: error});
      return;
    }
    this.props.validarEntrada({llave:this.props.name, error: error});
    e.target.value = this.state.texto;
    
    
  };
  componentDidMount() {
    if (this.props.validacion) {
      this.setState({ validacion: this.props.validacion });
    }
  }
  render() {
    return (
      <Paper elevation={0} style={estilos.paper}>
        <TextField
          autoFocus={this.props.autoFocus}
          fullWidth
          name={this.props.name}
          label={this.props.label}
          onChange={this.handleOnChange}
          disabled={this.props.disabled || false}
          variant={this.props.variant}
          rows={this.props.rows}
          multiline={this.props.multiline || false}
        />
        <FormHelperText error>{this.state.mensajeError}</FormHelperText>
      </Paper>
    );
  }
}

export default CampoDeTexto;
