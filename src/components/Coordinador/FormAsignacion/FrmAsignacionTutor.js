import React, { Component } from "react";
import { Paper, Grid, TextField, Button, makeStyles,Typography } from "@material-ui/core";
import ListaFacultades from "./ListaFacultades";
import ListaProgramas from "./ListaProgramas";
import ListaProcesoTut from "./ListaProcesoTut";
import ListaTutores from "../ListaTutores";
import ListaAlumnos from "./ListaAlumnosPorPrograma";
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import Looks3RoundedIcon from '@material-ui/icons/Looks3Rounded';
import Looks4RoundedIcon from '@material-ui/icons/Looks4Rounded';
import Looks5RoundedIcon from '@material-ui/icons/Looks5Rounded';
import * as Controller from "../../../Conexion/Controller";
import Alertas from "../Alertas";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TablaAlumnos from "../TablaAlumnos";
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
const idCoordinador="105"
class FrmAsignacionTutor extends Component {
  constructor() {
    super();
    this.state = {
      asignacion: {
        facultad:'',
        programa:'3',
        tutor:'',
        tutoria:'',
        alumnos:[]
      },
      alert: {
        mensajeStrong: "",
        mensajeStrongError: "¡Todos los datos deben completarse!",
        mensajeStrongExito: "¡Satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Asignación registrada",
        mensaje: "",
      },
      severidad: "warning",
      coordinador:"199",
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
      tutoria,
      tutor,
      alumnos
    } = this.state.asignacion;
    const nuevaAsignacion = {
      asignacionTutoria: {
        PROCESO_TUTORIA: tutoria,
        TUTOR: tutor,
        ALUMNOS: alumnos,
        FECHA_ASIGNACION: new Date(),
      },
    };
    if (tutoria==='' || tutor===''){
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = alert.mensajeStrongError;
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });

      this.state.alert.mensaje = this.state.alert.mensajeError;

    }else{
      const props = { servicio: "/api/asignacion", request: nuevaAsignacion };
      console.log("saving new asignacion in DB:", nuevaAsignacion);
      let asignado = await Controller.POST(props);
      console.log("asignado",asignado);
      if (asignado) {
        let alert = Object.assign({}, this.state.alert);
        alert.mensaje = alert.mensajeExito;
        alert.mensajeStrong = alert.mensajeStrongExito;
        this.setState({ alert: alert });
        this.setState({ severidad: "success" });
        this.state.alert.mensaje = this.state.alert.mensajeExito;

        //alert("Alumno asignado Satisfactoriamente");
      }
      console.log("got updated alumno from back:", asignado);
      

      this.handleCloseDialog();

    }
    
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
    console.log("prog",this.state.asignacion.programa);
    console.log("facu",this.state.asignacion.facultad);
    console.log("tutoria",this.state.asignacion.tutoria);
    console.log("tutor",this.state.asignacion.tutuor);



  };
  handleOnChangeFacultad(facultad) {
    console.log("facultad:", facultad);
    this.state.asignacion.facultad = facultad[0];
    let asig=this.state.asignacion;
    this.setState({asignacion:asig});
    console.log("facultad:", this.state.asignacion.facultad);
  }
  handleOnChangePrograma(programa) {
    console.log("programa:", programa);
    this.state.asignacion.programa = programa[0];
    let asig=this.state.asignacion;
    this.setState({asignacion:asig});
    console.log("proograma:", this.state.asignacion.programa);
  }
  handleOnChangeTutoria(tutoria) {
    console.log("tutoria:", tutoria);
    this.state.asignacion.tutoria = tutoria[0];
    let asig=this.state.asignacion;
    this.setState({asignacion:asig});
    console.log("tutoria:", this.state.asignacion.tutoria);
  }
  handleOnChangeTutor(tutor) {
    console.log("tutor:", tutor);
    this.state.asignacion.tutor = tutor[0];
    let asig=this.state.asignacion;
    this.setState({asignacion:asig});
    console.log("tutor:", this.state.asignacion.tutor);
  }
  render (){
    //let idPrograma=this.state.asignacion.programa[0];

    return(
      <div>
      <Paper elevation={2} style={style.paper}>
      <Alertas
          severity={this.state.severidad}
          titulo={"Observación:"}
          alerta={this.state.alert}
        />
      <Paper elevation={0} style={style.paper}>
      <Grid container spacing={10}>
        <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Paper elevation={0} marginLeft="2%" marginRight="2%" marginTop="5%" 
              align="center">
            
            <Typography variant="h5" align="center">
                <LooksOneRoundedIcon
                  fontSize="large"
                  color="primary" />
                {" "}Seleccionar Facultad
            </Typography>
            </Paper> 
          </Grid>
          <Grid item md={3}>
            <ListaFacultades
              titulo={"Facultades"}
              escogerFacultad={this.handleOnChange}
              enlace={"/api/facultad"}
            />
          </Grid>

          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Paper elevation={0} marginLeft="2%" marginRight="2%" marginTop="5%" 
              align="center">
            
            <Typography variant="h5" align="center">
                <LooksOneRoundedIcon
                  fontSize="large"
                  color="primary" />
                {" "}Seleccionar Programa
            </Typography>
            </Paper> 
          </Grid>          
          <Grid item md={3}>
            <ListaProgramas
              titulo={"Programas"}
              escogerPrograma={this.handleOnChangePrograma}
              enlace={"/api/programa/coordinador/"+this.state.coordinador}
            />
          </Grid>

          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
            <Paper elevation={0} marginLeft="2%" marginRight="2%" marginTop="5%" 
              align="center">
            <Typography variant="h5" align="center">
                <LooksTwoRoundedIcon
                  fontSize="large"
                  color="primary" />
                {" "}Seleccionar Proceso de Tutoría
            </Typography>
            </Paper> 
          </Grid>
          <Grid item md={3}>
            <ListaProcesoTut
              titulo={"Proceso de Tutoría"}
              escogerTutoria={this.handleOnChange}
              enlace={"/api/tutoria/lista/"+this.state.asignacion.programa}
            />
            </Grid>
            <Grid item md={5}
              container
              direction="column"
              alignItems="flex-start"
              justify="center" >
                <Paper elevation={0} marginLeft="2%" marginRight="2%" marginTop="5%" 
              align="center">
            <Typography variant="h5" align="center">
                <Looks3RoundedIcon
                  fontSize="large"
                  color="primary" />
                {" "}Seleccionar Tutor
            </Typography>
            </Paper>
            </Grid>
            <Grid item md={3}>
              <ListaTutores
                titulo={"Tutor"}
                escogerTutor={this.handleOnChange}
                enlace={"/api/tutor/lista/"+this.state.asignacion.programa}
              />
            </Grid>
          <Grid item md={5}
            container
            direction="column"
            alignItems="flex-start"
            justify="center" >
              <Paper elevation={0} marginLeft="2%" marginRight="2%" marginTop="5%" 
              align="center">
            <Typography variant="h5" align="center">
                <Looks4RoundedIcon
                  fontSize="large"
                  color="primary" />
                {" "}Seleccionar Alumno(s)
            </Typography>
            </Paper>
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
                    enlace={"/api/alumno/lista/"+this.state.asignacion.programa}
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
              <Paper elevation={0} marginLeft="2%" marginRight="2%" marginTop="5%" 
              align="center">
            <Typography variant="h5" align="center">
                <Looks5RoundedIcon
                  fontSize="large"
                  color="primary" />
                {" "}Asignación Completa
            </Typography>
            </Paper>
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
