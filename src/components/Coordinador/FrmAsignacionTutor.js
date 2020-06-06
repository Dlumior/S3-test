import React, { Component } from "react";
import { Paper, Grid, TextField, Button, makeStyles,Typography } from "@material-ui/core";
import ListaProgramas from "./ListaProgramas";
import ListaProcesoTut from "./ListaProcesoTut";
import ListaTutores from "./ListaTutores";
import ListaAlumnos from "./ListaAlumnos";

import DialogListaTut from "./DialogListaTut";
import * as Controller from "../../Conexion/Controller";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TablaAlumnos from "./TablaAlumnos";
//import useFetchData from "../../Conexion/useFetchData";

//import Paso from "./paso";
const style = {
  paper: {
    marginTop: "5%",
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
        tutor:'',
        tutoria:'',
        alumnos:[]
      }    
    }
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChangeTutoria = this.handleOnChangeTutoria.bind(this);
    this.handleOnChangeTutor = this.handleOnChangeTutor.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleOnChangeAlumnos = this.handleOnChangeAlumnos.bind(this);    
  }
  async handleOnClick(e) {
    e.preventDefault();
    let {
      programa,
      tutoria,
      tutor,
      alumnos
    } = this.state.asignacion;
    const nuevaAsignacion = {
      asignacion: {
        ID_TUTOR: tutor,
        ID_PROCESO_TUTORIA: tutoria,
        ALUMNOS: alumnos,
      },
    };
    const props = { servicio: "/api/asignacion", request: nuevaAsignacion };
    console.log("saving new asignacion in DB:", nuevaAsignacion);
    let asignado = await Controller.POST(props);
    if (asignado) {
      alert("Alumno asignado Satisfactoriamente");
    }
    console.log("got updated alumno from back:", asignado);
    this.handleCloseDialog();
  }

  handleOpenDialog() {
    console.log("abrir");
    this.setState({
      openDialog: true
    });
    console.log("abierto");
  }

  handleCloseDialog() {
    console.log("cerrar");
    this.setState({
      openDialog: false
    });
  }
  handleOnChangeAlumnos(alumnosSeleccionados) {
    console.log("ALUMNOS:", alumnosSeleccionados);
    this.state.asignacion.alumnos=alumnosSeleccionados;
    console.log("ALUMNOS:", this.state.asignacion.alumnos);
  }

  handleOnChange = (e) => {
    let asignacion = Object.assign({}, this.state.asignacion);
    this.setState({ asignacion: asignacion });
  };
  handleOnChangePrograma(programa) {
    console.log("programa:", programa);
    this.state.asignacion.programa = programa;
    const idPrograma=this.state.asignacion.programa[0];
    console.log("id:", idPrograma);
    console.log("proograma:", this.state.asignacion.programa);
  }
  handleOnChangeTutoria(tutoria) {
    console.log("tutoria:", tutoria);
    this.state.asignacion.tutoria = tutoria;
    const idTutoria=this.state.asignacion.tutoria[0];
    console.log("id:", idTutoria);
    console.log("tutoria:", this.state.asignacion.tutoria);
  }
  handleOnChangeTutor(tutor) {
    console.log("tutor:", tutor);
    this.state.asignacion.tutor = tutor;
    const idTutor=this.state.asignacion.tutor[0];
    console.log("id:", idTutor);
    console.log("tutor:", this.state.asignacion.tutor);
  }
  render (){
    //let idPrograma=this.state.asignacion.programa[0];

    return(
      <div>
      <Paper elevate={0} style={style.paper}>
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
            <ListaProcesoTut
              titulo={"Proceso de Tutoría"}
              escogerTutoria={this.handleOnChangeTutoria}
              enlace={"/api/tutoria"}
            />
            </Grid>
            <Grid item md={5}
              container
              direction="column"
              alignItems="flex-start"
              justify="center" >
              <Typography variant="h5">3. Seleccionar Tutor </Typography>
            </Grid>
            <Grid item md={3}>
              <ListaTutores
                titulo={"Tutor"}
                escogerTutor={this.handleOnChangeTutor}
                enlace={"/api/tutor"}
              />
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
            color="primary"
            onClick={this.handleOpenDialog}>
            Ver Alumnos
          </Button>
            <Dialog open={this.state.openDialog} close={this.handleCloseDialog}>
              <DialogTitle>Alumnos</DialogTitle>
              <DialogContent>
                  <Grid md={25} container
                    direction="column"
                    alignItems="flex-start"
                    justify="center"> 
                  </Grid>
                  <ListaAlumnos
                    escogerAlumnos={this.handleOnChangeAlumnos}
                  />
              </DialogContent>
              <DialogActions>
                <Button 
                  variant="outlined"
                  color="primary"
                  onClick={this.handleCloseDialog}>
                  Cancelar
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={this.handleCloseDialog}>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
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
            color="primary"
            onClick={this.handleOnClick}>
            Guardar
           </Button>
          </Grid>
        </Grid>
      </Paper></Paper>
      </div>
    )
  }
} 

export default FrmAsignacionTutor;
