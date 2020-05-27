import React, { Component } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import ListaProgramas from "../ListaProgramas";
import GrupoRadioButton from "./GrupoRadioButton";
import ListaEtiquetas from "./ListaEtiquetas";
import * as Conexion from "./../../../Conexion/Controller.js";
import Alertas from "../Alertas";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    backgroundImage: "",
  },
};
class FormNuevaTutoria extends Component {
  constructor() {
    super();
    this.state = {
      etiqueta: [],
      tutoria: {
        nombre: "",
        descripcion: "",
        obligatorio: 0,
        tutor_fijo: 0,
        grupal: 0,
        tutor_asignado: 0,
        permanente: 0,
        programa: "",
        duracion: 0,
      },
      mensaje: {
        nombre: "",
        descripcion: "",
        programa: "",
      },
      radios: {
        vigencia: [
          { titulo: "Permanente", valor: "Permanente" },
          { titulo: "Semestral", valor: "Semestal" },
        ],
        naturaleza: [
          { titulo: "Obligatorio", valor: "Obligatorio" },
          { titulo: "Opcional", valor: "Opcional" },
        ],
        tipoAsignacion: [
          { titulo: "Solicitado", valor: "Solicitado" },
          { titulo: "Asignado", valor: "Asignado" },
        ],
        tipoTutor: [
          { titulo: "Variable", valor: "Variable" },
          { titulo: "Fijo", valor: "Fijo" },
          { titulo: "Fijo Semestral", valor: "Fijo Semestral" },
          { titulo: "Fijo Permanente", valor: "Fijo Permanente" },
        ],
        tipoAgrupacion: [
          { titulo: "Grupal", valor: "Grupal" },
          { titulo: "Individual", valor: "Individual" },
        ],
      },
      mensaje: {
        nombre: "",
        descripcion: "",
        programa: "",
        duracion: "",
      },
      validacion: {
        ok: false,
        nombre: {
          lim: 20,
          mssgOk: "",
          mssgError: "Nombre debe ser maximo de 20 caracteres",
        },
        descripcion: {
          lim: 100,
          mssgOk: "",
          mssgError: "Descripcion deben ser maximo de 100 caracteres",
        },
        programa: {
          mssgError: "Debe escoger un Programa",
        },
        duracion: {
          mssgError: "Debe escoger la duracion de la tutoria",
        },
      },
      alert: {
        mensajeStrong: "",
        mensajeStrongError: "porfavor revisalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Proceso de Tutoria registrado",
        mensaje: "",
      },
      severidad: "warning",
    };
    this.obtenerSeleccion = this.obtenerSeleccion.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangeEtiquetas = this.handleOnChangeEtiquetas.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChangeDuracion = this.handleOnChangeDuracion.bind(this);
  }
  obtenerSeleccion(seleccion) {
    console.log("seleccion", seleccion);
  }
  handleOnChangePrograma(programa) {
    console.log("proograma:", programa);
    this.state.tutoria.programa = programa[0];

    this.state.mensaje.programa = "";
    this.state.validacion.ok = true;
    console.log("proograma:", this.state.tutoria.programa);
  }
  handleOnChangeDuracion(duracion) {
    console.log("duracion:", duracion);
    this.state.tutoria.duracion = duracion[0];

    this.state.mensaje.duracion = "";
    this.state.validacion.ok = true;
    console.log("duracion:", this.state.tutoria.duracion);
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
    //console.log("Seteado: ", this.state.etiqueta);
  };
  handleOnChange = (e) => {
    let tutoria = Object.assign({}, this.state.tutoria);
    console.log(e.target.value);
    if (e.target.value.length > this.state.validacion[e.target.name].lim) {
      this.state.validacion.ok = false;
      let mensajes = Object.assign({}, this.state.mensaje);
      mensajes[e.target.name] = this.state.validacion[e.target.name].mssgError;
      this.setState({ mensaje: mensajes });
      e.target.value = this.state.tutoria[e.target.name];
      return;
    }
    if (this.state.validacion.ok === false) {
      this.state.validacion.ok = true;
    }
    let mensajes = Object.assign({}, this.state.mensaje);
    mensajes[e.target.name] = this.state.validacion[e.target.name].mssgOk;
    tutoria[e.target.name] = e.target.value;
    this.setState({ mensaje: mensajes });
    this.setState({ tutoria: tutoria });
  };
  async handleOnClick(e) {
    console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    /** validar que todos los satos esten antes y sino termiar funcion xd */
    /*if(this.state.tutoria.programa=[]){
      this.state.mensaje.programa = this.state.validacion.programa.mssgError;
      this.state.validacion.ok=false;
    }
    if(this.state.tutoria.duracion=0){
      this.state.mensaje.duracion = this.state.validacion.duracion.mssgError;
      this.state.validacion.ok=false;
    }*/
    if (this.state.validacion.ok) {
      console.log("NOOOOO_________________________________OOOOO");
      const {
        nombre,
        descripcion,
        obligatorio,
        tutor_fijo,
        grupal,
        tutor_asignado,
        permanente,
        programa,
        duracion,
      } = this.state.tutoria;
      let tutoria = {
        tutoria: {
          NOMBRE: nombre,
          DESCRIPCION: descripcion,
          OBLIGATORIO: obligatorio,
          TUTOR_FIJO: tutor_fijo,
          GRUPAL: grupal,
          TUTOR_ASIGNADO: tutor_asignado,
          PERMANENTE: permanente,
          ETIQUETA: this.state.etiqueta,
          PROGRAMA: programa,
          DURACION: duracion,
        },
      };
      const props = { servicio: "/api/tutoria", request: tutoria };
      console.log("saving new tutoria in DB:", tutoria);
      let nuevaTutoria = await Conexion.POST(props);
      if (nuevaTutoria) {
        let alert = Object.assign({}, this.state.alert);
        alert.mensaje = alert.mensajeExito;
        alert.mensajeStrong = alert.mensajeStrongExito;
        this.setState({ alert: alert });
        this.setState({ severidad: "success" });
        this.state.alert.mensaje = this.state.alert.mensajeExito;
        console.log("got updated alumno from back:", nuevaTutoria);
      } else {
        console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      }
    } else {
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = alert.mensajeStrongError;
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });

      this.state.alert.mensaje = this.state.alert.mensajeError;
    }
  }
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
            <Grid item md={5} xs={12}>
              <Grid item md={12} xs={12}>
                <TextField
                  autoFocus={true}
                  fullWidth
                  name="nombre"
                  label="Nombre de la Tutoria"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.nombre}
                </FormHelperText>
              </Grid>
              <Grid item md={12} xs={12}>
                <br />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  name="descripcion"
                  label="Descripción"
                  multiline
                  fullWidth
                  rows={4}
                  variant="outlined"
                  onChange={this.handleOnChange}
                />
                <FormHelperText error>
                  {this.state.mensaje.descripcion}
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
              <Grid item md={12} xs={12}>
                <GrupoRadioButton
                  disabled={false}
                  titulo="Vigencia"
                  radios={this.state.radios.vigencia}
                  obtenerSeleccion={this.obtenerSeleccion}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <br />
                <ListaProgramas
                  titulo={"Duracion Maxima"}
                  escogerPrograma={this.handleOnChangeDuracion}
                  enlace={"/api/programa"}
                />
                <FormHelperText error>
                  {this.state.mensaje.duracion}
                </FormHelperText>
                <br />
              </Grid>
            </Grid>
            <Grid item md={1} xs={12}></Grid>
            <Grid item md={5} xs={12}>
              <Grid item md={12} xs={12}>
                <br />
                <ListaEtiquetas
                  titulo={"Etiquetas(opcional):"}
                  obtenerEtiquetas={this.handleOnChangeEtiquetas}
                  enlace={"/api/etiqueta"}
                />
                <FormHelperText error>
                  {this.state.mensaje.programas}
                </FormHelperText>
              </Grid>

              <Grid item md={4} xs={4}>
                <GrupoRadioButton
                  id="tipoAsignarTutor"
                  titulo="Tipo de Asignacion Tutor"
                  radios={this.state.radios.tipoAsignacion}
                  obtenerSeleccion={this.obtenerSeleccion}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <GrupoRadioButton
                  titulo="Naturaleza de la Tutoría"
                  radios={this.state.radios.naturaleza}
                  obtenerSeleccion={this.obtenerSeleccion}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <GrupoRadioButton
                  id="tipoTutor"
                  titulo="Tipo de Tutor"
                  radios={this.state.radios.tipoTutor}
                  obtenerSeleccion={this.obtenerSeleccion}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <GrupoRadioButton
                  id="tipoAsignarTutor"
                  titulo="Tipo de Agrupacion de Alumnos"
                  radios={this.state.radios.tipoAgrupacion}
                  obtenerSeleccion={this.obtenerSeleccion}
                />
              </Grid>
              <Grid container spacing={5}>
                <Grid item md={8} xs={8}></Grid>
                <Grid item md={4} xs={4}>
                  <Grid item md={12} xs={10}>
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
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default FormNuevaTutoria;
