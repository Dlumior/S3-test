import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import { Paper, Tabs, Tab, Button, Grid, Dialog } from "@material-ui/core";
import TablaTutores from "./TablaTutores.js";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FrmDialogoSolicitarTutor from "./FrmDialogoSolicitarTutor";

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


class FrmSolicitarCitaTutor_granito extends Component {
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
            openVerDispo: false,

        };

        this.handleOnClickVerDispo = this.handleOnClickVerDispo.bind(this);
        this.handleOnCloseVerDispo = this.handleOnCloseVerDispo.bind(this);
    };


 

    //=============================================================
    handleOnClickVerDispo() {
        this.setState( {openVerDispo : true});
    }

    handleOnCloseVerDispo() {
        //console.log("ctm",this.state.openSolicitarTutor);
        this.setState( {openVerDispo : false});
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
                imagen: <div>
                <img
                    style={estilo.imagen}
                    src="https://files.pucp.education/profesor/img-docentes/tupia-anticona-manuel-francisco-19931850.jpg">
                </img>
                </div>,
                //numeroOrden: cont,
                nombre: element.USUARIO.NOMBRE + " " + element.USUARIO.APELLIDOS,
                correo: element.USUARIO.CORREO,
                /*rboton: <div>
                    <input
                        type="radio"
                        id="age1"
                        name="tutor"
                        value={element.ID_TUTOR}>
                    </input>
                </div>,*/
                btnVerDisponibilidad:
                <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    onClick={this.handleOnClickVerDispo}
                >
                    Ver Disponibilidad
                </Button>,
            });
        }

        /*arregloDeTutores.forEach(element => {
            arreglillo.push({nombre:element.USUARIO.NOMBRE+" "+element.USUARIO.APELLIDOS,
                            correo:element.USUARIO.CORREO});       

        }); */

        const data = {
            columns: [
                {
                    title: "",
                    field: "imagen",
                },
                {
                    title: "TUTOR",
                    field: "nombre",
                },
                {
                    title: "Correo Electrónico",
                    field: "correo"
                },
                /*
                {
                    title: "",
                    field: "rboton"
                },
                */
                {
                title: "",
                field: "btnVerDisponibilidad",
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
        //console.log("propsFormTipoII:", this.props);
  
        return (
            <div>                
                <Paper elevation={0} style={style.paper}>                    
                    {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                    <TablaTutores tutores={this.state.tutores} />    
                </Paper>
                
                <Dialog
                    open={this.state.openVerDispo}
                    onClose={this.handleOnCloseVerDispo}
                    aria-labelledby="form-dialog-title"
                >                  
                    <DialogContent>                     
                        <FrmDialogoSolicitarTutor/> 
                    </DialogContent>
           
                    <DialogActions>
                        <Button                            
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnCloseVerDispo}                        >
                            Solicitar Cita
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FrmSolicitarCitaTutor_granito;

const estilo = {
    imagen: {
        width: "45%",
        borderRadius: "100%",
    }
}
















