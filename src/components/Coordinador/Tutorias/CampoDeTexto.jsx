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
 *
 */

class CampoDeTexto extends Component {
  constructor() {
    super();
    this.state = {
      validacionOk: true,
      texto: undefined,
      validacion: {},
      mensaje: "",
      mensajeError: "",
      regex: {
        email: /^[a-z0-9](\.?[a-z0-9]){5,}@pucp(\.edu)?\.pe$/,
        codigo: /[a-z]+/i,
        telefono: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        direccion: /[A-Za-záéíóúñ0-9 ()-,.]+/i,
      },
    };
    this.validacion = this.validacion.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  validacion(texto) {
    if (!this.state.validacion) {
      return true;
    }
    // Validacion de limite de tamaño
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
    // validacion en caso sea un email
    if (this.state.validacion.tipo === "email") {
      if (!this.state.regex.email.test(String(texto))) {
        this.setState({
          mensajeError:
            ' Un correo valido debe contener caracteres alfanumericos, un "@" y ser de dominio pucp',
        });
        return true;
      }
    }
    //validacion en caso sea telefono
    if (this.state.validacion.tipo === "telefono") {
      if (this.state.regex.telefono.test(String(texto))) {
        this.setState({
          mensajeError:
            "Un telefono valido debe contener caracteres numericos y los caracteres - , +, ( , )",
        });
        return true;
      }
    }
    //validacion en caso sea direccion
    if (this.state.validacion.tipo === "direccion") {
      if (!this.state.regex.direccion.test(String(texto))) {
        this.setState({
          mensajeError:
            "Una direccion valido debe contener caracteres alfanumericos y los caracteres - , ( , )",
        });
        return true;
      }
    }
    //validacion en caso sea codigo
    if (this.state.validacion.tipo === "codigo") {
      //si encontr este patron , esta mal
      if (this.state.regex.codigo.test(String(texto))) {
        this.setState({
          mensajeError:
            "Un codigo valido debe contener caracteres alfanumericos y caracters especiales",
        });
        return true;
      }
    }
    //Si paso las validaciones quito el error
    this.setState({
      mensajeError: "",
    });
    return true;
  }
  handleOnChange = (e) => {
    const textoActual = e.target.value;
    console.log("texto actual", textoActual);
    let error = this.props.name;
    //validacion no vacio
    if (this.props.requerido && textoActual.length === 0) {
      this.setState({
        mensajeError: this.props.name + " es un campo requerido.",
      });
      this.props.validarEntrada({ llave: this.props.name, error: error });
      this.setState({ texto: textoActual });
      return;
    }

    //Validacion general
    if (this.validacion(textoActual)) {
      this.setState({ texto: textoActual });
      this.props.onChange({ name: e.target.name, value: textoActual });
      if (textoActual.length > 0) {
        error = "";
      }
      this.props.validarEntrada({ llave: this.props.name, error: error });
      return;
    }

    this.props.validarEntrada({ llave: this.props.name, error: error });
  };
  componentDidMount() {
    if (this.props.validacion) {
      this.setState({ validacion: this.props.validacion });
    }
    if (this.props.inicial) {
      this.setState({ texto: this.props.inicial });
    }
    if (this.props.inicial) {
      this.props.validarEntrada({
        llave: this.props.name,
        error: "",
      });
    } else {
      this.props.validarEntrada({
        llave: this.props.name,
        error: this.props.name,
      });
    }
  }
  render() {
    return (
      <Paper elevation={0} style={estilos.paper}>
        <TextField
          required={this.props.requerido || false}
          autoFocus={this.props.autoFocus}
          fullWidth
          name={this.props.name}
          label={this.props.label}
          onChange={this.handleOnChange}
          disabled={this.props.disabled || false}
          variant={this.props.variant}
          rows={this.props.rows}
          multiline={this.props.multiline || false}
          value={this.state.texto}
        />
        <FormHelperText error>{this.state.mensajeError}</FormHelperText>
      </Paper>
    );
  }
}

export default CampoDeTexto;
