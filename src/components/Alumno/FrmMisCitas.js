import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import { Paper, Tabs, Tab, Button, Grid, Dialog, DialogTitle, Typography } from "@material-ui/core";
import TablaTutoresMisCitas from "./TablaTutoresMisCitas.js";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { getUser } from "../../Sesion/Sesion";
import TabProceso from "../Coordinador/Tutorias/TabProceso.js";
import FrmMisCitasPasadas from "./AgendarCita/CitasPasadas/FrmMisCitasPasadas";
import moment from 'moment';


import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';



const style = {
    paper: {
        marginTop: "3%",
        marginLeft: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundImage: "",
    }
};

class FrmMisCitas extends Component {
    constructor() {
        super();
        this.state = {
            sesiones: {
                columns: [{
                    title: "Nombre",
                    field: "nombre",
                }],
                data: [{ nombre: "" }]
            }, //aqui va el nombre de la tablilla
            open: false,
            //open2: false,
            openFechaInvalida: false,
            fechaPasada: false,
            open3: false,
            mensajillo: "",
            graciasYopsIdSesion: 0,
            graciasYopsIdTutor: [],
            yopsRazon: "",
            diasAnticipacion: 0,
            actuTys: false,

        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnCloseAdvertencia = this.handleOnCloseAdvertencia.bind(this);//fecha no esta dentro de la politica

        this.handleOnCloseCitaCancelada = this.handleOnCloseCitaCancelada.bind(this);
        this.handleOnclickAceptarCancelacion = this.handleOnclickAceptarCancelacion.bind(this);
        //this.handleOnClickPosponer = this.handleOnClickPosponer.bind(this);
        //this.handleOnClosePosponer = this.handleOnClosePosponer.bind(this);
    };

    //obtenemos diasAnticipacion


    //de btn cancelar
    async handleOnClick(e, _idSesion, _idTutor, _fecha, _idProg) {
        console.log("TARGET DEL E idSesion/idTutor", _idSesion, _idTutor);
        console.log("fechaSesion", _fecha);

        //obtenemos diasAnticipacion
        let facu = await Controller.GET({ servicio: "/api/facultad/" + _idProg });
        if (facu) {
            let pol = await Controller.GET({ servicio: "/api/facultad/politicas/" + facu.facultad.ID_FACULTAD });
            console.log("POLITICA", pol);

            if (pol) {
                let dias = pol.politicas.ANTICIPACION_CANCELAR_CITA;
                this.state.diasAnticipacion = dias;
                console.log("dia", this.state.diasAnticipacion);
                this.setState({ diasAnticipacion: dias });
            }
        }

        console.log("DIAS", this.state.diasAnticipacion);

        console.log("fecha::", moment(_fecha).format("YYYY-MM-DD"));
        console.log("fecha::", moment(new Date()).add(this.state.diasAnticipacion, "days").format("YYYY-MM-DD"));

        let fechaSesion = moment(_fecha).format("YYYY-MM-DD");
        let fechaConAnticip = moment(new Date()).add(this.state.diasAnticipacion, "days").format("YYYY-MM-DD");
        let fechaHoy = moment(new Date()).format("YYYY-MM-DD");

        if (fechaSesion < fechaHoy) {
            this.setState({ fechaPasada: true });
            this.setState({ openFechaInvalida: true });
        } else if (fechaSesion < fechaConAnticip) {
            this.setState({ openFechaInvalida: true });
        } else {
            this.setState({ graciasYopsIdSesion: _idSesion });
            let _arrTutor = [];
            _arrTutor.push(_idTutor);
            this.setState({ graciasYopsIdTutor: _arrTutor });
            this.setState({ open: true });
        }

    }

    handleOnCloseAceptarCancelacion() {
        //console.log("ctm",this.state.open);
        this.setState({ open3: false });
    }


    handleOnClose() {
        //console.log("ctm",this.state.open);
        this.setState({ open: false });
    }


    handleOnCloseCitaCancelada() {
        //Darle ok o Aceptar al dialogo de "Se registro staisfactoriamente la cancelacion"
        this.setState({ open3: false });
        this.setState({ open: false });
        //window.location.replace(this.props.location.pathname);
    }

    handleOnCloseAdvertencia() {
        this.setState({ openFechaInvalida: false });

    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevState.actuTys != this.state.actuTys) {
            let arregloDeSesiones =
                await Controller.GET({ servicio: "/api/listaSesionAlumno/" + getUser().usuario.ID_USUARIO });

            //console.log("arreglo: ", arregloDeSesiones);
            let arreglillo = [];
            let cont = 0;
            //let max=29;     //let fex=0;      //let letras =['I','II'];
            let fechaHoy = moment(new Date()).format("YYYY-MM-DD");
            let fechaSesion;

            for (let element of arregloDeSesiones.data) {
                cont++;
                //fex= max-(cont+1);
                fechaSesion = moment(element.FECHA).format("YYYY-MM-DD");

                let estadillo = element.ESTADO.split("-")[0];
                arreglillo.push({
                    campoCont: cont,
                    nombre: element.TUTOR ? element.TUTOR.USUARIO.NOMBRE + " " + element.TUTOR.USUARIO.APELLIDOS : "",
                    //fecha: fex + " " + "de Mayo del 2020",
                    fecha: element.FECHA + " / " + element.HORA_INICIO + " - " + element.HORA_FIN,
                    lugar: element.LUGAR,
                    //tipoTutoria: "Regular Tipo "+ letras[Math.floor(Math.random()*letras.length)],
                    tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,
                    btnCancelar:
                        <Button
                            size="large"
                            variant="outlined"
                            color="secondary"
                            onClick={e => this.handleOnClick(e, element.ID_SESION, element.ID_TUTOR, element.FECHA, element.PROCESO_TUTORIum.ID_PROGRAMA)}
                            disabled={element.PROCESO_TUTORIum.GRUPAL}
                        >
                            CANCELAR
                        </Button>,
                    //campoEstado: estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada")),
                    campoEstado: (estadillo !== "00" && estadillo !== "01") ? fechaSesion < fechaHoy ? "Pendiente Registro" :

                        (estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada"))) :

                        (estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada")))
                    ,

                    //campoEncuesta: "rico p", /*<<<<AQUÍ ENTRAS TÚ BBITA xD */
                    /*
                    btnPosponer:
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnClickPosponer}
                        >
                            POSPONER
                        </Button>,
                    */
                });
            }

            const data = {
                columns: [
                    // {
                    //     title: "",
                    //     field: "imagen"
                    // },
                    {
                        title: "N°",
                        field: "campoCont",

                    },
                    {
                        title: "Tutor",
                        field: "nombre",
                    },
                    {
                        title: "Fecha / Hora",
                        field: "fecha"
                    },
                    {
                        title: "Lugar",
                        field: "lugar"
                    },
                    {
                        title: "Tipo Tutoria",
                        field: "tipoTutoria"
                    },
                    {
                        title: "Cancelar Cita",
                        field: "btnCancelar"
                    },
                    {
                        title: "Estado",
                        field: "campoEstado"
                    },
                    {
                        title: "Encuesta",
                        field: "campoEncuesta"
                    },
                    /*
                    {
                        title: "POSPONER CITA",
                        field: "btnPosponer",
                    },
                    */

                ],
                data: arreglillo
            };

            this.setState({ sesiones: data });
        }
    }



    async handleOnclickAceptarCancelacion() {
        //console.log("ctm",this.state.open);
        //this.setState({ open: false });

        let yo = getUser();
        let _razon = "";
        const nuevaSolicitud = {
            sesion: {
                ID_SESION: this.state.graciasYopsIdSesion,
                ALUMNOS: [yo.usuario.ID_USUARIO],
                RAZON: this.state.yopsRazon,
                EMISOR: yo.usuario.ID_USUARIO.toString(),
                RECEPTOR: this.state.graciasYopsIdTutor,
            },
        };

        const props = { servicio: "/api/cancelarCita", request: nuevaSolicitud };
        let sesionTyS = await Controller.POST(props);
        console.log("YOOOPSSS tYS XXX ", sesionTyS);

        //DOING...
        //this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});  
        // if(sesionTyS){
        //     this.setState({mensajillo:"Cita Cancelada Satisfactoriamente!"});  
        // }else{
        //     this.setState({mensajillo:"Ups, Error inesperado... Por favor, inténtelo más tarde."});  
        // }

        if (!sesionTyS.message) {
            if (!sesionTyS.error) {
                this.setState({ mensajillo: "Cita Cancelada Satisfactoriamente !" });
                this.setState({ actuTys: !this.state.actuTys });

            } else {
                this.setState({ mensajillo: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
            }
        }
        else {
            this.setState({ mensajillo: sesionTyS.message });
        }

        this.setState({ open3: true });
    }

    handleOnChangeCT = (e) => {
        // nombre y descripcion   
        //console.log("XXXXXXXXX RAZON ",e.value);
        this.setState({ [e.name]: e.value });
        this.setState({ yopsRazon: e.value });

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

    async componentDidMount() {

        let arregloDeSesiones =
            await Controller.GET({ servicio: "/api/listaSesionAlumno/" + getUser().usuario.ID_USUARIO });

        //console.log("arreglo: ", arregloDeSesiones);
        let arreglillo = [];
        let cont = 0;
        //let max=29;     //let fex=0;      //let letras =['I','II'];
        let fechaHoy = moment(new Date()).format("YYYY-MM-DD");
        let fechaSesion;

        for (let element of arregloDeSesiones.data) {
            cont++;
            //fex= max-(cont+1);
            fechaSesion = moment(element.FECHA).format("YYYY-MM-DD");

            let estadillo = element.ESTADO.split("-")[0];
            arreglillo.push({
                campoCont: cont,
                nombre: element.TUTOR ? element.TUTOR.USUARIO.NOMBRE + " " + element.TUTOR.USUARIO.APELLIDOS : "",
                //fecha: fex + " " + "de Mayo del 2020",
                fecha: element.FECHA + " / " + element.HORA_INICIO + " - " + element.HORA_FIN,
                lugar: element.LUGAR,
                //tipoTutoria: "Regular Tipo "+ letras[Math.floor(Math.random()*letras.length)],
                tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,
                btnCancelar:
                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={e => this.handleOnClick(e, element.ID_SESION, element.ID_TUTOR, element.FECHA, element.PROCESO_TUTORIum.ID_PROGRAMA)}
                        disabled={element.PROCESO_TUTORIum.GRUPAL}
                    >
                        CANCELAR
                    </Button>,
                //campoEstado: estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada")),
                campoEstado: (estadillo !== "00" && estadillo !== "01") ? fechaSesion < fechaHoy ? "Pendiente Registro" :

                    (estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada"))) :

                    (estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada")))
                ,

                //campoEncuesta: "rico p", /*<<<<AQUÍ ENTRAS TÚ BBITA xD */
                /*
                btnPosponer:
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={this.handleOnClickPosponer}
                    >
                        POSPONER
                    </Button>,
                */
            });
        }

        const data = {
            columns: [
                // {
                //     title: "",
                //     field: "imagen"
                // },
                {
                    title: "N°",
                    field: "campoCont",

                },
                {
                    title: "Tutor",
                    field: "nombre",
                },
                {
                    title: "Fecha / Hora",
                    field: "fecha"
                },
                {
                    title: "Lugar",
                    field: "lugar"
                },
                {
                    title: "Tipo Tutoria",
                    field: "tipoTutoria"
                },
                {
                    title: "Cancelar Cita",
                    field: "btnCancelar"
                },
                {
                    title: "Estado",
                    field: "campoEstado"
                },
                {
                    title: "Encuesta",
                    field: "campoEncuesta"
                },
                /*
                {
                    title: "POSPONER CITA",
                    field: "btnPosponer",
                },
                */

            ],
            data: arreglillo
        };

        this.setState({ sesiones: data });

    }

    render() {

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="alert-dialog-title">
                        {<h3> ¿ Está seguro de cancelar esta cita ? </h3>}</DialogTitle>

                    <DialogContent>
                        <Paper elevation={0} >
                            <CampoDeTexto
                                autoFocus={true}
                                name="Motivo"
                                label="Ingrese Motivo de Cancelación"
                                validacion={{ lim: 300 }}
                                variant={"outlined"}
                                rows={10}
                                multiline={true}
                                requerido={true}
                                inicial="..."
                                onChange={this.handleOnChangeCT}
                                validarEntrada={this.validarEntradaCT}
                            />
                        </Paper>

                    </DialogContent>

                    <DialogActions>
                        <Button
                            size="large"
                            variant="outlined"
                            color="primary"
                            onClick={this.handleOnClose}                        >
                            No
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnclickAceptarCancelacion}                        >
                            SÍ
                        </Button>
                    </DialogActions>
                </Dialog>



                {this.state.openFechaInvalida &&
                    <Dialog
                        open={this.state.openFechaInvalida}
                        onClose={this.handleOnCloseAdvertencia}
                    >
                        <DialogTitle id="form-dialog-title-fecha">
                            <Grid container md={12} justify="center">
                                <WarningRoundedIcon style={{ fontSize: 70, fill: "orange" }} />
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container md={12} justify="center">
                                <Typography variant="subtitle1" >
                                    Por politica de la facultad solo puede cancelar su
                            cita con mínimo {this.state.diasAnticipacion} dias de Anticipación
                        </Typography>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={this.handleOnCloseAdvertencia}
                                color="primary"
                            >
                                Aceptar
                        </Button>
                        </DialogActions>
                    </Dialog>}

                <Dialog
                    open={this.state.open3}
                    onClose={this.handleOnCloseCitaCancelada}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >
                        <h3 >Resultado </h3>

                    </DialogTitle>
                    <DialogContent>
                        {this.state.mensajillo}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnCloseCitaCancelada}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

                <TabProceso procesos={[
                    {
                        index: 0, titulo: "Pendientes", //Pendientes y realizadas
                        proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"PyR"} />
                    },
                    //{ index: 1, titulo: "Reprogramadas", proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"Reprogramada"} /> },
                    { index: 1, titulo: "Realizadas", proceso: () => < FrmMisCitasPasadas /> },
                    { index: 2, titulo: "Canceladas", proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"Cancelada"} /> },

                ]} paper={true} />

                {
                    /* por aora no es necesario que el formulario tenga su propio tab ya que el comp. padre te lo dara tranqui xd
                    <Paper elevation={0} style={style.paper}>
                    
                    <Tabs
                        centered
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        //onChange={this.handleTabOnChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="" />

                    </Tabs>
                    
                    </Paper>

                    */
                }

                {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                {/*<TablaTutoresMisCitas sesiones={this.state.sesiones} />*/}

            </div>
        );
    }
}

export default compose(withRouter)(FrmMisCitas);

const estilo = {
    imagen: {
        width: "30%",
        borderRadius: "100%",
    }
}