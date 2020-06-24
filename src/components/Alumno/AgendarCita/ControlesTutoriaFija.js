import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { IconButton, Grid, Typography, Paper, FormControlLabel, InputLabel } from "@material-ui/core";
import ListaComboBox from "../../Coordinador/Tutorias/ListaComboBox";
import ListaEtiquetas from "../../Coordinador/Tutorias/ListaEtiquetas";
import { getUser } from "../../../Sesion/Sesion";



const styles = {
  control: {
    textAlign: "center",
  },
  paper: {
    borderTop: "2px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
  paperTitulo: {
    marginTop: "2%",
    marginLeft: "7%",
    marginRight: "7%",
  },
};

class ControlesTutoriaFija extends Component {
  constructor() {
    super();
    this.state = {
      atras: -1,
      adelante: 1,
      colorActivo: "primary",
      colorInactivo: "secondary",
      colorLista: "secondary",
      colorBatallador: "primary",
      modoBatallador: true,
      etiqueta: [],
      vistaColumna: "Columna",
      vistaLista: "",

      tutorSeleccionado:"Nombre del Tutor",

    };
    this.saltoEnElTiempoLocal = this.saltoEnElTiempoLocal.bind(this);
    this.ModoBatallador = this.ModoBatallador.bind(this);
    this.ModoLista = this.ModoLista.bind(this);
    this.handleOnChangeTutores = this.handleOnChangeTutores.bind(this);
    this.handleOnChangeProceso = this.handleOnChangeProceso.bind(this);
  }
  saltoEnElTiempoLocal = (saltoEnElTiempo) => {
    //console.log( "1 semana al pasado");
    this.props.saltoEnElTiempo(saltoEnElTiempo);
  };
  /**
   * Capturar el array de tutores
   * @param {[Array]} etiqueta
   */
  handleOnChangeTutores = (etiqueta) => {
    //primero que llegue
    //luego que se guarde en un state
    //console.log("LLegue: ", etiqueta);
    const listaEtiquetas = [];
    etiqueta.forEach((element) => {
      if (element.agregar) {
        listaEtiquetas.push(element.id);
      }
    });
    this.setState({ etiqueta: listaEtiquetas });
    //this.setState({tutoria:tutoria});
    console.log("Seteado: ", this.state.etiqueta);
    this.props.handleFiltroTutores(listaEtiquetas);
  };
  /**
   *
   * @param {Array} proceso
   */
  handleOnChangeProceso(proceso) {
    console.log("proceso seleccionado: ", proceso);
    //aqui se o mando al componente padre
    this.props.handleFiltroProceso(proceso[0]);
  }
  ModoBatallador() {
    this.props.modoBatallador(true);
    this.setState({ colorBatallador: this.state.colorActivo });
    this.setState({ colorLista: this.state.colorInactivo });
    this.setState({ vistaColumna: "Batallador" });
    this.setState({ vistaLista: "" });
  }
  ModoLista() {
    this.props.modoBatallador(false);
    this.setState({ colorBatallador: this.state.colorInactivo });
    this.setState({ colorLista: this.state.colorActivo });
    this.setState({ vistaColumna: "" });
    this.setState({ vistaLista: "Lista" });
  }
  render() {
    return (
      <Paper style={styles.paper}>
        <Grid container spacing={0} alignContent="center">
          {/** mes control */}
          <Grid item md={1} xs={1}>
            <Grid container spacing={0} alignContent="center">
              <Grid item md={3} xs={3}>
                <IconButton
                  sizeSmall
                  color="primary"
                  aria-label="delete"
                  onClick={() => this.saltoEnElTiempoLocal(-30)}
                >
                  <ArrowBackIosOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item md={6} xs={6}>
                <h3 style={styles.control}>
                  {this.props.fecha.mes || "Mes Actual"}
                </h3>
              </Grid>
              <Grid item md={3} xs={3}>
                <IconButton
                  sizeSmall
                  color="primary"
                  aria-label="delete"
                  onClick={() => this.saltoEnElTiempoLocal(30)}
                >
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/** filtro de programa */}
          <Grid item md={3} xs={3}>
            {this.props.tipo !== "disponibilidad" ? (
              <></>
            ) : this.props.filtroProceso ? (
              <ListaComboBox
                mensaje="proceso"
                titulo={"Procesos de tutorías Fijas"}
                //enlace={"/api/tutoria"}
                enlace={"/api/tutoriafija/" + getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA}
                id={"ID_PROCESO_TUTORIA"}
                nombre={"NOMBRE"}
                keyServicio={"tutoria"}
                escogerItem={this.handleOnChangeProceso}
                small={true}
                inicial={true}
                placeholder={"Escoja el proceso de tutoria"}
              />
            ) : (
                  <></>
                )}
          </Grid>

          {/** fecha actual */}
          <Grid item md={3} xs={3}>
            <h3 style={styles.control}>
              {"Hoy: " + new Date(this.props.fecha.fecha).toDateString()}{" "}
            </h3>

            {/**Modo Batallador switch */}
            {this.props.tipo !== "disponibilidad" ? (
              <></>
            ) : (
                <Grid container spacing={0} style={styles.control}>
                  <Grid item md={12} xs={12} alignContent="center">
                    {this.state.vistaLista}
                    <IconButton onClick={() => this.ModoLista()}>
                      <ViewListIcon color={this.state.colorLista} />
                    </IconButton>

                    <IconButton onClick={() => this.ModoBatallador()}>
                      <ViewColumnIcon color={this.state.colorBatallador} />
                    </IconButton>
                    {this.state.vistaColumna}

                  </Grid>
                </Grid>
              )}
           </Grid>

          {/** tutor filtro --> ahora solo LABEL*/}
            <Grid item md={4} xs={4}>           
              <Paper style={styles.paperTitulo} elevation={0}    >
                 <InputLabel><strong>Tutor Seleccionado:</strong> </InputLabel>
                    <h3>{this.props.tutorNombre}</h3>
              </Paper>         

          </Grid>  

          {/** semana control*/}
          <Grid item md={1} xs={1}>
            <Grid container spacing={0} alignContent="center">
              <Grid item md={3} xs={3}>
                <IconButton
                  color="primary"
                  aria-label="delete"
                  onClick={() => this.saltoEnElTiempoLocal(-7)}
                >
                  <ArrowBackIosOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item md={6} xs={6}>
                <h3 style={styles.control}>
                  {"Semana" + this.props.fecha.semana || "Semana Actual"}
                </h3>
              </Grid>
              <Grid item md={3} xs={3}>
                <IconButton
                  color="primary"
                  aria-label="delete"
                  onClick={() => this.saltoEnElTiempoLocal(7)}
                >
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default ControlesTutoriaFija;
