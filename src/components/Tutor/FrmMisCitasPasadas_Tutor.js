import React, { Component } from "react";
import * as Controller from "../../Conexion/Controller";
import TablaCitasPasadas from "../Alumno/AgendarCita/CitasPasadas/TablaCitasPasadas";

import { getUser } from "../../Sesion/Sesion"
import { Button, Dialog, DialogTitle, Typography, DialogContent, Paper, Grid, DialogActions, TextField } from "@material-ui/core";
import moment from 'moment';
import Alertas from "../Coordinador/Alertas";
import ModificaAsignaciones from "../Coordinador/FormAsignacion/ModificaAsignaciones";
import BtnRegistroSesionGrupal from "./RegistroSesionGrupal/BtnRegistroSesionGrupal";
import ModificarPlanDeAccion from "./Sesiones/ModificarPlanDeAccion.js";
import PlanDeAccion from "./Sesion/PlanDeAccion";
import ListaEtiquetas from "./Sesion/ListaEtiquetas";
import { openMensajePantalla } from "./../../Sesion/actions/dialogAction";

import { DialogContext } from "./../../Sesion/dialog.js";
import RevisarSesion from "./Sesiones/RevisarSesion";


class FrmMisCitasPasadas_Tutor extends Component {
    static contextType = DialogContext;
    constructor() {
        super();

        this.state = {
            sesiones: {
                columns: [{
                    title: "Nombre",
                    field: "nombre",
                }],
                data: [{ nombre: "" }]
            },
            open: false,
            alert: {
                mensajeStrong: "",
                mensajeStrongError: "Por favor revísalos",
                mensajeStrongExito: "Satisfactoriamente",
                mensajeError: "Existen errores al completar el formulario",
                mensajeExito: "Se modificaron los datos de la institucion",
                mensaje: "",
            },
            severidad: "warning",
            open5: false,
            elementResul: undefined,
            compromiso: [],
            etiqueta: [],
            descripcion: "",
            actuTys: false,

        };

        this.establecerData = this.establecerData.bind(this);
        this.handleOnOpen = this.handleOnOpen.bind(this);
        this.handleOnCloseResul = this.handleOnCloseResul.bind(this);
        this.handleOnOpenVer = this.handleOnOpenVer.bind(this);
        this.handleOnCloseVer = this.handleOnCloseVer.bind(this);
        this.handleOnChangeEtiquetas = this.handleOnChangeEtiquetas.bind(this);
        this.handleSetPlan = this.handleSetPlan.bind(this);
        this.handleDeDoggy = this.handleDeDoggy.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);

    };

    async handleGuardar() {
        let id_alumno = [];
        if (this.state.elementResul !== undefined) {
            console.log(">>ID_VL=>", this.state.elementResul.ALUMNOs[0].ID_ALUMNO);
            id_alumno.push(this.state.elementResul.ALUMNOs[0].ID_ALUMNO);
        }

        const resultadosSesion = {
            sesion: {
                ID_SESION: this.state.elementResul?.ID_SESION,
                RESULTADO: this.state.descripcion,
                COMPROMISOS: this.state.compromiso,
                ALUMNOS: id_alumno,
                ASISTENCIA: [this.state.asistencia === "yes" ? "1" : "0"],
                AREAS_APOYO: this.state.etiqueta,
            },
        };

        console.log(">>RESUL=>", resultadosSesion);
        const props = { servicio: "/api/registrarResultadoCita", request: resultadosSesion };
        let sesionTyS = await Controller.POST(props);

        if (!sesionTyS) return;

        console.log("SESIONtYS XXX ", sesionTyS);

        if (!sesionTyS.message) {
            if (!sesionTyS.error) {
                let [{ openMensaje, mensaje }, dispatchDialog] = this.context;
                openMensajePantalla(dispatchDialog, {
                    postClose: this.handleOnCloseResul,

                    open: true,
                    mensaje:
                        "C>¡ Resultados Registrados Satisfactoriamente !",
                });
                this.setState({ actuTys: !this.state.actuTys });

                //this.setState({ mensajillo: "¡ Resultados Registrados Satisfactoriamente !" });

            }

            else {
                // this.setState({
                //     mensajillo:
                //       "Ups, Error Inesperado.   Por favor, Inténtelo más tarde.",
                //   });
                let [{ openMensaje, mensaje }, dispatchDialog] = this.context;

                openMensajePantalla(dispatchDialog, {
                    open: true,
                    mensaje:
                        "X>Ups, Error Inesperado.   Por favor, Inténtelo más tarde.",
                });
            }

        } else {

            //this.setState({ mensajillo: sesionTyS.message });
            let [{ openMensaje, mensaje }, dispatchDialog] = this.context;

            openMensajePantalla(dispatchDialog, {
                open: true,
                mensaje:
                    `X>${sesionTyS.message}`,
            });
        }
    }

    handleDeDoggy = (e) => {
        this.setState({ asistencia: e.target.value });
    }

    handleOnChangeCT = (e) => {
        // nombre y descripcion
        //console.log("jhjhjhj: ", e);
        // if (e.target.value.length === 0) {
        //   this.setState({ errorDesc: true })
        // } else {
        //   this.setState({ errorDesc: false })
        // }

        this.setState({ [e.target.name]: e.target.value });
    };

    handleSetPlan(_plan) {
        // let _arr = [];
        // _arr = this.state.compromiso;
        // _arr.push(_plan);
        this.setState({ compromiso: _plan });
    }

    handleOnChangeEtiquetas = (etiqueta) => {
        const listaEtiquetas = [];
        etiqueta.forEach((element) => {
            if (element.agregar) {
                listaEtiquetas.push(element.id);
            }
        });
        this.setState({ etiqueta: listaEtiquetas });
    }

    handleCompromiso(_comp) {
        this.setState({ compromiso: _comp });
    }

    handleOnOpenVer() {
        this.setState({ open5: true });

    }
    handleOnCloseVer() {
        ////console.log("<<rico");
        this.setState({ open5: false });
    }

    handleOnclickVerAlmunos(e, arrAlumno) {
        ////console.log("<<AVER", arrAlumno);
        let _arr = [];
        _arr = arrAlumno;
        this.setState({ arrAlumnoVer: _arr })
        this.setState({ open5: true });
    }

    handleOnOpen = (e, element) => {
        console.log(">>Element", element);
        //elementResul = element;
        this.setState({ elementResul: element });
        console.log(">>ElementResul", this.state.elementResul);
        this.setState({ open: true });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.actuTys != this.state.actuTys) {
            let arregloDeSesiones = await Controller.GET({ servicio: "/api/listaSesiones/" + getUser().usuario.ID_USUARIO });
            this.establecerData(arregloDeSesiones);
        }
    }

    async establecerData(arregloDeSesiones) {
        let arreglillo = [];
        let cont = 0;
        let fechaHoy = moment(new Date()).format("YYYY-MM-DD");
        let fechaSesion;

        for (let element of arregloDeSesiones.data) {
            // cont++;
            fechaSesion = await moment(element.FECHA).format("YYYY-MM-DD");

            let estadillo = element.ESTADO.includes("realizada") || element.ESTADO.includes("cancelada") ? element.ESTADO.split("-")[0] : fechaHoy > fechaSesion ? "PR" : element.ESTADO.split("-")[0];
            console.log(">>XXX + cont", estadillo, cont);


            if (estadillo === "00" || estadillo === "01" || estadillo === "PR") {
                cont++;
                console.log(">>KHA?- dentro 2do if");

                arreglillo.push({
                    campoCont: cont,
                    // nombre: element.ALUMNOs ? element.ALUMNOs[0].USUARIO.NOMBRE + " " + element.ALUMNOs[0].USUARIO.APELLIDOS : "",
                    nombre: element.PROCESO_TUTORIum.GRUPAL ?
                        <Button
                            href="#text-buttons" color="primary"
                            onClick={e => this.handleOnclickVerAlmunos(e, element.ALUMNOs)}
                        >
                            Ver Alumnos
                            </Button> :
                        (element.ALUMNOs[0] ? element.ALUMNOs[0].USUARIO.NOMBRE ? element.ALUMNOs[0].USUARIO.NOMBRE + " " +
                            element.ALUMNOs[0].USUARIO.APELLIDOS : "" : ""),

                    fecha: element.FECHA + " / " + element.HORA_INICIO + " - " + element.HORA_FIN,
                    campoLugar: element.LUGAR,
                    tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,//element.PROCESO_TUTORIum.NOMBRE,
                    campoEstado: estadillo === "PR" ? "Pendiente registro" : "Realizada",
                    campoResultados:
                        <div>
                            <Button
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={e => this.handleOnOpen(e, element)}
                                disabled={estadillo !== "PR"}
                            >
                                Resultados
                            </Button>

                        </div>

                });

            }




        }

        const data = {
            columns: [
                {
                    title: "N°",
                    field: "campoCont",

                },
                {
                    title: "Alumno",
                    field: "nombre",
                },
                {
                    title: "Fecha / Hora",
                    field: "fecha"
                },
                {
                    title: "Lugar",
                    field: "campoLugar"
                },
                {
                    title: "Tipo Tutoria",
                    field: "tipoTutoria"
                },
                {
                    title: "Resultados",//Resumen
                    field: "campoResultados"//campoEncuesta
                },
                {
                    title: "Estado",
                    field: "campoEstado"
                },

            ],
            data: arreglillo
        };

        this.setState({ sesiones: data });
    }

    async componentDidMount() {
        //console.log("ID TUTOR: ", getUser().usuario.ID_USUARIO);
        //console.log("SERVICIO: ", "/api/listaSesiones/" + getUser().usuario.ID_USUARIO);
        let arregloDeSesiones = await Controller.GET({ servicio: "/api/listaSesiones/" + getUser().usuario.ID_USUARIO });
        //console.log("sesiones tutor: ", arregloDeSesiones);
        this.establecerData(arregloDeSesiones);
    }



    handleOnCloseResul() {
        this.setState({ open: false });
    }

    render() {
        //const elementResul = new Object();
        return (
            <div>
                <TablaCitasPasadas tutores={this.state.sesiones} />

                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnCloseResul}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h5">Datos Sesión</Typography>
                    </DialogTitle>

                    <DialogContent>
                        <Paper elevation={0} style={estilos.paper}>
                            <Grid container md={12} spacing={3}>
                                {this.state.elementResul?.PROCESO_TUTORIum?.GRUPAL ? <></> : (
                                    <Grid item md={12}>
                                        <TextField
                                            disabled
                                            id="alumno"
                                            label="Alumno"
                                            value={
                                                this.state.elementResul?.ALUMNOs[0].USUARIO.NOMBRE +
                                                " " +
                                                this.state.elementResul?.ALUMNOs[0].USUARIO.APELLIDOS
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                )}


                                <Grid item md={4}>
                                    <TextField
                                        disabled
                                        required
                                        margin="dense"
                                        type="date"
                                        id="Fecha"
                                        label="Fecha"
                                        value={this.state.elementResul?.FECHA}
                                        InputLabelProps={{ shrink: true, }}
                                        //onChange={(e) => handleFecha(e, datosForm, setDatosForm)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                        disabled
                                        required
                                        margin="dense"
                                        type="time"
                                        id="Hora"
                                        value={this.state.elementResul?.HORA_INICIO}
                                        label="Hora Inicio"
                                        InputLabelProps={{ shrink: true, }}
                                        //onChange={(e) => handleHoraIni(e, datosForm, setDatosForm)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                        disabled
                                        required
                                        margin="dense"
                                        type="time"
                                        id="Hora fin"
                                        label="Hora Fin"
                                        value={this.state.elementResul?.HORA_FIN}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        //onChange={(e) => handleHoraFin(e, datosForm, setDatosForm)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        disabled
                                        id="lugar"
                                        label="Lugar"
                                        value={this.state.elementResul?.LUGAR}
                                        //onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        disabled
                                        id="tutoria"
                                        label="Tutoría"
                                        value={this.state.elementResul?.PROCESO_TUTORIum.NOMBRE}
                                        //onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                                        fullWidth
                                    />
                                </Grid>
                                {this.state.elementResul?.PROCESO_TUTORIum.GRUPAL ? (
                                    <Grid item md={12}>
                                        <BtnRegistroSesionGrupal
                                            cita={this.state.elementResul ? this.state.elementResul : ""} />
                                    </Grid>
                                ) : (
                                        ""
                                    )}

                                {this.state.elementResul?.PROCESO_TUTORIum.GRUPAL ? (
                                    <></>
                                ) : (
                                        (this.state.elementResul?.ESTADO.includes("03") ||
                                            this.state.elementResul?.ESTADO.includes("04")) && (
                                            <PlanDeAccion
                                                plan={this.state.elementResul?.COMPROMISOs}
                                                setPlan={this.handleSetPlan}
                                                ultimoCompromiso={this.handleCompromiso}
                                            />
                                        )
                                    )}

                                {this.state.elementResul?.PROCESO_TUTORIum.GRUPAL ? (
                                    <></>
                                ) : (
                                        <Grid item md={12} justify="flex-start">
                                            <ListaEtiquetas
                                                strecht={true}
                                                titulo={""}
                                                obtenerEtiquetas={this.handleOnChangeEtiquetas}
                                                enlace={"/api/listaAreasApoyo"}
                                                enlace2={
                                                    "/api/listaSesiones/" +
                                                    this.state.elementResul?.ID_TUTOR +
                                                    "/" +
                                                    this.state.elementResul?.FECHA
                                                }
                                                small={true}
                                                label={"Unidades de Apoyo"}
                                                idSesion={this.state.elementResul?.ID_SESION}
                                                ID={"ID_AREA_APOYO"}
                                            />
                                        </Grid>
                                    )}

                                {this.state.elementResul?.PROCESO_TUTORIum.GRUPAL ? (
                                    <></>
                                ) : (
                                        <>
                                            <Grid item md={12} justify="center">
                                                <Paper elevation={0} style={estilos.paperitem}>
                                                    <Typography variant="h6">Resultados</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={12} container justify="center">
                                                <TextField
                                                    fullWidth
                                                    required={true}
                                                    autoFocus={true}
                                                    name="descripcion"
                                                    label="Ingrese los resultados de la sesión :"
                                                    multiline
                                                    rows={5}
                                                    //id="res"
                                                    variant="outlined"
                                                    onChange={this.handleOnChangeCT}

                                                // defaultValue={
                                                //   cita.cita.ALUMNOs[0].ALUMNO_X_SESION.RESULTADO
                                                // }
                                                // onChange={(e) =>
                                                //   handleResultados(e, datosForm, setDatosForm)
                                                // }
                                                />


                                                {this.state.elementResul?.PROCESO_TUTORIum.GRUPAL ? (
                                                    <></>
                                                ) : (
                                                        <p>
                                                            <Typography variant="h6">¿Asistió a la cita?</Typography>
                                                            <br></br>
                                                            {this.state.elementResul?.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO ? (
                                                                <></>
                                                            ) : (
                                                                    <input
                                                                        type="radio"
                                                                        id="asistio"
                                                                        name="asistencia"
                                                                        value="yes"
                                                                        // onChange={(e) =>
                                                                        //     handleDogsAssistance(e, datosForm, setDatosForm)
                                                                        // }
                                                                        onChange={this.handleDeDoggy}
                                                                    ></input>
                                                                )}
                                                            <label for="asistio">Sí</label>
                                                            {this.state.elementResul?.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO ==
                                                                false ? (
                                                                    <></>
                                                                ) : (
                                                                    <input
                                                                        type="radio"
                                                                        id="noasistio"
                                                                        name="asistencia"
                                                                        value="no"
                                                                        // onChange={(e) =>
                                                                        //     handleDogsAssistance(e, datosForm, setDatosForm)
                                                                        // }
                                                                        onChange={this.handleDeDoggy}
                                                                    ></input>
                                                                )}
                                                            <label for="noasistio">No</label>
                                                        </p>
                                                    )}

                                            </Grid>
                                        </>
                                    )}


                            </Grid>
                        </Paper>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={this.handleOnCloseResul}
                            color="primary">
                            Cancelar
                         </Button>

                        {this.state.elementResul?.PROCESO_TUTORIum.GRUPAL ? (
                            <></>
                        ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    //onClick={(e) => handleClick(e, datosForm, setDatosForm)}
                                    onClick={this.handleGuardar}
                                >
                                    Guardar
                                </Button>
                            )}


                    </DialogActions>
                </Dialog>

                {this.state.open5 &&
                    <ModificaAsignaciones
                        open={this.handleOnOpenVer}
                        close={this.handleOnCloseVer}
                        alumnos={this.state.arrAlumnoVer} />
                }

            </div>
        );
    }

}

export default FrmMisCitasPasadas_Tutor;

const estilos = {
    paper: {
        marginTop: "4%",
        marginLeft: "4%",
        marginRight: "4%",
        marginBottom: "5%",
        flexDirection: "row",
        alignItems: "center",
        backgroundImage: "",
    },
    paperitem: {
        marginTop: "2%",
        marginLeft: "4%",
    },
    // foto: {
    //   marginTop: "2%",
    //   marginLeft: "4%",
    //   marginTop: "4%",
    //   flexDirection: "row",
    //   alignItems: "center",
    //   backgroundImage: "",
    // },
};