import React, { Component } from "react";
import {
  Grid,
  makeStyles,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import * as Controller from "./../../Conexion/Controller";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import { getUser } from "../../Sesion/Sesion";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

class FrmCitarAlumno extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      mensajillo: "",
      motivoCita: "",
      dataMotivo: "",
      mensajeError: "",
      esValido: true,
    };

    this.handleOnclickCitarAlumno = this.handleOnclickCitarAlumno.bind(this);
    this.handleOnCloseCitaEnviada = this.handleOnCloseCitaEnviada.bind(this);
  }

  async handleOnclickCitarAlumno() {
    let yo = getUser();
    const nuevaSolicitud = {
      cita: {
        RAZON: this.state.motivoCita,
        EMISOR: yo.usuario.ID_USUARIO,
        RECEPTOR: parseInt(this.props.idAlumno, 10),
        //RECEPTOR: 511,
      },
    };
    //console.log(">>> Soli: ", nuevaSolicitud);
    const props = { servicio: "/api/citarAlumno", request: nuevaSolicitud };

    let citaTyS = await Controller.POST(props);
    if (!citaTyS) return;

    //console.log("RESULTADO API citacion ", citaTyS);
    if (!citaTyS.message) {
      if (!citaTyS.error) {
        this.setState({ mensajillo: "¡ Notificación Enviada Satisfactoriamente !" });
      } else {
        this.setState({
          mensajillo:
            "¡ Ups, Error inesperado... Por favor, inténtelo más tarde !",
        });
      }
    } else {
      this.setState({ mensajillo: citaTyS.message });
    }

    //await this.setState({ dataMotivo: "" });
    this.setState({ open: true });
  }

  handleOnCloseCitaEnviada() {
    //Darle ok o Aceptar al dialogo de "Se envio la cita staisfactoriamente "

    this.setState({ dataMotivo: "", open: false });
    //this.setState({dataMotivo:"..."});
    //window.location.replace(this.props.location.pathname);
  }

  handleOnChangeCT = (e) => {
    //console.log("XXX value",e.target.value);
    //console.log("XXX lenth",e.target.value.length);
    //console.log("XXX name",e.target.name);

    //aca valido
    if (e.target.value.length === 0) {
      this.setState({
        mensajeError: "¡ Debe ingresar un mensaje !",
        esValido: true,
      }); //que seria un "es invalido"
    } else {
      this.setState({ mensajeError: "", esValido: false });
    }

    this.setState({ [e.target.name]: e.target.value });
    this.setState({ motivoCita: e.target.value });
  };

  validarEntradaCT(error) {
    /*
        //console.log("errores:", error);
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
        //console.log("nuevo: ", nuevo);
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

  renderMensaje(dato) {
    return (
      <>
        <TextField
          required={true}
          autoFocus={true}
          fullWidth
          name={"dataMotivo"}
          label={"Mensaje de citación"}
          onChange={this.handleOnChangeCT}
          variant={"outlined"}
          rows={10}
          multiline={true}
          value={dato}
        />
        <FormHelperText error>{this.state.mensajeError}</FormHelperText>
      </>
    );
  }

  render() {
    return (
      <div style={estilos.paper} elevation={0}>
        <h3>Ingrese mensaje de citación para este alumno:</h3>

        {this.renderMensaje(this.state.dataMotivo)}

        <Grid
          item
          xs={12}
          container
          justify="flex-end"
          alignItems="center"
          // spacing={10}
        >
          <Grid item xs={2}>
            <br></br>
            <Button
              size="large"
              variant="contained"
              color="primary"
              disabled={this.state.esValido}
              onClick={this.handleOnclickCitarAlumno}
            >
              ENVIAR
            </Button>
          </Grid>
        </Grid>

        <Dialog
          open={this.state.open}
          onClose={this.handleOnCloseCitaEnviada}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            <Grid container md={12} justify="center">
            {this.state.mensajillo.includes("Satisfactoriamente") ?
                <CheckCircleRoundedIcon
                  color="primary"
                  style={{ fontSize: 70 }}
                />
                :
                //caso ups error inesperado
                <CancelRoundedIcon color="error" style={{ fontSize: 70 }} />
              }
            </Grid>
          </DialogTitle>

          <DialogContent> {this.state.mensajillo} </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleOnCloseCitaEnviada}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default FrmCitarAlumno;
const estilos = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    display: "flex",
    flexDirection: "column",
    //alignText: "center" //se centra al centro
  },
};
