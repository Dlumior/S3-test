import React, { Component } from "react";
import { Paper, Tabs, Tab, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@material-ui/core";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import TabProceso from "../Coordinador/Tutorias/TabProceso";
import TablaTutoresMisCitas_Tutor from "./TablaTutoresMisCitas_Tutor.js"

import * as Controller from "./../../Conexion/Controller";
import { getUser } from "../../Sesion/Sesion";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";


class FrmMisCitas_Tutor extends Component {
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
            open2: false,
            open3: false,
            open4: false,
            mensajillo: "",
            mensajilloR: "",
            graciasYopsIdSesion: 0,
            graciasYopsIdProcesoTuto: 0,
            graciasYopsIdAlumno: [],
            graciasYopsIdSesionR: 0,
            graciasYopsIdAlumnoR: [],
            yopsRazon: "",
            yopsRazon_Rep: "",
            fechaR: "",
            horaIniR: "",
            horaFinR: "",

        };

        this.handleOnClickCancelar = this.handleOnClickCancelar.bind(this);
        this.handleOnCloseCancelar = this.handleOnCloseCancelar.bind(this);
        this.handleOnCloseCitaCancelada = this.handleOnCloseCitaCancelada.bind(this);
        this.handleOnclickAceptarCancelacion = this.handleOnclickAceptarCancelacion.bind(this);

        this.handleOnClickPosponer = this.handleOnClickPosponer.bind(this);
        this.handleOnCloseReprogramar = this.handleOnCloseReprogramar.bind(this);
        this.handleOnCloseCitaCancelada_Rep = this.handleOnCloseCitaCancelada_Rep.bind(this);
        this.handleOnclickAceptarReprogramacion = this.handleOnclickAceptarReprogramacion.bind(this);

        this.handleOnChangeFecha = this.handleOnChangeFecha.bind(this);
        this.handleOnChangeHoraIni = this.handleOnChangeHoraIni.bind(this);
        this.handleOnChangeHoraFin = this.handleOnChangeHoraFin.bind(this);
    };

    handleOnChangeHoraIni(e) {
        this.setState({ horaIniR: e.target.value });
    }

    handleOnChangeHoraFin(e) {
        this.setState({ horaFinR: e.target.value });
    }

    //de btn cancelar
    handleOnClickCancelar(e, _idSesion, _idAlumno) {
        console.log("TARGET DEL E idSesion/idAlumno", _idSesion, _idAlumno);
        this.setState({ graciasYopsIdSesion: _idSesion });

        //this.setState({graciasYopsIdTutor:_idTutor});
        let _arrAlumno = [];
        _arrAlumno.push(_idAlumno.toString());

        this.setState({ graciasYopsIdAlumno: _arrAlumno });
        this.setState({ open: true });

        console.log("AFTER sesion: ", this.state.graciasYopsIdSesion);

    }

    //de boton Reprogramar

    handleOnClickPosponer(e, _idSesion, _idAlumno, _idProctuto) {
        //console.log("holiss");
        this.setState({ graciasYopsIdSesionR: _idSesion });
        this.setState({ graciasYopsIdProcesoTuto: _idProctuto });

        let _arrAlumno = [];
        _arrAlumno.push(_idAlumno);
        this.setState({ graciasYopsIdAlumnoR: _arrAlumno });

        this.setState({ open2: true });
    }

    handleOnCloseCancelar() {
        this.setState({ open: false });
    }


    handleOnCloseReprogramar() {
        this.setState({ open2: false });
    }
    handleOnCloseCitaCancelada() {
        //Darle ok o Aceptar al dialogo de "Se registro staisfactoriamente la cancelacion"
        this.setState({ open3: false });
        this.setState({ open: false });
        window.location.replace(this.props.location.pathname);
    }

    handleOnCloseCitaCancelada_Rep() {
        //Darle ok o Aceptar al dialogo de "Se registro staisfactoriamente la cancelacion"
        this.setState({ open4: false });
        this.setState({ open2: false });
        window.location.replace(this.props.location.pathname);
    }

    handleOnChangeCT = (e) => {
        // nombre y descripcion   
        //console.log("XXXXXXXXX RAZON ",e.value);
        this.setState({ [e.name]: e.value });
        this.setState({ yopsRazon: e.value });

    }


    handleOnChangeCT_Rep = (e) => {
        // nombre y descripcion   
        //console.log("XXXXXXXXX RAZON ",e.value);
        this.setState({ [e.name]: e.value });
        this.setState({ yopsRazon_Rep: e.value });

    }

    validarEntradaCT_Rep(error) {
        //insert code here of validacion of el campeishion
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



    async handleOnclickAceptarCancelacion() {
        //console.log("STATE ", this.state.graciasYopsIdSesion);
        let yo = getUser();
        let _razon = "";
        const nuevaSolicitud = {
            sesion: {
                ID_SESION: this.state.graciasYopsIdSesion.toString(),
                ALUMNOS: this.state.graciasYopsIdAlumno, //este es un arreglo de uno
                RAZON: this.state.yopsRazon,
                EMISOR: yo.usuario.ID_USUARIO.toString(),
                RECEPTOR: this.state.graciasYopsIdAlumno, //este es un arreglo de uno
            },
        };

        console.log("ANTES DE API: ", nuevaSolicitud);
        const props = { servicio: "/api/cancelarCita", request: nuevaSolicitud };
        let sesionTyS = await Controller.POST(props);
        console.log("RESULTADO API Cancelar ", sesionTyS);

        //this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});  
        // if (sesionTyS) {
        //     this.setState({ mensajillo: "Cita Cancelada Satisfactoriamente!" });
        // } else {
        //     this.setState({ mensajillo: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
        // }
        if (!sesionTyS.message) {
            if (!sesionTyS.error) {
                this.setState({ mensajillo: "Cita Cancelada Satisfactoriamente !" });
            } else {
                this.setState({ mensajillo: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
            }
        }
        else {
            this.setState({ mensajillo: sesionTyS.message });
        }
        this.setState({ open3: true });
    }


    async handleOnclickAceptarReprogramacion() {

        //console.log("STATE ", this.state.graciasYopsIdSesionR);
        let yo = getUser();
        const nuevaSolicitud = {
            sesion: {
                ID_SESION: this.state.graciasYopsIdSesionR,
                ID_TUTOR: yo.usuario.ID_USUARIO.toString(),
                ID_PROCESO_TUTORIA: this.state.graciasYopsIdProcesoTuto,
                FECHA: this.state.fechaR,
                HORA_INICIO: this.state.horaIniR,
                HORA_FIN: this.state.horaFinR,
                ALUMNOS: this.state.graciasYopsIdAlumnoR, //este es un arreglo de uno
                RAZON: this.state.yopsRazon_Rep,
                EMISOR: yo.usuario.ID_USUARIO.toString(),
                RECEPTOR: this.state.graciasYopsIdAlumnoR, //este es un arreglo de uno
            },
        };


        console.log("ANTES DE API arreglo Rep nueva soli: ", nuevaSolicitud);

        const props = { servicio: "/api/posponerCita", request: nuevaSolicitud };
        let sesionTyS = await Controller.POST(props);
        console.log("RESULTADO API rep ", sesionTyS);


        //this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});  

        // if (sesionTyS) {
        //     this.setState({ mensajilloR: "Cita Reprogramada Satisfactoriamente!" });
        // } else {
        //     this.setState({ mensajilloR: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
        // }

        if (!sesionTyS.message) {
            if (!sesionTyS.error) {
                this.setState({ mensajilloR: "Cita Reprogramada Satisfactoriamente !" });
            } else {
                this.setState({ mensajilloR: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
            }
        }
        else {
            this.setState({ mensajilloR: sesionTyS.message });
        }

        this.setState({ open4: true });
    }




    async componentDidMount() {
        let arregloDeSesiones =
            await Controller.GET({ servicio: "/api/listaSesiones/" + getUser().usuario.ID_USUARIO });

        //console.log("arreglo: ", arregloDeSesiones);
        let arreglillo = [];
        let cont = 0;
        for (let element of arregloDeSesiones.data) {
            cont++;
            let estadillo = element.ESTADO.split("-")[0];

            arreglillo.push({
                campoCont: cont,
                /*
                    imagen: <div>
                      <img
                          style={estilo.imagen}
                          src="https://files.pucp.education/profesor/img-docentes/tupia-anticona-manuel-francisco-19931850.jpg">
  
                      </img>
                  </div>, 
                 */

                //>>> ASUMIMOS PARA UN ALUMNO
                //.....Sino se tendria qrecorrer el arreglo de alumno de la cita(caso grupales)
                nombre: element.ALUMNOs[0]?element.ALUMNOs[0].USUARIO.NOMBRE ? element.ALUMNOs[0].USUARIO.NOMBRE + " " + element.ALUMNOs[0].USUARIO.APELLIDOS : "":"",
                fecha: element.FECHA + " / " + element.HORA_INICIO + " - " + element.HORA_FIN,
                lugar: element.LUGAR,
                campoMotivoSoli: element.MOTIVO,
                campoDescMotivo: element.DESCRIPCION,
                //tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,
                btnCancelar:
                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={e => this.handleOnClickCancelar(e, element.ID_SESION, element.ALUMNOs[0].ID_ALUMNO)}
                    >
                        CANCELAR
                    </Button>,
                campoEstado: estadillo === "04" ? "Pendiente" : estadillo === "03" ? "Reprogramada" :
                    estadillo === "02" ? "Cancelada" : "Realizada",

                btnPosponer:
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={e => this.handleOnClickPosponer(e, element.ID_SESION, element.ALUMNOs[0].ID_ALUMNO, element.ID_PROCESO_TUTORIA)}
                    >
                        REPROGRAMAR
                    </Button>,
                campoRazonMantenimiento: element.RAZON_MANTENIMIENTO,

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
                    title: "Alumno",
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
                    title: "Motivo Solicitud",
                    field: "campoMotivoSoli",
                },
                {
                    title: "Descripción del Motivo",
                    field: "campoDescMotivo",
                },
                // {
                //     title: "Tipo Tutoria",
                //     field: "tipoTutoria"
                // },
                {
                    title: "Cancelar Cita",
                    field: "btnCancelar"
                },
                {
                    title: "Reprogramar Cita",
                    field: "btnPosponer",
                },
                {
                    title: "Estado",
                    field: "campoEstado"
                },
                {
                    title: "Motivo Cancelación",
                    field: "campoRazonMantenimiento"
                },

            ],
            data: arreglillo
        };

        this.setState({ sesiones: data });

    }




    handleOnChangeFecha(e) {
        this.setState({ fechaR: e.target.value });
    }

    render() {
        return (
            <div>
                {/********************** CANCELAR ******************************/}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnCloseCancelar}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">
                        {<h3> ¿ Está seguro de Cancelar esta cita ? </h3>}</DialogTitle>
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
                            onClick={this.handleOnCloseCancelar}                        >
                            No
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnclickAceptarCancelacion}                        >
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/********************** REPROGRAMAR ******************************/}
                <Dialog
                    open={this.state.open2}
                    onClose={this.handleOnCloseReprogramar}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">
                        {<h3> ¿ Está seguro de Reprogramar esta cita ? </h3>}</DialogTitle>
                    <DialogContent>


                        <Grid container spacing={2} >
                            <Grid item md={4}>
                                <TextField
                                    required
                                    margin="dense"
                                    type="date"
                                    id="Fecha"
                                    label="Ingrese nueva Fecha"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.handleOnChangeFecha(e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4} >
                                <TextField
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    type="time"
                                    id="Hora"
                                    label="Nueva Hora Inicio"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.handleOnChangeHoraIni(e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4} >
                                <TextField
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    type="time"
                                    id="Hora fin"
                                    label="Nueva Hora Fin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.handleOnChangeHoraFin(e)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>



                        <Paper elevation={0} >
                            <CampoDeTexto
                                autoFocus={true}
                                name="Motivo"
                                label="Ingrese razón  de Reprogramación de la Cita"
                                validacion={{ lim: 300 }}
                                variant={"outlined"}
                                rows={10}
                                multiline={true}
                                requerido={true}
                                inicial="..."
                                onChange={this.handleOnChangeCT_Rep}
                                validarEntrada={this.validarEntradaCT_Rep}
                            />
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            size="large"
                            variant="outlined"
                            color="primary"
                            onClick={this.handleOnCloseReprogramar}                        >
                            No
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnclickAceptarReprogramacion}                        >
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>





                <TabProceso procesos={[
                    {
                        index: 0, titulo: "Futuras", //Pendientes y realizadas
                        proceso: () => < TablaTutoresMisCitas_Tutor sesiones={this.state.sesiones} estado={"PyR"} />
                    },
                    { index: 1, titulo: "Realizadas", proceso: () => < TablaTutoresMisCitas_Tutor sesiones={this.state.sesiones} estado={"Realizada"} /> },
                    { index: 2, titulo: "Canceladas", proceso: () => < TablaTutoresMisCitas_Tutor sesiones={this.state.sesiones} estado={"Cancelada"} /> },

                ]} paper={true} />

                <Dialog
                    open={this.state.open3}
                    onClose={this.handleOnCloseCitaCancelada}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >    <h3 >Resultado </h3> </DialogTitle>
                    <DialogContent>  {this.state.mensajillo}   </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnCloseCitaCancelada}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={this.state.open4}
                    onClose={this.handleOnCloseCitaCancelada_Rep}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >    <h3 >Resultado </h3> </DialogTitle>
                    <DialogContent>  {this.state.mensajilloR}   </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnCloseCitaCancelada_Rep}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}


export default compose(withRouter)(FrmMisCitas_Tutor);
