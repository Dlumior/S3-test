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
        mensajeStrongError: "porfavor revisalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Alumno registrado",
        mensaje: "",
      },
      severidad: "warning",
      validacionOk:false,
      errores:[],
    };
    this.handleOnChangeEtiquetas = this.handleOnChangeEtiquetas.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
  }
  validarEntrada(error){
    let errores = this.state.errores;
    let newErrores = [];
    let nuevo=true;
    let eliminar = false;
    errores.forEach((err) => {
      // si encuentro que ya puse el error
      if (err.llave === error.llave) {
        nuevo = false;
        //pregunto si lo que mando es lo que ya estaba, el error
        if(err.error !== error.error){
          //estoy viniendo a eliminarlo
          eliminar=true;
        }

      }
      if(!eliminar){
        newErrores.push(err);
      }
    });
    if(nuevo &&  error!=''){
      newErrores.push({llave:error.name,error:error.error});
      this.setState({errores:errores});
      return;
    }
    errores.push({llave:error.name,error:error.error});
    console.log("errores:",this.state.errores);
    this.setState({errores:errores});
  }
  async handleOnClick(e) {
    console.log("validacion al click: ", this.state.errores);
    if (false) {
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
              autoFocus={true}
              name="nombres"
              label="Nombres"
              validacion={{ lim: 25 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Apellidos */}
            <CampoDeTexto
              autoFocus={true}
              name="apellidos"
              label="Apellidos"
              validacion={{ lim: 50 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Correo */}
            <CampoDeTexto
              autoFocus={true}
              name="correo"
              type="email"
              label="Correo*"
              validacion={{ lim: 25, email: true }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Telefono */}
            <CampoDeTexto
              autoFocus={true}
              name="telefono"
              label="Teléfono"
              validacion={{ lim: 45 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Direccion */}
            <CampoDeTexto
              autoFocus={true}
              name="direccion"
              label="Dirección"
              validacion={{ lim: 50 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            {/* Codigo */}
            <CampoDeTexto
              autoFocus={true}
              name="codigo"
              label="Código"
              validacion={{ lim: 10 }}
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
