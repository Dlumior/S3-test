import React, { Component } from "react";
import { Paper, Grid, TextField, Button, makeStyles,Typography } from "@material-ui/core";
import ListaProgramas from "./ListaProgramas";
//import useFetchData from "../../Conexion/useFetchData";

//import Paso from "./paso";
const style = {
  caja: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "5%",
    flexDirection: "column",
    backgroundImage: ""
  },
};
class FrmAsignacionTutor extends Component {
  constructor() {
    super();
    this.state = {
      asignacion: {
        programa:'',
        tutor:0,
        procesodetutoria:0,
        alumno:[]
      }
    }
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange = (e) => {
    let asignacion = Object.assign({}, this.state.asignacion);
    this.setState({ asignacion: asignacion });
  };
  handleOnChangePrograma(programa) {
    console.log("proograma:", programa);
    this.state.asignacion.programa = programa;
    console.log("proograma:", this.state.asignacion.programa);
  }
  render (){
    return(
      <Grid container spacing={12}>
        <Paper  style={style.caja}>
        <Grid item xs={12} container spacing={5}>
          <Grid item
            xs={6}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">1. Seleccionar Programa </Typography>
          </Grid>
          <Grid item xs={3}>
            <br />
              <ListaProgramas
                titulo={"Programas"}
                escogerPrograma={this.handleOnChangePrograma}
                enlace={"/api/programa"}
              />
            <br />
          </Grid>
          <Grid item
            xs={6}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">2. Seleccionar Proceso de Tutoría </Typography>
          </Grid>
          <Grid item xs={3}>
            <ListaProgramas
                titulo={"Proceso de Tutoría"}
                escogerPrograma={this.handleOnChangePrograma}
                enlace={"/api/programa"}
            />
          </Grid>
          <Grid item
            xs={6}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">3. Seleccionar Tutor </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button 
            variant="outlined"
            color="primary">
            Ver Tutores
            </Button>
          </Grid>
          <Grid item
            xs={6}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">4. Seleccionar Alumno(s) </Typography>
          </Grid>
          <Grid item xs={6}>
          <Button 
            variant="outlined"
            color="primary">
            Ver Alumnos
            </Button>
          </Grid>
          <Grid item
            xs={6}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">5. Asignación Completa </Typography>
          </Grid>
          <Grid item xs={6}>
          <Button 
            variant="contained"
            color="primary">
            Guardar
            </Button>
          </Grid>
        </Grid>
        </Paper>
      </Grid>
    
    )
  }
} 

export default FrmAsignacionTutor;
