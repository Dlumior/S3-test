import React, { Component } from "react";
import ImagenCircular from "../Shared/ImagenCircular";
import {
  Grid,
  Chip,
  Paper,
  TextField,
  Button,
  Dialog,
} from "@material-ui/core";
import FerCarrillo from "./tutor2.png";
import ListaCombobMotivoSoli from "./ListaCombobMotivoSoli.js";
import { diasSemana, mesesAnio } from "./AgendarCita/Util";
import ListaComboBox from "../Coordinador/Tutorias/ListaComboBox";
import CampoDeTexto from "./../Coordinador/Tutorias/CampoDeTexto.jsx";
//../Coordinador/Tutorias/CampoDeTexto.js";
import { getUser } from "../../Sesion/Sesion";
import { POST } from "../../Conexion/Controller";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
};

const styles = {
  paper: {
    marginTop: "3%",
    marginLeft: "2%",
    marginRight: "2%",
  },
  chip: {
    textAlign: "center",
  },
};

class FrmDialogoSolicitarTutor extends Component {
  constructor() {
    super();
    this.state = {
      lstMotivos: {
        motivos: [
          { ID: 1, NOMBRE: "Académico" },
          { ID: 2, NOMBRE: "Académico Administrativo" },
          { ID: 3, NOMBRE: "Vocacional" },
          { ID: 4, NOMBRE: "Personal--Familiar" },
          { ID: 5, NOMBRE: "Personal--Individual" },
          { ID: 6, NOMBRE: "Personal--Económico" },
          { ID: 7, NOMBRE: "Personal--Psicológico" },
          { ID: 8, NOMBRE: "Otro" },
        ],
      },
      _motivoSelecc: "",
      descripcion: "",
      open: false,
      mensajillo: "",
    };

    //handles...
    this.handleOnChangeMotivo = this.handleOnChangeMotivo.bind(this);
    this.handleOnClickSolicitarCita = this.handleOnClickSolicitarCita.bind(   this  );
    this.handleOnChangeCT = this.handleOnChangeCT.bind(this);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  //menaje de satisfaccion

  handleOnClick() {
    this.setState({ open: true });
  }

  //menaje de satisfaccion
  handleOnClose() {
    this.setState({ open: false });
    this.props.onCloseFrm();
  }
  
  handleOnChangeMotivo(_motivoSeleccionado) {
    console.log("MotivoSeleccionado XXX:", _motivoSeleccionado);
    console.log("RESTA ",_motivoSeleccionado[0]-1);

    //this.setState({ _motivoSelecc: this.state.lstMotivos.motivos[_motivoSeleccionado[0]-1].NOMBRE });
  }

  handleOnChangeCT = (e) => {
    // nombre y descripcion
    console.log(e);
    this.setState({ [e.name]: e.value });
  };

  async handleOnClickSolicitarCita() {
    let yo = getUser();

    const nuevaSolicitud = {
      sesion: {
        ID_TUTOR: this.props.dispo.ID_TUTOR,
        ID_PROCESO_TUTORIA: 41,
        LUGAR: this.props.dispo.LUGAR,
        MOTIVO: this.state._motivoSelecc,
        DESCRIPCION: this.state.descripcion,
        FECHA: this.props.dispo.FECHA,
        HORA_INICIO: this.props.dispo.HORA_INICIO,
        HORA_FIN: this.props.dispo.HORA_FIN,
        ALUMNOS: [yo.usuario.ID_USUARIO],
      },
    };

    //console.log("BTN_SOLICITAR XXX",nuevaSolicitud);
    //se llama al back

    const props = { servicio: "/api/registrarCita", request: nuevaSolicitud };
    let sesionTyS = await POST(props);
    //console.log("SESIONtYS XXX ",sesionTyS);

    if (!sesionTyS.message) {
      if (!sesionTyS.error) {
        this.setState({ mensajillo: "Sesión Registrada Satisfactoriamente!" });
      } else {
        this.setState({
          mensajillo:
            "Ups, Error Inesperado.   Por favor, Inténtelo más tarde.",
        });
      }
    } else {
      this.setState({ mensajillo: sesionTyS.message });
    }
    this.setState({ open: true });
  }

  validarEntradaCT(error) {
    /*
        console.log("errores:", error);
        let encontrado = undefined;
        let nuevo = false;
        let eliminar = this.state.errores.forEach((element) => {
          if (element.llave === error.llave) {
            encontrado = element;
          }
        });
        if (encontrado) {
          if (error.error.length === 0) {
            //lo borro
            eliminar = true;
          }
        } else {
          if (error.error.length !== 0) {
            nuevo = true;
          }
        }
        console.log("nuevo: ", nuevo);
        if (nuevo) {
          let newErrores = this.state.errores;
          newErrores.push(error);
          this.setState({ errores: newErrores });
          return;
        }
        if (eliminar) {
          let newErrores = [];
          this.state.errores.forEach((element) => {
            if (element.llave !== error.llave) {
              newErrores.push(element);
            }
          });
          this.setState({ errores: newErrores });
        }
        */
  }

  render() {
    const _disponibilidad = this.props.dispo;
    console.log("XXX ", _disponibilidad);

    const _fexilla = new Date(this.props.fexaForm);

    return (
      <div>
        <Paper elevation={3} style={styles.paper}>
          <Grid container spacing={2} alignContent="center" style={styles.chip}>
            <Grid item md={4} xs={4}>
              <ImagenCircular
                square={true}
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/deadline-calendar-date-schedule-timeline-33430.png"
              />
              {/*<ImagenCircular src={FerCarrillo} />*/}
            </Grid>
            <Grid item md={8} xs={8}>
              <h1>
                {_disponibilidad.TUTOR.USUARIO?.NOMBRE +
                  " " +
                  _disponibilidad.TUTOR.USUARIO?.APELLIDOS}
              </h1>
              <p>Tutor</p>
              <p>
                {diasSemana[_fexilla.getDay()] +
                  ", " +
                  _fexilla.getDate() +
                  " de " +
                  mesesAnio[_fexilla.getMonth() + 1] +
                  " del 2020"}
              </p>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <Grid container spacing={2} alignContent="center" style={styles.chip}>
            <Grid item md={6} style={styles.chip}>
              <p>Disponibilidad Inicio : </p>
              <Chip
                label={_disponibilidad?.HORA_INICIO}
                color="primary"
                size="medium"
              />
            </Grid>
            <Grid item md={6} style={styles.chip}>
              <p>Disponibilidad Fin : </p>
              <Chip
                label={_disponibilidad?.HORA_FIN}
                color="primary"
                size="medium"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {/*<h1>Motivo: </h1>*/}

              {/*}
                            <ListaComboBox
                              titulo={"Motivo de Solicitud"}
                              datos={this.state.lstMotivos}
                              id={"ID"}
                              nombre={"NOMBRE"}
                              //enlace={"/api/programa"}
                              //id={"ID_PROGRAMA"}
                              //nombre={"NOMBRE"}
                              //keyServicio={"programa"}
                              escogerItem={this.handleOnChangeMotivo}
                            
                            >
                            </ListaComboBox>
                             />*/}
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <h2>Este proceso de tutoria dura : 90min</h2>
                </Grid>
                <Grid item md={6} xs={12}>
                  <ListaComboBox
                    //allObject={true}
                    mensaje="periodo"
                    escogerItem={this.handleOnChangeMotivo}
                    titulo={"Motivo de Solicitud"}
                    datos={this.state.lstMotivos}
                    id={"ID"}
                    nombre={"NOMBRE"}
                    keyServicio={"motivos"}
                    placeholder={"Escoja un motivo"}
                    allObject={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <Paper elevation={0} style={estilos.paper}>
                {/*
                                <TextField
                                    required={true}
                                    autoFocus={true}
                                    fullWidth
                                    name={"descripcion"}
                                    label={"Descripción"}
                                    //onChange={this.handleOnChange}
                                    //disabled={this.props.disabled || false}
                                    variant={"outlined"}
                                    rows={4}
                                    multiline={true}
                                //value={this.state.texto}
                                />*/}

                <CampoDeTexto
                  autoFocus={true}
                  name="descripcion"
                  label="Descripción"
                  validacion={{ lim: 100 }}
                  variant={"outlined"}
                  rows={4}
                  multiline={true}
                  requerido={true}
                  inicial="..."
                  onChange={this.handleOnChangeCT}
                  validarEntrada={this.validarEntradaCT}
                />
              </Paper>

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={this.handleOnClickSolicitarCita}
              >
                Solicitar Cita
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Dialog
          open={this.state.open}
          onClose={this.handleOnClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <h3>Resultado </h3>
          </DialogTitle>
          <DialogContent>{this.state.mensajillo}</DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleOnClose}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FrmDialogoSolicitarTutor;

const estilos = {
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "3%",
    flexDirection: "column",
  },
};
