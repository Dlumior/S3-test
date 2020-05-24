import React, { Component } from "react";
import { Paper, Grid, TextField, Button, makeStyles,Typography } from "@material-ui/core";
import ListaProgramas from "./ListaProgramas";
//import useFetchData from "../../Conexion/useFetchData";

//import Paso from "./paso";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
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
      
      <Paper elevate={0} style={style.paper}>
        <Grid container spacing={10}>
          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">1. Seleccionar Programa </Typography>
          </Grid>
          <Grid item md={3}>
            <ListaProgramas
              titulo={"Programas"}
              escogerPrograma={this.handleOnChangePrograma}
              enlace={"/api/programa"}
            />
          </Grid>
          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">2. Seleccionar Proceso de Tutoría </Typography>
          </Grid>
          <Grid item md={3}>
            <ListaProgramas
                titulo={"Proceso de Tutoría"}
                escogerPrograma={this.handleOnChangePrograma}
                enlace={"/api/programa"}
            />
          </Grid>
          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">3. Seleccionar Tutor </Typography>
          </Grid>
          <Grid item md={5}>
            <Button 
            variant="outlined"
            color="primary">
            Ver Tutores
            </Button>
          </Grid>
          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">4. Seleccionar Alumno(s) </Typography>
          </Grid>
          <Grid item md={6}>
          <Button 
            variant="outlined"
            color="primary">
            Ver Alumnos
            </Button>
          </Grid>
          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Typography variant="h5">5. Asignación Completa </Typography>
          </Grid>
          <Grid item md={5}>
          <Button 
            variant="contained"
            color="primary">
            Guardar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    
    )
  }
} 

export default FrmAsignacionTutor;
