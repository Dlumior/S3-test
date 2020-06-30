import React, { Component } from "react";
import { Paper, Tabs, Tab, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";
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
            open3: false,
            mensajillo: "",
            graciasYopsIdSesion: 0,
            graciasYopsIdAlumno: [],
            yopsRazon: "",

        };


        this.handleOnClickCancelar = this.handleOnClickCancelar.bind(this);
        this.handleOnCloseCancelar = this.handleOnCloseCancelar.bind(this);
        this.handleOnCloseCitaCancelada = this.handleOnCloseCitaCancelada.bind(this);
        this.handleOnClickPosponer = this.handleOnClickPosponer.bind(this);

        this.handleOnCloseCitaCancelada = this.handleOnCloseCitaCancelada.bind(this);
        this.handleOnclickAceptarCancelacion = this.handleOnclickAceptarCancelacion.bind(this);


    };


    //de btn cancelar
    handleOnClickCancelar(e, _idSesion, _idAlumno) {
        console.log("TARGET DEL E idSesion/idAlumno", _idSesion, _idAlumno);
        this.setState({ graciasYopsIdSesion: _idSesion });

        //this.setState({graciasYopsIdTutor:_idTutor});
        let _arrAlumno = [];
        _arrAlumno.push(_idAlumno);

        this.setState({ graciasYopsIdAlumno: _arrAlumno });
        this.setState({ open: true });

        console.log("AFTER sesion: ", this.state.graciasYopsIdSesion);

    }

    handleOnClickPosponer() {
        console.log("holiss");

    }


    handleOnCloseCancelar() {
        //console.log("ctm",this.state.open);
        this.setState({ open: false });
    }




    handleOnCloseCitaCancelada() {
        //Darle ok o Aceptar al dialogo de "Se registro staisfactoriamente la cancelacion"
        this.setState({ open3: false });
        this.setState({ open: false });
        window.location.replace(this.props.location.pathname);
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



    async handleOnclickAceptarCancelacion() {
        //console.log("ctm",this.state.open);
        //this.setState({ open: false });


        console.log("STATE ", this.state.graciasYopsIdSesion);

        let yo = getUser();
        let _razon = "";
        const nuevaSolicitud = {
            sesion: {
                ID_SESION: this.state.graciasYopsIdSesion,
                ALUMNOS: this.state.graciasYopsIdAlumno, //este es un arreglo de uno
                RAZON: this.state.yopsRazon,
                EMISOR: yo.usuario.ID_USUARIO.toString(),
                RECEPTOR: this.state.graciasYopsIdAlumno, //este es un arreglo de uno
            },
        };




        console.log("ANTES DE API: ", nuevaSolicitud);

        const props = { servicio: "/api/cancelarCita", request: nuevaSolicitud };
        let sesionTyS = await Controller.POST(props);
        console.log("RESULTADO API ", sesionTyS);

        //DOING...
        //this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});  

        if (sesionTyS) {
            this.setState({ mensajillo: "Cita Cancelada Satisfactoriamente!" });
        } else {
            this.setState({ mensajillo: "Ups, Error inesperado... Por favor, inténtelo más tarde." });
        }

        //  if(!sesionTyS.message){
        //      if(!sesionTyS.error){
        //          this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});    
        //      }else{
        //          this.setState({mensajillo:"UPS, ERROR INESPERADO!    POR FAVOR, INTÉNTELO MÁS TARDE"});   
        //      }
        //  }
        //  else{
        //      this.setState({mensajillo:sesionTyS.message});
        //  }

        this.setState({ open3: true });
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
                nombre: element.ALUMNOs[0].USUARIO.NOMBRE ? element.ALUMNOs[0].USUARIO.NOMBRE + " " + element.ALUMNOs[0].USUARIO.APELLIDOS : "",

                fecha: element.FECHA + " / " + element.HORA_INICIO + " - " + element.HORA_FIN,
                lugar: element.LUGAR,
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
                campoEstado: estadillo === "04" ? "Pendiente" :
                             estadillo === "03" ? "Reprogramada" :
                             estadillo === "02" ? "Cancelada" :
                                                  "Realizada",

                btnPosponer:
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={this.handleOnClickPosponer}
                    >
                        REPROGRAMAR
                    </Button>,

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
                        {<h3> ¿ Está seguro de CANCELAR esta cita ? </h3>}</DialogTitle>

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

                <TabProceso procesos={[
                    {
                        index: 0, titulo: "Futuras", //Pendientes y realizadas
                        proceso: () => < TablaTutoresMisCitas_Tutor sesiones={this.state.sesiones} estado={"PyR"} />
                    },
                    { index: 1, titulo: "Realizadas", proceso: () => { "" } },
                    { index: 2, titulo: "Canceladas", proceso: () => < TablaTutoresMisCitas_Tutor sesiones={this.state.sesiones} estado={"Cancelada"} /> },

                ]} paper={true} />

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


            </div>
        );
    }
}


export default compose(withRouter)(FrmMisCitas_Tutor);
