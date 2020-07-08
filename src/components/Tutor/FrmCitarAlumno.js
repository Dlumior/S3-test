import React, { Component } from "react";
import { Grid, makeStyles, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import * as Controller from "./../../Conexion/Controller";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import { getUser } from "../../Sesion/Sesion";

class FrmCitarAlumno extends Component {
    constructor() {
        super();
        this.state={
            open:false,
            mensajillo:"",
            motivoCita:"",
            dataMotivo:"...",
        };

        this.handleOnclickCitarAlumno = this.handleOnclickCitarAlumno.bind(this);
        this.handleOnCloseCitaEnviada = this.handleOnCloseCitaEnviada.bind(this);

        
    };

    async handleOnclickCitarAlumno() {
        let yo = getUser();
        const nuevaSolicitud = {
            cita: {
                RAZON: this.state.motivoCita,
                EMISOR: yo.usuario.ID_USUARIO,
                RECEPTOR: parseInt(this.props.idAlumno,10), 
                //RECEPTOR: 265, 
            },
        }; 
        console.log(">>> Soli: ",nuevaSolicitud);
        const props = { servicio: "/api/citarAlumno", request: nuevaSolicitud };

        let citaTyS = await Controller.POST(props);
        console.log("RESULTADO API citacion ", citaTyS);
        if (!citaTyS.message) {
            if (!citaTyS.error) {
                this.setState({ mensajillo: "Cita Enviada Satisfactoriamente !" });
            } else {
                this.setState({ mensajillo: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
            }
        }
        else {
            this.setState({ mensajillo: citaTyS.message });
        }
        this.setState({ open: true });
    }

    
    handleOnCloseCitaEnviada() {
        //Darle ok o Aceptar al dialogo de "Se envio la cita staisfactoriamente "
    
        this.setState({ open: false });
        this.setState({dataMotivo:"..."});
        //window.location.replace(this.props.location.pathname);
    }

    handleOnChangeCT = (e) => {
        //console.log("XXXXXXXXX RAZON ",e.value);
        this.setState({ [e.name]: e.value });
        this.setState({ motivoCita: e.value });
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
        return (
            <div>
                <br></br>
                <Grid >
                    <CampoDeTexto
                        autoFocus={true}
                        name="Motivo"
                        label="Ingrese mensaje de citación para este alumno"
                        validacion={{ lim: 300 }}
                        variant={"outlined"}
                        rows={10}
                        multiline={true}
                        requerido={true}
                        inicial={this.state.dataMotivo}
                        onChange={this.handleOnChangeCT}
                        validarEntrada={this.validarEntradaCT}
                        //value={this.state.dataMotivo}  // <<< me parece no tiene este campo
                    />
                    <Grid
                        item
                        xs={12}
                        container
                        justify="flex-end"
                        alignItems="center"
                    // spacing={10}
                    >
                        <Grid item xs={2}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={this.handleOnclickCitarAlumno}  >
                                CITAR
                         </Button>
                        </Grid>
                    </Grid>

                </Grid>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnCloseCitaEnviada}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >    <h3 >Resultado </h3> </DialogTitle>
                    <DialogContent>  {this.state.mensajillo}   </DialogContent>
                    <DialogActions >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnCloseCitaEnviada}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}
export default FrmCitarAlumno;
