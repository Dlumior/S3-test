import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import {
  Paper,
  Tabs,
  Grid,
  TextField,
  Tab,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
const style = {
  paper: {
    marginTop: "4%",
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
      programas: ["", "Ingenieria Informatica", "Ingenieria industrial", "Ingenieria Civil", "Ingenieria Mecatronica"],
      alumno: {
        codigo:"",
        nombres: "",
        apellidos: "",
        correo: "",
        programa: "",
        telefono: "",
        direccion: "",
      },
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnClick(e) {
    /** Registar propiamente */
    e.preventDefault(); //prevenir que se refresque la pantalla
    console.log("alumno: ", this.state.alumno);
    let {
      nombres,
      apellidos,
      codigo,
      correo,
      currentProgram,
      telefono,
      direccion,
    } = this.state.alumno;
    const nuevoEstudiante = {
      alumno:{
        APELLIDOS: apellidos,
        CODIGO: codigo,
        CONTRASENHA: "sudo tys",
        CORREO: correo,
        DIRECCION: direccion,
        NOMBRE: nombres,
        PROGRAMA: [1],
        TELEFONO: telefono,
        USUARIO: "UsuarioPruebaRegistrar"
      }
    };
    const props = { servicio: "/api/alumno", request: nuevoEstudiante };
    console.log("saving new student in DB:", nuevoEstudiante);
    let nuevoAlumno = await Controller.POST(props);
    console.log("got updated alumno from back:", nuevoAlumno);
  }
  handleOnChange = (e) => {
    let alumno = Object.assign({}, this.state.alumno);
    alumno[e.target.name] = e.target.value;
    this.setState({ alumno: alumno });
  };
  handleTabOnChange = (e) => {
    //para cuando funcione la pestaña de importar alumnos
  };
  handleOnChangeSelect = (e) => {
    this.setState({ currentProgram: e.target.value });
    console.log(e.target.value);
  };
  render() {
    return (
      <div>
        <Paper square style={style.paper}>
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabOnChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Ingresar Alumnos">vadvawedv</Tab>
            <Tab label="Importar Alumnos" disabled />
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
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    name="apellidos"
                    label="Apellidos"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    name="correo"
                    type="email"
                    label="Correo"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <br />
                  <InputLabel>Programa</InputLabel>
                  <Select
                    fullWidth
                    value={this.state.currentProgram}
                    onChange={()=>this.handleOnChangeSelect}
                    name="programa"
                  >
                    {this.state.programas.map((program) => (
                      <MenuItem value={program}>{program}</MenuItem>
                    ))}
                  </Select>

                  <br />
                </Grid>
              </Grid>

              <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={12} xs={12}>
                  <TextField
                    name="telefono"
                    fullWidth
                    label="Telefono"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    name="direccion"
                    fullWidth
                    label="Direccion"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    name="codigo"
                    fullWidth
                    label="Codigo"
                    onChange={this.handleOnChange}
                  />
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

