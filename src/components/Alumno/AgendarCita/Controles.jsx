import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { IconButton, Grid, Paper, InputLabel } from "@material-ui/core";
import ListaComboBox from "../../Coordinador/Tutorias/ListaComboBox";
import ListaEtiquetas from "../../Coordinador/Tutorias/ListaEtiquetas";
import { getUser } from "../../../Sesion/Sesion";
import GrupoRadioButton from "../../Coordinador/Tutorias/GrupoRadioButton";
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
//const FIJAS = 0;
//const PROGRAMA = 1;
class Controles extends Component {
  constructor() {
    super();
    this.state = {
      tutoriaFija: false,
      atras: -1,
      adelante: 1,
      colorActivo: "primary",
      colorInactivo: "secondary",
      colorLista: "secondary",
      colorBatallador: "primary",
      modoBatallador: true,
      etiqueta: [],
      vistaColumna: "Columna",
      vistaLista: "Lista",
      radios: {
        tipoTutoria: [
          { titulo: "Tutorias del Programa", valor: "Tutorias del Programa" },
          {
            titulo: "Tutorias Fijas Asignadas",
            valor: "Tutorias Fijas Asignadas",
          },
        ],
      },
      servicioTutoriaActual: undefined,
    };
    this.saltoEnElTiempoLocal = this.saltoEnElTiempoLocal.bind(this);
    this.ModoBatallador = this.ModoBatallador.bind(this);
    this.ModoLista = this.ModoLista.bind(this);
    this.handleOnChangeTutores = this.handleOnChangeTutores.bind(this);
    this.handleOnChangeTutoria = this.handleOnChangeTutoria.bind(this);
    this.renderTutoria = this.renderTutoria.bind(this);
    this.obtenerSeleccion = this.obtenerSeleccion.bind(this);
    this.getServicioTutoriaActual = this.getServicioTutoriaActual.bind(this);
  }
  getServicioTutoriaActual(index) {
    switch (index) {
      case 0:
        return `/api/tutoriavariable/${this.props.programa}`;
      case 1:
        return `/api/tutoriaasignada/${this.props.programa}/${getUser().usuario.ID_USUARIO}`;
      default:
        return null;
    }
  }
  obtenerSeleccion = async (seleccion) => {
    //console.log("seleccion", seleccion);
    await this.setState({
      servicioTutoriaActual:
        seleccion.value === "Tutorias del Programa"
          ? this.getServicioTutoriaActual(0)
          : this.getServicioTutoriaActual(1),
    });

    //console.log("obtenerSeleccion => ", this.state.servicioTutoriaActual);
  };

  async componentDidMount() {
    const myid = getUser().usuario.ID_USUARIO;
    //console.log("USSSSSEEERRRR: ", myid);
  }
  saltoEnElTiempoLocal = (saltoEnElTiempo) => {
    ////console.log( "1 semana al pasado");
    this.props.saltoEnElTiempo(saltoEnElTiempo);
  };
  /**
   * Capturar el array de tutores
   * @param {[Array]} etiqueta
   */
  handleOnChangeTutores = (etiqueta) => {
    //primero que llegue
    //luego que se guarde en un state
    ////console.log("LLegue: ", etiqueta);
    const listaEtiquetas = [];
    etiqueta.forEach((element) => {
      if (element.agregar) {
        listaEtiquetas.push(element.id);
      }
    });
    this.setState({ etiqueta: listaEtiquetas });
    //this.setState({tutoria:tutoria});
    //console.log("Seteado: ", this.state.etiqueta);
    this.props.handleFiltroTutores(listaEtiquetas);
  };
  /**
   *
   * @param {Array} proceso
   */
  handleOnChangeTutoria = (tutoria) => {
    /*console.log(
      "proceso seleccionado this.state.servicioTutoriaActual.includes(tutoriaasignada): ",
      this.state.servicioTutoriaActual.includes("tutoriaasignada")
    );*/
    //aqui se o mando al componente padre

    console.log("$$escogerITEM => ", tutoria);
    console.log("$$Filtro Proceso",this.props.filtroProceso);
    if (this.props.filtroProceso) {
      console.log("$$Sev Tuto Actual",this.state.servicioTutoriaActual);

      if (this.state.servicioTutoriaActual.includes("tutoriaasignada")) {
        console.log("$$tuto.duracion",tutoria);

        this.setState({ tutoriaFija: true });
        this.props.handleDuracion(tutoria ? tutoria.DURACION : 0); //<< caso tuto fijo le damos el campo duracion

        this.props.handleFiltroProceso(tutoria);

      } else {
        this.setState({ tutoriaFija: false });
        this.setState({ modoBatallador: true });
        console.log("$$tuto.duracio en else",tutoria);

        this.props.handleDuracion(tutoria[1]); //<<< para darle la duracion en el arreglo
        this.props.handleFiltroProceso(tutoria[0]);

      }
    }
  };
  ModoBatallador() {
    this.props.modoBatallador(true);
    this.setState({ colorBatallador: this.state.colorActivo });
    this.setState({ colorLista: this.state.colorInactivo });
    this.setState({ vistaColumna: "Columna" });
    this.setState({ vistaLista: "Lista" });
  }
  ModoLista() {
    this.props.modoBatallador(false);
    this.setState({ colorBatallador: this.state.colorInactivo });
    this.setState({ colorLista: this.state.colorActivo });
    this.setState({ vistaColumna: "Columna" });
    this.setState({ vistaLista: "Lista" });
  }
  renderTutoria(enlace) {
    //console.log("Cambiar Enlace", enlace);
    return (
      <ListaComboBox
        allObject={
          enlace.includes("tutoriaasignada")
            ? true
            : false
        }
        mensaje="tutoria"
        titulo={"Tutorias encontradas"}
        enlace={enlace}
        id={"ID_PROCESO_TUTORIA"}
        nombre={"NOMBRE"}
        keyServicio={"tutoria"}
        escogerItem={this.handleOnChangeTutoria}
        small={true}
        inicial={true}
        placeholder={"Escoja la tutoría"}
      />
    );
  }
 
  render() {
    //console.log("PROPS controls.js", this.props);
    
    return (
      <Paper style={styles.paper}>
        <Grid container spacing={0} alignContent="center">
          {/**controles semana y mes */}
          <Grid item md={1} xs={1}>
            {/** mes control */}
            <Grid container spacing={0} alignContent="center">
              <Grid item md={3} xs={3}>
                <IconButton
                  sizeSmall
                  color="primary"
                  aria-label="delete"
                  onClick={() => this.saltoEnElTiempoLocal(-28)}
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
                  onClick={() => this.saltoEnElTiempoLocal(28)}
                >
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/** semana control*/}
            {this.props.tipo !== "disponibilidad" ? (
              <></>
            ) : (
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
                    {"Semana" /*+ this.props.fecha.semana*/ || "Semana Actual"}
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
            )}
          </Grid>

          {/** filtro de programa
           * creo q ya no va XD
           */}

          {this.props.tipo !== "disponibilidad" ? (
            <Grid item md={2} xs={2}></Grid>
          ) : (
            <Grid item md={2} xs={2}>
              <Grid item md={12} xs={12}>
                <GrupoRadioButton
                  stretch={true}
                  disabled={false}
                  titulo="Escoga un Tipo de tutoria"
                  radios={this.state.radios.tipoTutoria}
                  obtenerSeleccion={this.obtenerSeleccion}
                />
              </Grid>
            </Grid>
          )}
          {this.props.tipo !== "disponibilidad" ? (
            <Grid item md={2} xs={2}></Grid>
          ) : (
            <Grid item md={2} xs={2}>
              {this.renderTutoria(this.state.servicioTutoriaActual?this.state.servicioTutoriaActual:this.getServicioTutoriaActual(0))}
            </Grid>
          )}

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
                  {this.state.vistaColumna}
                  <IconButton onClick={() => this.ModoBatallador()}>
                    <ViewColumnIcon
                      color={this.props.colorActivo ? "Primary" : "Secondary"}
                    />
                  </IconButton>

                  <IconButton
                    disabled={this.state.tutoriaFija}
                    onClick={() => this.ModoLista()}
                  >
                    <ViewListIcon
                      color={!this.props.colorActivo ? "Primary" : "Secondary"}
                    />
                  </IconButton>
                  {this.state.vistaLista}
                </Grid>
              </Grid>
            )}
          </Grid>

          {/** tutor filtro */}
          <Grid
            item
            md={this.props.tipo !== "disponibilidad" ? 3 : 4}
            xs={this.props.tipo !== "disponibilidad" ? 3 : 4}
          >

            {this.state.modoBatallador
            ?<></>
            
            :
            this.props.tipo !== "disponibilidad" ? (
              <></>
            ) : this.props.filtroTutores ? (
              !this.state.tutoriaFija ? (
                <ListaEtiquetas
                  obtenerEtiquetas={this.handleOnChangeTutores}
                  enlace={
                    "/api/tutor/lista/" +
                    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA
                  }
                  small={true}
                  label={"Tutores"}
                  ID={"ID_TUTOR"}
                  keyServicio={"tutores"}
                  keySubNivel={["USUARIO"]}
                  valueSubNivel={["NOMBRE", "APELLIDOS"]}
                  strecht={true}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}

            {/*Faltaria q cuando se le de click a listaEtiquetas, este paper se ponga disable */}
            {this.props.tipo !== "disponibilidad" ? (
              <></>
            ) : (
              <Paper style={styles.paperTitulo} elevation={0}>
                <InputLabel>
                  <strong>
                    {this.state.tutoriaFija
                      ? `Tutor Asignado:`
                      : " Último Tutor Seleccionado:"}
                  </strong>{" "}
                </InputLabel>
                <h3>{this.props.tutorNombre}</h3>
              </Paper>
            )}
          </Grid>
          {this.props.tipo !== "disponibilidad" ? (
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
                    {/* {"Semana" + this.props.fecha.semana || "Semana Actual"} */}
                    {"Semana"  || "Semana Actual"}

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
          ) : (
            <></>
          )}
        </Grid>
      </Paper>
    );
  }
}

export default Controles;
