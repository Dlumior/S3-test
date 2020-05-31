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
      validacion: {
        ok: false,
        codigo: {
          lim: 12,
          mssgOk: "",
          mssgError: "Codigo debe ser maximo de 12 caracteres",
        },
        nombres: {
          lim: 100,
          mssgOk: "",
          mssgError: "Nombres deben ser maximo de 100 caracteres",
        },
        apellidos: {
          lim: 100,
          mssgOk: "",
          mssgError: "Apellidos deben ser maximo de 100 caracteres",
        },
        correo: {
          lim: 100,
          regex: /[@]/g,
          mssgOk: "",
          mssgError: "Correo debe ser maximo de 100 caracteres",
        },
        programa: {
          mssgOk: "",
          mssgError: "Debe seleccionar el programa del alumno",
        },
        telefono: {
          lim: 45,
          mssgOk: "",
          mssgError: "Telefono debe ser maximo de 45 caracteres",
        },
        direccion: {
          lim: 100,
          mssgOk: "",
          mssgError: "Direccion debe ser maximo de 100 caracteres",
        },
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
    };
    this.handleOnChangeEtiquetas = this.handleOnChangeEtiquetas.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnClick(e) {
    /*if(this.state.alumno.programa=[]){
      this.state.mensaje.programa = this.state.validacion.programa.mssgError;
      this.state.validacion.ok=false;
    }*/
    if (this.state.validacion.ok) {
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
    let alumno = Object.assign({}, this.state.alumno);
    if (e.target.value.length > this.state.validacion[e.target.name].lim) {
      let validacion = Object.assign({}, this.state.validacion);
      validacion.ok = false;
      this.setState({validacion:validacion});

      let mensajes = Object.assign({}, this.state.mensaje);
      mensajes[e.target.name] = this.state.validacion[e.target.name].mssgError;
      this.setState({ mensaje: mensajes });
      
      e.target.value = this.state.alumno[e.target.name];

      return;
    }
    /*    if (this.state.validacion[e.target.name].regex !== undefined) {
      const str = e.target.value;
      var result = str.match(this.state.validacion[e.target.name].regex);
      console.log("result", result);
      return;
    }
*/
    if (this.state.validacion.ok === false) {
      this.state.validacion.ok = true;
    }
    let mensajes = Object.assign({}, this.state.mensaje);
    mensajes[e.target.name] = this.state.validacion[e.target.name].mssgOk;
    alumno[e.target.name] = e.target.value;
    this.setState({ mensaje: mensajes });
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
          titulo={"Observacion"}
          alerta={this.state.alert}
        />

        <Paper elevation={0} style={style.paper}>
          <Grid container spacing={6}>
            
            <Grid item md={3} xs={12}>
              <Grid item md={12} xs={12}>
                <TextField
                  required
                  fullWidth
                  name="nombres"
                  label="Nombres"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.nombres}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  name="apellidos"
                  label="Apellidos"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.apellidos}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  name="correo"
                  type="email"
                  label="Correo*"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.correo}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <br />
                <ListaProgramas
                  titulo={"Programas"}
                  escogerPrograma={this.handleOnChangePrograma}
                  enlace={"/api/programa"}
                />
                <FormHelperText error>
                  {this.state.mensaje.programa}
                </FormHelperText>
                <br />
              </Grid>
            </Grid>
           
            <Grid item md={3} xs={12}>
              <Grid item md={12} xs={12}>
                <TextField
                  name="telefono"
                  fullWidth
                  label="Teléfono"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.telefono}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  name="direccion"
                  fullWidth
                  label="Dirección"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.direccion}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  name="codigo"
                  fullWidth
                  label="Código"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.codigo}
                </FormHelperText>
              </Grid>
            </Grid>
            <Grid item md={1} xs={12}></Grid>
            <Grid item md={4} xs={12}>
              <Grid item md={12} xs={12}>
                <ListaEtiquetas
                  titulo={"Etiquetas(opcional):"}
                  obtenerEtiquetas={this.handleOnChangeEtiquetas}
                  enlace={"/api/etiqueta"}
                />
              </Grid>
              <Grid item md={6} xs={6}><br/><br/><br/></Grid>
              <Grid item md={6} xs={6}></Grid>
              <Grid item md={6} xs={6}>
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
            </Grid>
            <Grid item md={1} xs={12}></Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default FormularioRegistrarAlumno;
