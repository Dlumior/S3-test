import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import { Paper, Tabs, Tab, Button, Grid, Dialog } from "@material-ui/core";
import TablaTutores from "./TablaTutores.js";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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


class FrmSolicitarTutorTipoII extends Component {
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

        };

        {/* 
        this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        */}
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
    };


    handleOnClick() {
        this.setState( {open : true});
    }

    handleOnClose() {
        console.log("ctm",this.state.open);
        this.setState( {open : false});
    }

    async componentDidMount() {
        let arregloDeTutores = await Controller.GET({ servicio: "/api/tutor" });
        /**if arreglo ttores hago lo q esta sino le meto s harcodeo */
        console.log("arreglo: ", arregloDeTutores);

        let arreglillo = [];
        let cont = 0;
        for (let element of arregloDeTutores.tutores) {
            cont++;
            arreglillo.push({
                numeroOrden: cont,
                nombre: element.USUARIO.NOMBRE + " " + element.USUARIO.APELLIDOS,
                correo: element.USUARIO.CORREO,
                /*rboton:<Radio value={element.ID_TUTOR}
                              color="primary"
                              checkedIcon={true} />}*/
                rboton: <div>
                    <input
                        type="radio"
                        id="age1"
                        name="tutor"
                        value={element.ID_TUTOR}>
                    </input>
                </div>,
                imagen: <div>
                    <img
                        style={estilo.imagen}
                        src="https://pps.whatsapp.net/v/t61.24694-24/98003721_693453491457223_8818237039614975326_n.jpg?oe=5ED1A659&oh=58b150c6ad46eaa6df8b3a83a6b0a283">

                    </img>
                </div>
            });
        }

        /*arregloDeTutores.forEach(element => {
            arreglillo.push({nombre:element.USUARIO.NOMBRE+" "+element.USUARIO.APELLIDOS,
                            correo:element.USUARIO.CORREO});       

        }); */

        const data = {
            columns: [
                {
                    title: "N°",
                    field: "numeroOrden"
                },
                {
                    title: "Nombre",
                    field: "nombre",
                },
                {
                    title: "Correo Electrónico",
                    field: "correo"
                },
                {
                    title: "",
                    field: "rboton"
                },
                {
                    title: "Imagen",
                    field: "imagen",
                },
                /*  {},{},{}.... para mas columnas  */
            ],
            data: arreglillo
            /*
            [       
              { nombre: "Alva Nuñez",correo :"ing informatica" },
              { nombre: "Pedro Arce" ,correo :"ing informatica2"},
              { nombre: "Alfredo Gomez",correo :"ing informatica3" },
              { nombre: "Bill Grace",correo :"ing informatica4" },
              { nombre: "Camilo Echeverry" ,correo :"ing informatica5"},
            ],*/

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
                                Espere a que el tutor acepte su solicitud.  Por favor, revise su bandeja.
                            </Paper>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button                            
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnClose}                        >
                            ACEPTAR
                        </Button>
                    </DialogActions>
                </Dialog>

                <Paper elevation={0} style={style.paper}>
                    <Tabs
                        centered
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        //onChange={this.handleTabOnChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Tutores" />

                    </Tabs>
                    {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                    <TablaTutores tutores={this.state.tutores} />
                    <Grid container spacing={6}>
                        <Grid item >
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnClick}
                        >
                            AGENDAR CITA
                        </Button>
                        </Grid>
                    </Grid>

                </Paper>

            </div>
        );
    }
}

export default FrmSolicitarTutorTipoII;

const estilo = {
    imagen: {
        width: "25%"
    }
}
















