import React, { Component } from "react";
import { Paper, Tabs, Tab, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, TextField, FormHelperText } from "@material-ui/core";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import TabProceso from "../Coordinador/Tutorias/TabProceso";
import TablaTutoresMisCitas_Tutor from "./TablaTutoresMisCitas_Tutor.js"
import * as Controller from "./../../Conexion/Controller";
import { getUser } from "../../Sesion/Sesion";
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";
import FrmMisCitasPasadas_Tutor from "./FrmMisCitasPasadas_Tutor";
import moment from 'moment';
import ModificaAsignaciones from "../Coordinador/FormAsignacion/ModificaAsignaciones";

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
            open5: false,
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
            duraSesion: 0,
            arrAlumnoVer: [],
            actuTys: false,
            mensajeError: "",
            mensajeErrorR: "",
            esInvalido: true,
            esInvalidoR: true,
            esInvalRTotal: true,
            dataMotivo:"",

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
        this.handleFocusOutHoraIni = this.handleFocusOutHoraIni.bind(this);
        this.handleOnclickVerAlmunos = this.handleOnclickVerAlmunos.bind(this);

        this.handleOnOpenVer = this.handleOnOpenVer.bind(this);
        this.handleOnCloseVer = this.handleOnCloseVer.bind(this);

        this.cumpleValidaciones = this.cumpleValidaciones.bind(this);


    };

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

    handleFocusOutHoraIni() {
        let valMin = this.state.horaIniR.slice(-2);
        let _yeri = "";
        if (valMin === "00" || valMin === "30") {
            ////console.log(">>> Es 00 o 30");
            _yeri = this.state.horaIniR;
            this.setState({ horaIniR: _yeri });
        } else {
            // //console.log(">>> joder");
            // //console.log(">>> D,this.state.horaIniR: ", this.state.horaIniR);
            // //console.log(">>> this.state.horaIniR.slice(-2): ", valMin);
            // //console.log(">>> tipo: ", typeof (valMin));
            _yeri = this.state.horaIniR.slice(0, 2) + ":00";
            ////console.log("FOCUS=>", _yeri);
            this.setState({ horaIniR: _yeri });
        }
        //actualizamos la hora de la salida
        let _strHora = "2020-07-04 ";
        _strHora += _yeri;
        let _datetime = new Date(_strHora);
        _datetime.setMinutes(_datetime.getMinutes() + this.state.duraSesion);
        let n = _datetime.toLocaleTimeString();
        ////console.log("antesIF=> ", n);
        if (n.length === 7) { n = "0" + n; }
        n = n.slice(0, 5);
        ////console.log("antes n=> ", n);
        this.setState({ horaFinR: n });

        if (this.state.horaIniR === ":00") {
            this.setState({ horaFinR: "" });
            this.setState({ esInvalRTotal: true });
        }

    }

    handleOnChangeHoraIni(e) {
        this.setState({ horaIniR: e.target.value });
        ////console.log("horaIniR", this.state.horaIniR);
        //=> aquiRicop
        //********/

        let _strHora = "2020-07-04 ";
        _strHora += e.target.value;
        ////console.log("_str", _strHora);
        let _datetime = new Date(_strHora);
        _datetime.setMinutes(_datetime.getMinutes() + this.state.duraSesion);
        let n = _datetime.toLocaleTimeString();
        ////console.log("n", n);
        if (n.length === 7) { n = "0" + n; }
        n = n.slice(0, 5);
        ////console.log("SLICE TUTO=> ", n);
        this.setState({ horaFinR: n });
        //********/

        document.getElementById("Hora").addEventListener("focusout", this.handleFocusOutHoraIni);

        if (this.state.horaIniR === ":00") {
            this.setState({ horaFinR: "" });
            this.setState({ esInvalRTotal: true });
        }

    }

    handleOnChangeHoraFin(e) {
        this.setState({ horaFinR: e.target.value });
    }

    //de btn cancelar
    handleOnClickCancelar(e, _idSesion, _idAlumno) {
        ////console.log("TARGET DEL E idSesion/idAlumno", _idSesion, _idAlumno);
        this.setState({ graciasYopsIdSesion: _idSesion });
        //this.setState({graciasYopsIdTutor:_idTutor});
        let _arrAlumno = [];
        for (let element of _idAlumno) {
            _arrAlumno.push(element.ID_ALUMNO.toString());
        }
        //_arrAlumno.push(_idAlumno.toString());
        this.setState({ graciasYopsIdAlumno: _arrAlumno });
        this.setState({ open: true });
        ////console.log("AFTER sesion: ", this.state.graciasYopsIdSesion);
    }

    //de boton Reprogramar

    handleOnClickPosponer(e, _idSesion, _idAlumno, _idProctuto, _duracion) {

        //console.log("<<Iniciales");
        //console.log("<<Hini=>", this.state.horaIniR);
        //console.log("<<Hfin=>", this.state.horaFinR);
        //console.log("<<CT=>", this.state.yopsRazon_Rep);


        ////console.log("holiss");
        this.setState({ graciasYopsIdSesionR: _idSesion });
        this.setState({ graciasYopsIdProcesoTuto: _idProctuto });
        this.setState({ duraSesion: _duracion });
        let _arrAlumno = [];
        for (let element of _idAlumno) { //_isAlumno es un array
            _arrAlumno.push(element.ID_ALUMNO.toString());
        }
        //_arrAlumno.push(_idAlumno);
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
        //window.location.replace(this.props.location.pathname);
    }

    handleOnCloseCitaCancelada_Rep() {
        //Darle ok o Aceptar al dialogo de "Se registro staisfactoriamente la cancelacion"
        this.setState({ open4: false });
        this.setState({ open2: false });
        //window.location.replace(this.props.location.pathname);
    }

    handleOnChangeCT = (e) => {
        // nombre y descripcion   
        ////console.log("XXXXXXXXX RAZON ",e.value);

        //this.setState({ [e.name]: e.value });
        //this.setState({ yopsRazon: e.value });

        //aca valido
        if (e.target.value.length === 0) {
            this.setState({ mensajeError: "¡ Debe ingresar un motivo !", esInvalido: true });
        } else {
            this.setState({ mensajeError: "", esInvalido: false });
        }
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ yopsRazon: e.target.value });
    }


    handleOnChangeCT_Rep = (e) => {
        ////console.log("XXXXXXXXX RAZON ",e.value);
        //>>> con CampoDeTexto jin
        //this.setState({ [e.name]: e.value });
        //this.setState({ yopsRazon_Rep: e.value });

        //>>> con TextField
        //aca valido descripcion y tmb me valgo para validar la hora
        if (e.target.value.length === 0) {
            this.setState({ mensajeErrorR: "¡ Debe ingresar un motivo de reprogramación!", esInvalidoR: true });
            this.setState({ esInvalRTotal: true });

        }
        if (e.target.value.length !== 0 && this.state.horaFinR === "") {
            this.setState({ mensajeErrorR: "¡ Debe ingresar la hora inicial !", esInvalidoR: true });
            this.setState({ dataMotivo: ""});

            this.setState({ esInvalRTotal: true });
        }

        // if (e.target.value.length !== 0 && this.state.horaIniR === ":00") {
        //     this.setState({ mensajeErrorR: "¡ Debe ingresar la hora inicial !", esInvalidoR: true });
        //     this.setState({ esInvalRTotal: true });

        // }
        if (e.target.value.length !== 0 && this.state.horaFinR!=="") {
            this.setState({ mensajeErrorR: "", esInvalidoR: false });
            this.setState({ esInvalRTotal: false });

        }
        //console.log("<<e.target.value=>", e.target.value);
        //console.log("<<horaIniR=>", this.state.horaIniR);
        //console.log("<<horaFinR=>", this.state.horaFinR);

        this.setState({ [e.target.name]: e.target.value });
        this.setState({ yopsRazon_Rep: e.target.value });

        // if (this.cumpleValidaciones()){
        //     this.setState({esInvalRTotal:false});
        // }
    }

    validarEntradaCT_Rep(error) {
        //insert code here of validacion of el campeishion
    }

    validarEntradaCT(error) {
        /* ..jinValidar copiar si querer usar    */
    }

    async handleOnclickAceptarCancelacion() {
        ////console.log("STATE ", this.state.graciasYopsIdSesion);
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

        //console.log("ANTES DE API: ", nuevaSolicitud);
        const props = { servicio: "/api/cancelarCita", request: nuevaSolicitud };
        let sesionTyS = await Controller.POST(props);
        if (!sesionTyS) return;
        //console.log("RESULTADO API Cancelar ", sesionTyS);

        //this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});  
        // if (sesionTyS) {
        //     this.setState({ mensajillo: "Cita Cancelada Satisfactoriamente!" });
        // } else {
        //     this.setState({ mensajillo: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
        // }
        if (!sesionTyS.message) {
            if (!sesionTyS.error) {
                this.setState({ mensajillo: "¡ Cita Cancelada Satisfactoriamente !" });
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


    async componentDidUpdate(prevProps, prevState) {

        if (prevState.actuTys != this.state.actuTys) {
            let arregloDeSesiones =
                await Controller.GET({ servicio: "/api/listaSesiones/" + getUser().usuario.ID_USUARIO });

            ////console.log("arreglo: ", arregloDeSesiones);
            let arreglillo = [];
            let cont = 0;
            let fechaHoy = moment(new Date()).format("YYYY-MM-DD");
            let fechaSesion;

            for (let element of arregloDeSesiones.data) {
                cont++;
                fechaSesion = await moment(element.FECHA).format("YYYY-MM-DD");
                let estadillo = fechaHoy > fechaSesion ? "PR" : element.ESTADO.split("-")[0];

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
                    lugar: element.LUGAR,
                    campoMotivoSoli: element.PROCESO_TUTORIum.GRUPAL ? "Grupal" : element.MOTIVO,
                    campoDescMotivo: element.PROCESO_TUTORIum.GRUPAL ? "Grupal" : element.DESCRIPCION,
                    tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,
                    btnCancelar:
                        <Button
                            size="large"
                            variant="outlined"
                            color="secondary"
                            onClick={e => this.handleOnClickCancelar(e, element.ID_SESION, element.ALUMNOs)}
                        >
                            CANCELAR
                    </Button>,
                    campoEstado: estadillo === "PR" ? "Pendiente Registro" :
                        estadillo === "04" ? "Pendiente" :
                            estadillo === "03" ? "Reprogramada" :
                                estadillo === "02" ? "Cancelada" :
                                    "Realizada",

                    btnPosponer:
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={e => this.handleOnClickPosponer(e, element.ID_SESION, element.ALUMNOs, element.ID_PROCESO_TUTORIA, element.PROCESO_TUTORIum.DURACION)}
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
                    {
                        title: "Tipo Tutoria",
                        field: "tipoTutoria"
                    },
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
    }


    cumpleValidaciones() {
        //console.log("<<esinval", this.state.esInvalidoR);
        //console.log("<<hIniR", this.state.esInvalidoR);
        if (this.state.esInvalidoR == false && this.state.horaIniR !== "") return true;
        return false;
    }

    async handleOnclickAceptarReprogramacion() {

        //if (this.cumpleValidaciones()) {

        //console.log("cumple vals");
        this.setState({ esInvalRTotal: false });
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


        //console.log("ANTES DE API arreglo Rep nueva soli: ", nuevaSolicitud);

        const props = { servicio: "/api/posponerCita", request: nuevaSolicitud };
        let sesionTyS = await Controller.POST(props);
        if (!sesionTyS) return;

        //console.log("RESULTADO API rep ", sesionTyS);

        if (!sesionTyS.message) {
            if (!sesionTyS.error) {
                this.setState({ mensajilloR: "¡ Cita Reprogramada Satisfactoriamente !" });
                this.setState({ actuTys: !this.state.actuTys });

            } else {
                this.setState({ mensajilloR: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
            }
        }
        else {
            this.setState({ mensajilloR: sesionTyS.message });
        }

        this.setState({ open4: true });


        // } else {
        //     //console.log("No cumple validaciiones Rep<<");
        // }

    }


    async componentDidMount() {
        let arregloDeSesiones =
            await Controller.GET({ servicio: "/api/listaSesiones/" + getUser().usuario.ID_USUARIO });

        if (!arregloDeSesiones) return;

        ////console.log("arreglo: ", arregloDeSesiones);
        let arreglillo = [];
        let cont = 0;
        let fechaHoy = moment(new Date()).format("YYYY-MM-DD");
        let fechaSesion;

        for (let element of arregloDeSesiones.data) {
            cont++;
            fechaSesion = await moment(element.FECHA).format("YYYY-MM-DD");
            if (!fechaSesion) return;
            let estadillo = fechaHoy > fechaSesion ? "PR" : element.ESTADO.split("-")[0];

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
                lugar: element.LUGAR,
                campoMotivoSoli: element.PROCESO_TUTORIum.GRUPAL ? "Grupal" : element.MOTIVO,
                campoDescMotivo: element.PROCESO_TUTORIum.GRUPAL ? "Grupal" : element.DESCRIPCION,
                tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,
                btnCancelar:
                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={e => this.handleOnClickCancelar(e, element.ID_SESION, element.ALUMNOs)}
                    >
                        CANCELAR
                    </Button>,
                campoEstado: estadillo === "PR" ? "Pendiente Registro" :
                    estadillo === "04" ? "Pendiente" :
                        estadillo === "03" ? "Reprogramada" :
                            estadillo === "02" ? "Cancelada" :
                                "Realizada",

                btnPosponer:
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={e => this.handleOnClickPosponer(e, element.ID_SESION, element.ALUMNOs, element.ID_PROCESO_TUTORIA, element.PROCESO_TUTORIum.DURACION)}
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
                {
                    title: "Tipo Tutoria",
                    field: "tipoTutoria"
                },
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
                {this.state.open5 &&
                    <ModificaAsignaciones
                        open={this.handleOnOpenVer}
                        close={this.handleOnCloseVer}
                        alumnos={this.state.arrAlumnoVer} />
                }

                {/********************** CANCELAR ******************************/}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnCloseCancelar}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">
                        {<h3> ¿ Está seguro de cancelar esta cita ? </h3>}</DialogTitle>
                    <DialogContent>
                        <Paper elevation={0} >
                            {/* <CampoDeTexto
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
                            /> */}
                            <TextField
                                required={true}
                                autoFocus={true}
                                fullWidth
                                name="Motivo"
                                label="Ingrese Motivo de Cancelación"
                                onChange={this.handleOnChangeCT}

                                variant={"outlined"}
                                rows={10}
                                multiline={true}
                            //value={this.state.Motivo}
                            />
                            <FormHelperText error>{this.state.mensajeError}</FormHelperText>

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
                            disabled={this.state.esInvalido}
                            onClick={this.handleOnclickAceptarCancelacion}                        >
                            Sí
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
                        {<h3> ¿ Está seguro de reprogramar esta cita ? </h3>}</DialogTitle>
                    <Grid item md={12} xs={12}>
                        <h3>{`  => Esta sesión de tutoria dura : ${this.state.duraSesion} minutos`}</h3>
                    </Grid>
                    <DialogContent>
                        <Grid container spacing={2} >
                            <Grid item md={4}>
                                <TextField
                                    required
                                    margin="dense"
                                    type="date"
                                    id="Fecha"
                                    label="Nueva Fecha"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.handleOnChangeFecha(e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4} >
                                <TextField
                                    value={this.state.horaIniR}
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
                                    value={this.state.horaFinR}
                                    disabled={true}
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
                            {/* <CampoDeTexto
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
                            /> */}
                            <TextField
                                required={true}
                                autoFocus={true}
                                fullWidth
                                name="dataMotivo"
                                label="Ingrese razón  de Reprogramación de la Cita"
                                variant={"outlined"}
                                rows={10}
                                multiline={true}
                                onChange={this.handleOnChangeCT_Rep}
                                value={this.state.dataMotivo}
                            />
                            <FormHelperText error>{this.state.mensajeErrorR}</FormHelperText>
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
                            disabled={this.state.esInvalRTotal}
                            onClick={this.handleOnclickAceptarReprogramacion}                        >
                            Sí
                        </Button>
                    </DialogActions>
                </Dialog>





                <TabProceso procesos={[
                    {
                        index: 0, titulo: "Pendientes", //Pendientes y realizadas
                        proceso: () => < TablaTutoresMisCitas_Tutor sesiones={this.state.sesiones} estado={"PyR"} />
                    },
                    { index: 1, titulo: "Realizadas", proceso: () => < FrmMisCitasPasadas_Tutor /> },
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
