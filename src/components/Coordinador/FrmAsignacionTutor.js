import React, { Component } from "react";
import { Paper, Grid, TextField, Button, makeStyles,Typography } from "@material-ui/core";
import ListaProgramas from "./ListaProgramas";
import ListaProcesoTut from "./ListaProcesoTut";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TablaTutores from "../Alumno/FrmSolicitarTutorTipoII"
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
        tutoria:0,
        alumno:[]
      }
    }
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChangeTutoria = this.handleOnChangeTutoria.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }
  async handleOnClick(e) {

  }
  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }
  handleOnChange = (e) => {
    let asignacion = Object.assign({}, this.state.asignacion);
    this.setState({ asignacion: asignacion });
  };
  handleOnChangePrograma(programa) {
    console.log("programa:", programa);
    this.state.asignacion.programa = programa;
    //var idPrograma=programa.ID;
    console.log("proograma:", this.state.asignacion.programa);
  }
  handleOnChangeTutoria(tutoria) {
    console.log("tutoria:", tutoria);
    //tutoria.programa.idPrograma
    this.state.asignacion.tutoria = tutoria;
    console.log("tutoria:", this.state.asignacion.tutoria);
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
          <Grid item md={5}>
            <Button 
            variant="outlined"
            color="primary"
            onClick={this.handleOpenDialog}>  
            Ver Tutores
            </Button>
          </Grid>
          <Grid item md={50}>
            <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
              <DialogContent>
                <p>
                  <Grid md={25} container
                    direction="column"
                    alignItems="flex-start"
                    justify="center"> 
                    <TablaTutores/>
                  </Grid>
                </p>
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
            <Typography variant="h5">4. Seleccionar Alumno(s) </Typography>
          </Grid>
          <Grid item md={6}>
          <Button 
            variant="outlined"
            color="primary"
            onClick={this.handleOpenDialog}>
            Ver Alumnos
            </Button>
            <Dialog >
              <DialogContent>
                <p>
                  <Grid md={25} container
                    direction="column"
                    alignItems="flex-start"
                    justify="center"> 
                    <TablaTutores/>
                  </Grid>
                </p>
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
