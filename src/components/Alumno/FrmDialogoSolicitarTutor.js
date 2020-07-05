import React, { Component } from "react";
import ImagenCircular from "../Shared/ImagenCircular";
import {
  Grid,
  Chip,
  Paper,
  Button,
  Dialog,
  TextField,
} from "@material-ui/core";
import { diasSemana, mesesAnio } from "./AgendarCita/Util";
import ListaComboBox from "../Coordinador/Tutorias/ListaComboBox";
import CampoDeTexto from "./../Coordinador/Tutorias/CampoDeTexto.jsx";
//../Coordinador/Tutorias/CampoDeTexto.js";
import { getUser } from "../../Sesion/Sesion";
import { POST } from "../../Conexion/Controller";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import moment from 'moment';

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
      duracionProceso: 90, //ex 90 minutos
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
      horaIniR: "",
      horaFinR: "",
    };

    //handles...
    this.handleOnChangeMotivo = this.handleOnChangeMotivo.bind(this);
    this.handleOnClickSolicitarCita = this.handleOnClickSolicitarCita.bind(
      this
    );
    this.handleOnChangeCT = this.handleOnChangeCT.bind(this);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnChangeHoraIni = this.handleOnChangeHoraIni.bind(this);
    this.handleOnChangeHoraFin = this.handleOnChangeHoraFin.bind(this);




    this.handleFocusOutHoraIni = this.handleFocusOutHoraIni.bind(this);

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
    this.setState({ _motivoSelecc: _motivoSeleccionado.NOMBRE });
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
        ID_PROCESO_TUTORIA: this.props.idPro, //ANTES 41
        LUGAR: this.props.dispo.LUGAR,
        MOTIVO: this.state._motivoSelecc,
        DESCRIPCION: this.state.descripcion,
        FECHA: this.props.dispo.FECHA,
        // HORA_INICIO: this.props.dispo.HORA_INICIO,
        // HORA_FIN: this.props.dispo.HORA_FIN,
        HORA_INICIO: this.state.horaIniR,
        HORA_FIN: this.state.horaFinR,
        ALUMNOS: [yo.usuario.ID_USUARIO],
      },
    };

    console.log("BTN_SOLICITAR WWW", nuevaSolicitud);
    //se llama al back

    const props = { servicio: "/api/registrarCita", request: nuevaSolicitud };
    let sesionTyS = await POST(props);
    console.log("SESIONtYS XXX ", sesionTyS);

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

  handleFocusOutHoraIni() {
    if (this.state.horaIniR.slice(-2) !== "30" || this.state.horaIniR.slice(-2) !== "00") {
      let _yeri ="";
      _yeri= this.state.horaIniR.slice(0, 2) + ":00";
      console.log("FOCUS=>", _yeri);
      this.setState({ horaIniR: _yeri });

      //actualizamos la hora de la salida
      let _strHora = "2020-07-04 ";
      _strHora += _yeri;
      let _datetime = new Date(_strHora);
      _datetime.setMinutes(_datetime.getMinutes() + this.props.duracionPro);
      let n = _datetime.toLocaleTimeString();
      console.log("antesIF=> ",n);
      if (n.length === 7) { n = "0" + n; }
      n = n.slice(0, 5);
      console.log("antes n=> ",n);
      this.setState({ horaFinR: n });

    }
  }

  handleOnChangeHoraIni(e) {
    this.setState({ horaIniR: e.target.value });
    let _strHora = "2020-07-04 ";
    _strHora += e.target.value;
    let _datetime = new Date(_strHora);
    _datetime.setMinutes(_datetime.getMinutes() + this.props.duracionPro);
    let n = _datetime.toLocaleTimeString();
    if (n.length === 7) { n = "0" + n; }
    n = n.slice(0, 5);
    //console.log("SLICE=> ",n);
    this.setState({ horaFinR: n });
    //en los states hay un "delay" de un caracter 07:30 -> se graba 07:03 ... idkwhy

    document.getElementById("Hora").addEventListener("focusout", this.handleFocusOutHoraIni);

  }

  handleOnChangeHoraFin(e) {
    this.setState({ horaFinR: e.target.value });
    //e.target.value = this.sstate.horaFinR;

  }
  render() {
    const _disponibilidad = this.props.dispo;
    console.log("XXX ", _disponibilidad);

    const _fexilla = new Date(this.props.fexaForm);

    return (
      <div>
        <Grid container spacing={2}>
          {/**TITULO TYS C LA COME A YERI */}

          <Paper elevation={3} style={styles.paper}>
            <Grid
              container
              spacing={2}
              alignContent="center"
              style={styles.chip}
            >
              <Grid item md={3} xs={3}>
                <ImagenCircular
                  square={true}
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/deadline-calendar-date-schedule-timeline-33430.png"
                />
                <h3>
                  {diasSemana[_fexilla.getDay()] +
                    ", " +
                    _fexilla.getDate() +
                    " de " +
                    mesesAnio[_fexilla.getMonth() + 1] +
                    " del 2020"}
                </h3>
              </Grid>
              <Grid item md={9} xs={9}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item md={12} xs={12}>
                    <h1>
                      {"Tutor: " +
                        _disponibilidad.TUTOR.USUARIO?.NOMBRE +
                        " " +
                        _disponibilidad.TUTOR.USUARIO?.APELLIDOS}
                    </h1>
                  </Grid>

                  <Grid container spacing={2} alignContent="center">
                    <Grid item md={12} xs={12} alignContent="center">
                      <h3>{"Disponibilidad: "} </h3>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Grid container spacing={2} alignContent="center">
                        <Grid item md={6} xs={6}>
                          <h3>
                            Desde :{" "}
                            <Chip
                              label={_disponibilidad?.HORA_INICIO}
                              color="primary"
                              size="medium"
                            />{" "}
                          </h3>
                        </Grid>
                        <Grid item md={6} xs={6}>
                          <h3>
                            Hasta :{" "}
                            <Chip
                              label={_disponibilidad?.HORA_FIN}
                              color="primary"
                              size="medium"
                            />
                          </h3>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/** ESCOJER HORA */}

          <Paper elevation={3} style={styles.paper}>
            <Grid
              container
              spacing={2}
              alignContent="center"
              style={styles.chip}
            >
              <Grid item md={6} xs={6}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item md={12} xs={12}>
                    <h3>{`Esta sesión de tutoria dura : ${this.props.duracionPro} minutos`}</h3>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <CampoDeTexto
                      autoFocus={true}
                      name="descripcion"
                      label="Ingrese Descripción del motivo de la solicitud:"
                      validacion={{ lim: 100 }}
                      variant={"outlined"}
                      rows={4}
                      multiline={true}
                      requerido={true}
                      inicial="..."
                      onChange={this.handleOnChangeCT}
                      validarEntrada={this.validarEntradaCT}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6}>
                        <TextField
                          defaultValue={_disponibilidad?.HORA_INICIO}
                          value={this.state.horaIniR}
                          variant="outlined"
                          required
                          margin="dense"
                          type="time"
                          id="Hora"
                          label="Ingrese la hora Inicio"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => this.handleOnChangeHoraIni(e)}
                          fullWidth
                          placeholder ="Los minutos deben acabar en 00 o 30"
                        />
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <TextField
                          value={this.state.horaFinR}
                          disabled={true}
                          variant="outlined"
                          required
                          margin="dense"
                          type="time"
                          id="Hora fin"
                          label="Hora Fin"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => this.handleOnChangeHoraFin(e)}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12} xs={12}>
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
                  <Grid item md={12} xs={12}>
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>

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
