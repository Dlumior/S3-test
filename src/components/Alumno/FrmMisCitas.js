import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import { Paper, Tabs, Tab, Button, Grid, Dialog, DialogTitle } from "@material-ui/core";
import TablaTutoresMisCitas from "./TablaTutoresMisCitas.js";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { getUser } from "../../Sesion/Sesion";
import TabProceso from "../Coordinador/Tutorias/TabProceso.js"
import CampoDeTexto from "../Coordinador/Tutorias/CampoDeTexto";

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

            open3:false,
            mensajillo:"",
            graciasYops:0,
            yopsRazon:"",


        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);

        this.handleOnCloseCitaCancelada = this.handleOnCloseCitaCancelada.bind(this);
        this.handleOnclickAceptarCancelacion = this.handleOnclickAceptarCancelacion.bind(this);

        //this.handleOnClickPosponer = this.handleOnClickPosponer.bind(this);
        //this.handleOnClosePosponer = this.handleOnClosePosponer.bind(this);
    };


    //de btn cancelar
    handleOnClick(e,_idSesion) {
        console.log("TARGET DEL E ",_idSesion);
        this.setState({graciasYops:_idSesion});
        this.setState({ open: true });

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
        this.setState({open:false});
    }

    async handleOnclickAceptarCancelacion() {
        //console.log("ctm",this.state.open);
        //this.setState({ open: false });

        let yo = getUser();
        let _razon = "";
         const nuevaSolicitud = {
             sesion: {
                 ID_SESION:this.state.graciasYops,
                 ALUMNOS: [yo.usuario.ID_USUARIO],
                 RAZON: this.state.yopsRazon,
             },
         };

         const props = { servicio: "/api/cancelarCita", request: nuevaSolicitud };
         let sesionTyS = await Controller.POST(props);
         //console.log("YOOOPSSS tYS XXX ",sesionTyS);

        //DOING...
        //this.setState({mensajillo:"SESIÓN REGISTRADA SASTISFACTORIAMENTE !"});  
        if(sesionTyS){
            this.setState({mensajillo:"CITA CANCELADA SASTISFACTORIAMENTE !"});  
        }else{
            this.setState({mensajillo:"UPS, ERROR INESPERADO!    POR FAVOR, INTÉNTELO MÁS TARDE"});  
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

        this.setState({open3:true });
    }

    handleOnChangeCT = (e) => {
        // nombre y descripcion   
        //console.log("XXXXXXXXX RAZON ",e.value);
        this.setState({ [e.name]: e.value });
        this.setState({yopsRazon:e.value});

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
        for (let element of arregloDeSesiones.data) {
            cont++;
            //fex= max-(cont+1);
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
                        onClick={e=>this.handleOnClick(e,element.ID_SESION)}
                    >
                        CANCELAR
                    </Button>,
                campoEstado: estadillo === "04" ? "Pendiente" : (estadillo === "03" ? "Reprogramada" : (estadillo === "02" ? "Cancelada" : "Realizada")),
                campoEncuesta: "rico p", /*<<<<AQUÍ ENTRAS TÚ BBITA xD */
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
                    title: "TUTOR",
                    field: "nombre",
                },
                {
                    title: "FECHA / HORA",
                    field: "fecha"
                },
                {
                    title: "LUGAR",
                    field: "lugar"
                },
                {
                    title: "TIPO TUTORIA",
                    field: "tipoTutoria"
                },
                {
                    title: "CANCELAR CITA",
                    field: "btnCancelar"
                },
                /*
                {
                    title: "ESTADO",
                    field: "campoEstado"
                },
                */
                {
                    title: "ENCUESTA",
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
                            onClick={this.handleOnClose}                        >
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
                        index: 0, titulo: "Pendientes",
                        proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"Pendiente"} />
                    },
                    { index: 1, titulo: "Reprogramadas", proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"Reprogramada"} /> },
                    { index: 2, titulo: "Realizadas", proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"Realizada"} /> },
                    { index: 3, titulo: "Canceladas", proceso: () => < TablaTutoresMisCitas sesiones={this.state.sesiones} estado={"Cancelada"} /> },

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

export default FrmMisCitas;

const estilo = {
    imagen: {
        width: "30%",
        borderRadius: "100%",
    }
}
