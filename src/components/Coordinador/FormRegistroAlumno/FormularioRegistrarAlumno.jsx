import React, { Component } from "react";
import * as Controller from "../../../Conexion/Controller";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import ListaProgramas from "./../ListaProgramas";
import ListaEtiquetas from "../Tutorias/ListaEtiquetas";
import Alertas from "../Alertas";
import ListaComboBox from "../Tutorias/ListaComboBox";
import CampoDeTexto from "../Tutorias/CampoDeTexto";
import TituloFormulario from "../Tutorias/TituloFormulario";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    flexDirection: "column",
    backgroundImage: "",
  },
  formRegistrarAlumno: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#ffffff",
    marginLeft: "3%",
    marginRight: "3%",
  },
  envoltorioFormulario: {
    paddingTop: "1%",
    paddingBottom: "2%",
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
};
class FormularioRegistrarAlumno extends Component {
  constructor() {
    super();
    this.state = {
      validacionNombreMensaje: "",
      programas: [
        "",
        "Ingenieria Informatica",
        "Ingenieria industrial",
        "Ingenieria Civil",
        "Ingenieria Mecatronica",
      ],
      programaActual: [],
      etiqueta: [],
      alumno: {
        codigo: "",
        nombres: "",
        apellidos: "",
        correo: "",
        programa: [],
        telefono: "",
        direccion: "",
      },
      mensaje: {
        codigo: "",
        nombres: "",
        apellidos: "",
        correo: "",
        programa: "",
        telefono: "",
        direccion: "",
      },

      alert: {
        mensajeStrong: "",
        mensajeStrongError: "por favor revisalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Alumno registrado",
        mensaje: "",
      },
      severidad: "warning",
      validacionOk: false,
      errores: [],
    };
    this.handleOnChangeEtiquetas = this.handleOnChangeEtiquetas.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
  }
  validarEntrada(error) {
    console.log("errores:", error);
    let encontrado = undefined;
    let nuevo = false;
    let eliminar = this.state.errores.forEach((element) => {
      if (element.llave === error.llave) {
        encontrado = element;
      }
    });
    if (encontrado) {
      if (error.error.length === 0) {
        //lo borro
        eliminar = true;
      }
    } else {
      if (error.error.length !== 0) {
        nuevo = true;
      }
    }
    console.log("nuevo: ", nuevo);
    if (nuevo) {
      let newErrores = this.state.errores;
      newErrores.push(error);
      this.setState({ errores: newErrores });
      return;
    }
    if (eliminar) {
      let newErrores = [];
      this.state.errores.forEach((element) => {
        if (element.llave !== error.llave) {
          newErrores.push(element);
        }
      });
      this.setState({ errores: newErrores });
    }
  }
  async handleOnClick(e) {
    console.log("validacion al click: ", this.state.errores);
    if (this.state.errores.length === 0) {
      e.preventDefault();
      console.log("alumno: ", this.state.alumno);
      let {
        nombres,
        apellidos,
        codigo,
        correo,
        programa,
        telefono,
        direccion,
      } = this.state.alumno;
      const nuevoEstudiante = {
        alumno: {
          APELLIDOS: apellidos,
          CODIGO: codigo,
          CONTRASENHA: "sudo tys",
          CORREO: correo,
          DIRECCION: direccion,
          NOMBRE: nombres,
          PROGRAMA: programa,
          TELEFONO: telefono,
          USUARIO: "UsuarioPruebaRegistrar",
          ETIQUETA: this.state.etiqueta,
        },
      };
      const props = { servicio: "/api/alumno", request: nuevoEstudiante };
      console.log("saving new student in DB:", nuevoEstudiante);
      let nuevoAlumno = await Controller.POST(props);
      if (nuevoAlumno) {
        let alert = Object.assign({}, this.state.alert);
        alert.mensaje = alert.mensajeExito;
        alert.mensajeStrong = alert.mensajeStrongExito;
        this.setState({ alert: alert });
        this.setState({ severidad: "success" });
        this.state.alert.mensaje = this.state.alert.mensajeExito;
        //alert("Alumno registrado Satisfactoriamente");
        //entonces viajo al tab de listado de alumnos
      }
      console.log("got updated alumno from back:", nuevoAlumno);
    } else {
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = alert.mensajeStrongError;
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });

      this.state.alert.mensaje = this.state.alert.mensajeError;

      //mostrar warning
    }
  }
  handleOnChange = (e) => {
    // nombre y descripcion
    let alumno = Object.assign({}, this.state.alumno);
    console.log(e);
    alumno[e.name] = e.value;
    this.setState({ alumno: alumno });
  };

  handleTabOnChange = (e) => {
    //para cuando funcione la pestaña de importar alumnos
  };
  handleOnChangePrograma(programa) {
    console.log("proograma:", programa);
    this.state.alumno.programa = programa;
    console.log("proograma:", this.state.alumno.programa);
  }
  handleOnChangeEtiquetas = (etiqueta) => {
    //primero que llegue
    //luego que se guarde en un state
    //console.log("LLegue: ", etiqueta);
    const listaEtiquetas = [];
    etiqueta.forEach((element) => {
      if (element.agregar) {
        listaEtiquetas.push(element.id);
      }
    });
    this.setState({ etiqueta: listaEtiquetas });
    //this.setState({tutoria:tutoria});
    console.log("Seteado: ", this.state.etiqueta);
  };
  componentDidMount() {}
  render() {
    return (
      <>
        <Alertas
          severity={this.state.severidad}
          titulo={"Observacion:"}
          alerta={this.state.alert}
        />
        <TituloFormulario titulo="Formulario de Registro de Alumnos:" />
        <Grid container spacing={0}>
          <Grid item md={4} xs={12}>
            {/* Npmbres */}
            <CampoDeTexto
              requerido={true}
              autoFocus={true}
              name="nombres"
              label="Nombres"
              inicial="Jin SSJ"
              validacion={{ lim: 25 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Apellidos */}
            <CampoDeTexto
              requerido={true}
              autoFocus={true}
              name="apellidos"
              label="Apellidos"
              validacion={{ lim: 50 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Correo */}
            <CampoDeTexto
              requerido={true}
              autoFocus={true}
              name="correo"
              type="email"
              label="Correo"
              validacion={{ lim: 25, tipo: "email" }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Telefono */}
            <CampoDeTexto
              autoFocus={true}
              name="telefono"
              label="Teléfono"
              validacion={{ lim: 45, tipo: "telefono" }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Direccion */}
            <CampoDeTexto
              requerido={true}
              autoFocus={true}
              name="direccion"
              label="Dirección"
              validacion={{ lim: 50, tipo: "direccion" }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            <br />
            <br />
          </Grid>
          <Grid item md={4} xs={12}>
            {/* Codigo */}
            <CampoDeTexto
              requerido={true}
              autoFocus={true}
              name="codigo"
              label="Código"
              validacion={{ lim: 10, tipo: "codigo" }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Lista  programas */}
            <ListaComboBox
              mensaje="programa"
              titulo={"Programas"}
              enlace={"/api/programa"}
              id={"ID_PROGRAMA"}
              nombre={"NOMBRE"}
              keyServicio={"programa"}
              escogerItem={this.handleOnChangePrograma}
            />
            <ListaEtiquetas
              strecht={false}
              titulo={"Etiquetas(opcional):"}
              obtenerEtiquetas={this.handleOnChangeEtiquetas}
              enlace={"/api/etiqueta"}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            {/* Guardar */}
            <br />
            <Grid container spacing={5}>
              <Grid item md={6} xs={8}></Grid>
              <Grid item md={4} xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={this.handleOnClick}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid item md={6} xs={8}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default FormularioRegistrarAlumno;
