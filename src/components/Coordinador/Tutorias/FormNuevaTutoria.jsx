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
      tutoria: {
        nombre: "",
        descripcion: "",
        programa: "",
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
    };
    this.obtenerSeleccion = this.obtenerSeleccion.bind(this);
  }
  obtenerSeleccion(seleccion) {
    console.log("seleccion", seleccion);
  }
  handleOnChangePrograma(programa) {
    console.log("proograma:", programa);
    this.state.tutoria.programa = programa;
    console.log("proograma:", this.state.alumno.programa);
  }
  render() {
    return (
      <Paper elevation={0} style={style.paper}>
        <Grid container spacing={6}>
          <Grid item md={4} xs={12}>
            <Grid item md={12} xs={12}>
              <TextField
                autoFocus={true}
                fullWidth
                name="nombreTutoria"
                label="Nombre de la Tutoria"
                onChange={this.handleOnChange}
              />
              <FormHelperText error>
                {this.state.mensaje.nombreTutoria}
              </FormHelperText>
            </Grid>
            <Grid item md={12} xs={12}>
              <br />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id="outlined-multiline-static"
                name="descripcionTutoria"
                label="Descripción"
                multiline
                fullWidth
                rows={4}
                value={this.state.descripcion}
                variant="outlined"
              />
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
            <Grid item md={12} xs={12}>
              <GrupoRadioButton
                titulo="Vigencia"
                radios={this.state.radios.vigencia}
                obtenerSeleccion={this.obtenerSeleccion}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <br />
              <ListaProgramas
                titulo={"Duracion Maxima"}
                escogerPrograma={this.handleOnChangePrograma}
                enlace={"/api/programa"}
              />
              <FormHelperText error>
                {this.state.mensaje.programas}
              </FormHelperText>
              <br />
            </Grid>
          </Grid>
          <Grid item md={1} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <Grid item md={12} xs={12}>
              <br />
              <ListaProgramas
                titulo={"Etiquetas"}
                escogerPrograma={this.handleOnChangePrograma}
                enlace={"/api/programa"}
              />
              <FormHelperText error>
                {this.state.mensaje.programas}
              </FormHelperText>
            </Grid>
            <Grid item md={12} xs={12}>
              <GrupoRadioButton
                titulo="Naturaleza de la Tutoría"
                radios={this.state.radios.naturaleza}
                obtenerSeleccion={this.obtenerSeleccion}
              />
            </Grid>

            <Grid item md={4} xs={4}>
              <GrupoRadioButton
                titulo="Tipo de Asignacion Tutor"
                radios={this.state.radios.tipoAsignacion}
                obtenerSeleccion={this.obtenerSeleccion}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <GrupoRadioButton
                titulo="Tipo de Tutor"
                radios={this.state.radios.tipoTutor}
                obtenerSeleccion={this.obtenerSeleccion}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <GrupoRadioButton
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
          <Grid item md={1} xs={12}></Grid>
        </Grid>
      </Paper>
    );
  }
}

export default FormNuevaTutoria;
