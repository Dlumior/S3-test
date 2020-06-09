import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";

import { Paper, Tabs, Tab, Button, Grid, Dialog } from "@material-ui/core";
import TablaTutores from "./TablaTutores.js";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogTitle from "@material-ui/core/DialogTitle";

const style = {
    paper: {
        marginTop: "3%",
        marginLeft: "3%",
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
            tutores: {
                columns: [{
                    title: "Nombre",
                    field: "nombre",
                }],
                data: [{ nombre: "" }]
            }, //aqui va el nombre de la tablilla
            open: false,
            open2:false,

        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnClickPosponer = this.handleOnClickPosponer.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnClosePosponer = this.handleOnClosePosponer.bind(this);
    };

    handleOnClickPosponer() {
        this.setState({ open2: true });
    }
    handleOnClosePosponer() {
        //console.log("ctm",this.state.open);
        this.setState({ open2: false });
    }

    //de cancelar
    handleOnClick() {
        this.setState({ open: true });
    }

    handleOnClose() {
        //console.log("ctm",this.state.open);
        this.setState({ open: false });
    }

    async componentDidMount() {
        let arregloDeTutores = await Controller.GET({ servicio: "/api/tutor" });
        /**if arreglo ttores hago lo q esta sino le meto s harcodeo */
        console.log("arreglo: ", arregloDeTutores);

        let arreglillo = [];
        let cont = 0;
        let max=29;
        let fex=0;
        let letras =['I','II'];
        for (let element of arregloDeTutores.tutores) {
            cont++;
            fex= max-(cont+1);
            arreglillo.push({
                imagen: <div>
                    <img
                        style={estilo.imagen}
                        src="https://pps.whatsapp.net/v/t61.24694-24/85530587_916267998890014_8807625453394128069_n.jpg?oe=5EE0423A&oh=2151884f16df676da1f07d40d392a3c4">

                    </img>
                </div>,
                nombre: element.USUARIO.NOMBRE + " " + element.USUARIO.APELLIDOS,
                fecha: fex + " " + "de Mayo del 2020",
                tipoTutoria: "Regular Tipo "+ letras[Math.floor(Math.random()*letras.length)],
                btnCancelar:
                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={this.handleOnClick}
                    >
                        CANCELAR
                    </Button>,
                btnPosponer:
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={this.handleOnClickPosponer}
                    >
                        POSPONER
                    </Button>,

            });
        }

        const data = {
            columns: [
                {
                    title: "",
                    field: "imagen"
                },
                {
                    title: "TUTOR",
                    field: "nombre",
                },
                {
                    title: "FECHA",
                    field: "fecha"
                },
                {
                    title: "TIPO TUTORIA",
                    field: "tipoTutoria"
                },
                {
                    title: "CANCELAR CITA",
                    field: "btnCancelar"
                },
                {
                    title: "POSPONER CITA",
                    field: "btnPosponer",
                },
                /*  {},{},{}.... para mas columnas  */
            ],
            data: arreglillo


        };

        this.setState({ tutores: data });

    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <Grid container xs={12}>
                            <Paper style={style.paper}>
                                ¿Está seguro de cancelar esta cita?
                            </Paper>
                        </Grid>
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
                            onClick={this.handleOnClose}                        >
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Paper elevation={0} style={style.paper}>
                    {
                    /* por aora no es necesario que el formulario tenga su propio tab ya que el comp. padre te lo dara tranqui xd
                    <Tabs
                        centered
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        //onChange={this.handleTabOnChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="" />

                    </Tabs>*/}
                    {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                    <TablaTutores tutores={this.state.tutores} />

                </Paper>

                <Dialog
                    open={this.state.open2}
                    onClose={this.handleOnClosePosponer}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <Grid container xs={12}>
                            <Paper style={style.paper}>
                                Horarios Disponibles ... <br></br> Martes 1 : 11AM - 12 PM
                            </Paper>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            size="large"
                            variant="outlined"
                            color="primary"
                            onClick={this.handleOnClosePosponer}                        >
                            Enviar Solicitud de Postergación
                        </Button>
                        
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FrmMisCitas;

const estilo = {
    imagen: {
        width: "45%",
        "border-radius": "100%",
    }
}
