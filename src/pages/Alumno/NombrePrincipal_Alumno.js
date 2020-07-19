import React, { Component } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  withStyles,
  Button,
  Paper,
} from "@material-ui/core";
import { compose } from "recompose";
import { getUser } from "../../Sesion/Sesion";
import ListaComboBox from "../../components/Coordinador/Tutorias/ListaComboBox";

const estilos = {
  paper: {
    backgroundColor: "#ffffff",
  },
};
class NombrePrincipal_Alumno extends Component {

  constructor(){
    super();

    this.handleOnChangeProceso = this.handleOnChangeProceso.bind(this);
  }

  
  handleOnChangeProceso(proceso) {
    // console.log("proceso seleccionado: ", proceso);
    // //aqui se o mando al componente padre
    // if (this.props.filtroProceso) {
    //   this.props.handleFiltroProceso(proceso[0]);
    // }
  }

  render() {
    return (
      <Paper style={estilos.paper}>
        <Grid container spacing={0}>
          <Grid item md={8} style={{marginLeft:"3%"}}>
            <Typography component="h1" variant="h5">
              <h2>{this.props.titulo}</h2>
            </Typography>
          </Grid>
          {/* <Grid item md={4}>
            <h1></h1>
          </Grid> */}
          <ListaComboBox
            allObject={true}
            mensaje="Programa"
            escogerItem={this.handleOnChangeProceso}
            titulo={"Programa del Alumno"}
            enlace={"/api/programa/alumno/"+getUser().usuario.ID_USUARIO}
            id={"ID_PROGRAMA"}
            nombre={"NOMBRE"}
            keyServicio={"programas"}
            placeholder={"Programa matriculado"}
          />

        </Grid>
      </Paper>
    );
  }
}

export default NombrePrincipal_Alumno;