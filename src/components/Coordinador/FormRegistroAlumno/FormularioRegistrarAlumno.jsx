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
import { getUser } from "../../../Sesion/Sesion";
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
      institucion:{
        ID:'',
        NOMBRE:"",
        INICIALES:"",
        IMAGEN:"",
        TELEFONO:"",
        PAGINA_WEB:"",
        DOMINIO:"",
        DOMINIO2:"",
        UBICACION:"",
        EXTENSION:"",  
      },
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
  async handleOnClick(e) {
    console.log("validacion al click: ", this.state.errores);
    let dominio = this.state.institucion.DOMINIO;
    let dominio2 = this.state.institucion.DOMINIO2;
    let email = this.state.alumno.correo;
    console.log("PRUEBA AAAA", email.substr(-dominio.length), email.substr(-dominio2.length));
    if (email.substr(-dominio.length)!==dominio && email.substr(-dominio2.length)!==dominio2) { // validación del dominio de la institución
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = "El correo debe pertenecer a los dominios de la institución.";
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });

      this.state.alert.mensaje = this.state.alert.mensajeError;
      return;
    }
    

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
        if (nuevoAlumno.error) {
          //ocurrio un error
          let alert = Object.assign({}, this.state.alert);
          alert.mensaje = `${alert.mensajeError}: ${nuevoAlumno.error}`;
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
        //alert("Alumno registrado Satisfactoriamente");
        //entonces viajo al tab de listado de alumnos
      }
      console.log("got updated alumno from back:", nuevoAlumno);
    } else {
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = `${alert.mensajeError}: ${this.state.errores.map((error)=>error.error)}`;
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
    // let tutoria = Object.assign({}, this.state.tutoria);
    // tutoria.programa = programa[0];
    // this.setState({ tutoria: tutoria });
    // console.log("proograma:", this.state.tutoria.programa);
    // this.setState({ filtroFacultad: programa[0] });
  }
  handleOnChangeFacultad(facultad) {
    console.log("HAAAAAAAAAA facu:", facultad);

    const usuario = getUser().usuario;
    const subrol = this.getSubRol(
      usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
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
      usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
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
    let getInsitucion=await Controller.GET({servicio:"/api/institucion"});
    console.log("got institucion from back:", getInsitucion.institucion);
    this.setState({institucion:getInsitucion.institucion});
    console.log("this.state.institucion: ", this.state.institucion);   
    console.log("this.state.NOMBRE:", this.state.institucion.DOMINIO, this.state.institucion.DOMINIO2);  
  }

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
              inicial=""
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
              dominio = {this.state.institucion.DOMINIO}
              dominio2 = {this.state.institucion.DOMINIO2}
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

            {/* Lista  facultades */}
            <ListaComboBox
              mensaje="facultad"
              titulo={"Facultad"}
              enlace={this.getEnlace(getUser().usuario)}
              id={"ID_PROGRAMA"}
              nombre={"NOMBRE"}
              subnombre={
                this.getSubRol(
                  getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
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
                    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL
                      .DESCRIPCION
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

            {/**etiquetas */}
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
