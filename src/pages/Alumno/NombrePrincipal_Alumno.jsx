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
import Jloading from "../../components/Coordinador/FormRegistroAlumno/Jloading";

const estilos = {
  paper: {
    backgroundColor: "#ffffff",
  },
};
class NombrePrincipal_Alumno extends Component {
  constructor() {
    super();
    this.state = {
      filtroFacultad: "",
      usuario: null,
    };
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.handleOnChangeFacultad = this.handleOnChangeFacultad.bind(this);
    //this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
  }
  handleOnChangePrograma(programa) {
    //console.log("proograma:", programa);

    let tutoria = Object.assign({}, this.state.tutoria);
    tutoria.programa = programa[0];
    this.setState({ tutoria: tutoria });
    // //console.log("proograma:", this.state.tutoria.programa);
    // this.setState({ filtroFacultad: programa[0] });
  }
  handleOnChangeFacultad(facultad) {
    //console.log("HAAAAAAAAAA facu:", facultad);
    
    
    let enlace = `/api/programas/alumno/${this.state.usuario.ID_USUARIO}/${facultad[0]}`;
    //console.log("HAAAAAAAAAA enlace:", enlace);
    this.setState({ filtroFacultad: enlace });
  }
  handleOnChangePrograma(proceso) {
    //console.log("HAAAME: ", proceso);
    this.props.obtenerPrograma(proceso[0]);
    // //aqui se o mando al componente padre
    // if (this.props.filtroProceso) {
    //   this.props.handleFiltroProceso(proceso[0]);
    // }
  }
  async componentDidMount() {
    //console.log("*** usuario ", this.props.usuario);
    const { usuario } = this.props;
    if (!usuario) {
      return;
    }
    await this.setState({ usuario: usuario });
  }
  /**
   * Obtiene el subrol, util cuando se trarta de coordinador de programa o facultad
   * @param {string} fullRol
   */
  getSubRol(fullRol) {
    return fullRol.toLowerCase();
  }
  /**
   * De acuerto al tipo de coordinador obtiene el enlace apropiado
   * @param {*} usuario
   */
  getEnlace(usuario) {
    const subrol = this.getSubRol(getUser().rol);

    const ID = usuario.ID_USUARIO;
    let enlace = "/api/facultad/alumno/" + ID;

    return enlace;
  }
  render() {
    return (
      <Paper style={estilos.paper}>
        <Grid container spacing={0}>
          <Grid item md={6} xs={12}>
            <Typography component="h1" variant="h5" style={{marginLeft:"2%"}}>
              <h2>{this.props.titulo}</h2>
            </Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            {!this.state.usuario ? (
              <Jloading mensaje={"Cargando"} size={"xs"} />
            ) : (
              <>
              <br></br>
              <ListaComboBox
                mensaje="facultad"
                titulo={"Facultad"}
                enlace={this.getEnlace(this.state.usuario)}
                id={"ID_PROGRAMA"}
                nombre={"NOMBRE"}
                subnombre={"FACULTAD"}
                keyServicio={"facultades"}
                escogerItem={this.handleOnChangeFacultad}
                small={true}
                inicial={true}
                placeholder={"Escoja la facultad"}
              />
              </>
            )}
          </Grid>
          <Grid item md={3} xs={6}>
            {this.state.filtroFacultad ? (
              <>
              <br></br>
              <ListaComboBox
                mensaje="programa"
                titulo={"Programa"}
                enlace={this.state.filtroFacultad}
                id={"ID_PROGRAMA"}
                nombre={"NOMBRE"}
                keyServicio={"programas"}
                escogerItem={this.handleOnChangePrograma}
                small={true}
                inicial={true}
                placeholder={"Escoja el programa"}
              />
              </>
            ) : (
              <Jloading mensaje={"Cargando"} size={"xs"} />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default NombrePrincipal_Alumno;
