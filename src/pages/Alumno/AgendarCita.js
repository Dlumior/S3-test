import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSolicitarTutorTipoII from "../../components/Alumno/FrmSolicitarTutorTipoII.js";


const titulo = "Escoja un tutor para agendar una cita ";


/*
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));
const classes = useStyles();
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
*/


class AgendarCita extends Component {
    constructor() {
        super();
        this.state = {

        };

        /* 
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

                 async handleOnClick(e) {

            //mostrar warning

        }
        this.handleOnClick = this.handleOnClick.bind(this);
        */

    };


    render() {
        return (
            <div>
                <NombrePrincipal titulo={titulo} />
                {/*Aca habria una especia de if para ver que formulario abrir
                de acuerdo al tipo de tutoria 
                <FormSolicitarTuror tipo = idTipo... +o->
                */}

                <FrmSolicitarTutorTipoII />
                {/*//Tipo II : tutoria INDIVIDUAL, tutor FIJO y SELECCIONADO */}

            </div>
        );
    }

}
export default AgendarCita;



















