import React, { Component } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import ListaProgramas from "./../ListaProgramas";
import GrupoRadioButton from "./GrupoRadioButton";
import ListaEtiquetas from "./ListaEtiquetas";
import * as Conexion from "./../../../Conexion/Controller.js";
import Alertas from "../Alertas";
import CampoDeTexto from "./CampoDeTexto";
import TituloFormulario from "./TituloFormulario";
import ListaComboBox from "./ListaComboBox";
import { getUser } from "../../../Sesion/Sesion";
const estilos = {
  paper: {
    marginTop: "1%",
    marginRight: "3%",
    flexDirection: "column",
    backgroundImage: "",
  },
  centerizable: {
    textAlign: "center",
  },
};
class FormularioNuevaTutoria extends Component {
  constructor() {
    super();
    this.state = {
      usuarioLogueado: getUser(),
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
      radios: {
        permanente: [
          { titulo: "Semestral", valor: 0 },
          { titulo: "Permanente", valor: 1 },
        ],
        obligatorio: [
          { titulo: "Obligatorio", valor: 1 },
          { titulo: "Opcional", valor: 0 },
        ],
        tutor_asignado: [
          { titulo: "Solicitado", valor: 0 },
          { titulo: "Asignado", valor: 1 },
        ],
        tutor_fijo: [
          { titulo: "Variable", valor: 0 },
          { titulo: "Fijo Semestral", valor: 1 },
          { titulo: "Fijo Permanente", valor: 2 },
        ],
        grupal: [
          { titulo: "Grupal", valor: 1 },
          { titulo: "Individual", valor: 0 },
        ],
      },

      validacionOk: false,
      errores: [],
      duracion: {
        duracion: [
          { ID: 30, NOMBRE: "30 min" },
          { ID: 60, NOMBRE: "60 min" },
          { ID: 90, NOMBRE: "90 min" },
        ],
      },
      alert: {
        mensajeStrong: "",
        mensajeStrongError: "por favor revisalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Proceso de Tutoria registrado",
        mensaje: "",
      },
      severidad: "warning",
    };
    this.obtenerSeleccionRadio = this.obtenerSeleccionRadio.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangeEtiquetas = this.handleOnChangeEtiquetas.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChangeDuracion = this.handleOnChangeDuracion.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
    this.handleOnChangeFacultad = this.handleOnChangeFacultad.bind(this);
    this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
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
  obtenerSeleccionRadio(e) {
    let tutoria = Object.assign({}, this.state.tutoria);
    const radios = this.state.radios[e.name];

    radios.forEach((rad) => {
      if (rad.titulo === e.value) {
        console.log("encontrado: ", rad);
        tutoria[e.name] = rad.valor;
        this.setState({ tutoria: tutoria });
        return;
      }
    });
  }
  handleOnChangePrograma(programa) {
    console.log("proograma:", programa);

    let tutoria = Object.assign({}, this.state.tutoria);
    tutoria.programa = programa[0];
    this.setState({ tutoria: tutoria });
    // console.log("proograma:", this.state.tutoria.programa);
    // this.setState({ filtroFacultad: programa[0] });
  }
  handleOnChangeFacultad(facultad) {
    console.log("HAAAAAAAAAA facu:", facultad);

    const usuario = getUser().usuario;
    const subrol = this.getSubRol(
      getUser().rol
    );
    const ID = usuario.ID_USUARIO;
    let enlace = usuario
      ? subrol === "facultad"
        ? `/api/programa/lista/${facultad[0]}`
        : subrol === "programa"
        ? `/api/programa/lista/${ID}/${facultad[0]}`
        : ""
      : "";
    this.setState({ filtroFacultad: enlace });
  }
  handleOnChangeDuracion(duracion) {
    console.log("duracion:", duracion);
    let tutoria = Object.assign({}, this.state.tutoria);
    tutoria.duracion=duracion;
    this.setState({tutoria:tutoria});
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
    // nombre y descripcion
    let tutoria = Object.assign({}, this.state.tutoria);
    console.log(e);
    tutoria[e.name] = e.value;
    this.setState({ tutoria: tutoria });
  };
  async handleOnClick(e) {
    console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    console.log("NOOOOOOOOOO: ", this.state.errores);
    if (this.state.errores.length === 0) {
      e.preventDefault();
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
        if (nuevaTutoria.error) {
          //ocurrio un error
          let alert = Object.assign({}, this.state.alert);
          alert.mensaje = `${alert.mensajeError}: ${nuevaTutoria.error}`;
          alert.mensajeStrong = alert.mensajeStrongError;
          this.setState({ alert: alert });
          this.setState({ severidad: "error" });

          this.state.alert.mensaje = this.state.alert.mensajeError;
          return;
        }
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
      alert.mensaje = `${alert.mensajeError}: ${this.state.errores.map(
        (error) => error.error
      )}`;

      alert.mensajeStrong = alert.mensajeStrongError;

      this.setState({ alert: alert });
      this.setState({ severidad: "error" });
      this.state.alert.mensaje = this.state.alert.mensajeError;
    }
  }
  /**
   * Obtiene el subrol, util cuando se trarta de coordinador de programa o facultad
   * @param {string} fullRol
   */
  getSubRol(fullRol) {
    let subrol = fullRol?.split(" ");
    return subrol ? subrol[1].toLowerCase() : "";
  }
  /**
   * De acuerto al tipo de coordinador obtiene el enlace apropiado
   * @param {*} usuario
   */
  getEnlace(usuario) {
    //console.log("HAAAA",usuario);
    //usuarioLogueado?"/api/facultad//"
    //          "/api/facultad/lista/" + getUser().usuario.ID_USUARIO
    //"/api/facultad/coordinador/" + getUser().usuario.ID_USUARIO
    const subrol = this.getSubRol(
      getUser().rol
    );

    const ID = usuario.ID_USUARIO;
    let enlace = usuario
      ? subrol === "facultad"
        ? "/api/facultad/coordinador/" + ID
        : subrol === "programa"
        ? "/api/facultad/lista/" + ID
        : ""
      : "";

    return enlace;
  }
  async componentDidMount() {
    console.log("FORMULARIONUEVATURRIA: ", this.state.usuarioLogueado);
  }
  render() {
    return (
      <>
        <Alertas
          severity={this.state.severidad}
          titulo={"Observacion"}
          alerta={this.state.alert}
        />
        <Grid container spacing={0}>
          <Grid item md={6} xs={12}>
            {/* Nombre tutoria */}
            <CampoDeTexto
              name="nombre"
              label="Nombre de la Tutoria"
              requerido={true}
              autoFocus={true}
              inicial=""
              validacion={{ lim: 25 }}
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />
            {/* Descripcion tutoria */}
            <CampoDeTexto
              autoFocus={true}
              name="descripcion"
              label="Descripción"
              validacion={{ lim: 100 }}
              variant={"outlined"}
              rows={4}
              multiline={true}
              requerido={true}
              inicial=""
              onChange={this.handleOnChange}
              validarEntrada={this.validarEntrada}
            />

            {/* Lista  facultades */}
            <ListaComboBox
              mensaje="facultad"
              titulo={"Facultad"}
              enlace={this.getEnlace(getUser().usuario)}
              id={"ID_PROGRAMA"}
              nombre={"NOMBRE"}
              subnombre={
                this.getSubRol(
                  getUser().rol
                ) === "programa"
                  ? "FACULTAD"
                  : undefined
              }
              keyServicio={"facultades"}
              escogerItem={this.handleOnChangeFacultad}
              small={true}
              inicial={true}
              placeholder={"Escoja la facultad"}
            />
            {this.state.filtroFacultad ? (
              <ListaComboBox
                mensaje="programa"
                titulo={"Programa"}
                enlace={this.state.filtroFacultad}
                id={"ID_PROGRAMA"}
                nombre={"NOMBRE"}
                keyServicio={
                  this.getSubRol(
                    getUser().rol
                  ) === "programa"
                    ? "programas"
                    : "programa"
                }
                escogerItem={this.handleOnChangePrograma}
                small={true}
                inicial={true}
                placeholder={"Escoja el programa"}
              />
            ) : (
              <></>
            )}

            {/* Vigencia */}
            <GrupoRadioButton
              name={"permanente"}
              disabled={false}
              titulo="Vigencia"
              radios={this.state.radios.permanente}
              obtenerSeleccion={this.obtenerSeleccionRadio}
            />

            {/* Duracion */}

            <ListaComboBox
            //allObject={true}
              mensaje="periodo"
              escogerItem={this.handleOnChangeDuracion}
              titulo={"Duracion Maxima"}
              datos={this.state.duracion}
              id={"ID"}
              nombre={"NOMBRE"}
              keyServicio={"duracion"}
              placeholder={"Escoja una duración"}
            />
            <br />
          </Grid>
          <Grid item md={6} xs={12}>
            {/* Etiqueats de tipo de tutoria */}
            <ListaEtiquetas
              titulo={"Etiquetas(opcional):"}
              obtenerEtiquetas={this.handleOnChangeEtiquetas}
              enlace={"/api/etiqueta"}
            />

            {/* Tipo de Asignacion */}
            <GrupoRadioButton
              name={"tutor_asignado"}
              id="tipoAsignarTutor"
              titulo="Tipo de Asignacion Tutor"
              radios={this.state.radios.tutor_asignado}
              obtenerSeleccion={this.obtenerSeleccionRadio}
            />

            {/* Naturaleza de Tutoria*/}
            <GrupoRadioButton
              name={"obligatorio"}
              titulo="Naturaleza de la Tutoría"
              radios={this.state.radios.obligatorio}
              obtenerSeleccion={this.obtenerSeleccionRadio}
            />

            {/* Tipo de Tutor */}
            <GrupoRadioButton
              name={"tutor_fijo"}
              id="tipoTutor"
              titulo="Tipo de Tutor"
              radios={this.state.radios.tutor_fijo}
              obtenerSeleccion={this.obtenerSeleccionRadio}
            />

            {/* Tipo de Agrupacion */}
            <GrupoRadioButton
              name={"grupal"}
              id="tipoAsignarTutor"
              titulo="Tipo de Agrupacion de Alumnos"
              radios={this.state.radios.grupal}
              obtenerSeleccion={this.obtenerSeleccionRadio}
            />

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
        <br />
      </>
    );
  }
}

export default FormularioNuevaTutoria;
