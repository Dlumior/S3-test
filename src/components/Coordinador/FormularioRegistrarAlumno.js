import React, { Component } from "react";
import * as Controller from "../../Conexion/Controller";
import {
  Paper,
  Tabs,
  Grid,
  TextField,
  Tab,
  Button,
  FormHelperText,
} from "@material-ui/core";
import ListaProgramas from "./ListaProgramas";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
          regex: "/[@]/g",
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
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnClick(e) {
    e.preventDefault();
    //console.log("alumno: ", this.state.alumno);
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
        CONTRASENHA: "contra",
        CORREO: correo,
        DIRECCION: direccion,
        NOMBRE: nombres,
        PROGRAMA: programa,
        TELEFONO: telefono,
        USUARIO: "UsuarioPruebaRegistrar",
      },
    };
    const props = { servicio: "/api/alumno", request: nuevoEstudiante };
    //console.log("saving new student in DB:", nuevoEstudiante);
    let nuevoAlumno = await Controller.POST(props);
    if (nuevoAlumno) {
      alert("Alumno registrado Satisfactoriamente");
    }
    //console.log("got updated alumno from back:", nuevoAlumno);
  }
  handleOnChange = (e) => {
    let alumno = Object.assign({}, this.state.alumno);
    if (e.target.value.length > this.state.validacion[e.target.name].lim) {
      let mensajes = Object.assign({}, this.state.mensaje);
      mensajes[e.target.name] = this.state.validacion[e.target.name].mssgError;
      this.setState({ mensaje: mensajes });
      e.target.value = this.state.alumno[e.target.name];

      return;
    }
    /*    if (this.state.validacion[e.target.name].regex !== undefined) {
      const str = e.target.value;
      var result = str.match(this.state.validacion[e.target.name].regex);
      //console.log("result", result);
      return;
    }
*/
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
    //console.log("proograma:", programa);
    this.state.alumno.programa = programa;
    //console.log("proograma:", this.state.alumno.programa);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <Paper elevation={0} style={style.paper}>
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabOnChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Ingresar Alumnos" />
            <Tab label="Importar Alumnos" />
          </Tabs>
        </Paper>
        <div style={style.envoltorioFormulario}>
          <br />
          <div style={style.formRegistrarAlumno}>
            <Grid container spacing={5}>
              <Grid item md={1} xs={1} style={style.paper} />
              <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={12} xs={12}>
                  <TextField
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
                    label="Correo"
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
                    {this.state.mensaje.programas}
                  </FormHelperText>
                  <br />
                </Grid>
              </Grid>

              <Grid item md={3} xs={4} style={style.paper}>
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

              <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={6} xs={10}>
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
              <Grid item md={1} xs={1} style={style.paper} />
            </Grid>
          </div>
          <br /> <br /> <br /> <br />
        </div>
      </div>
    );
  }
}

export default FormularioRegistrarAlumno;
