import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmMisCitas from "../../components/Alumno/FrmMisCitas.js";


const titulo = "Mis Citas Agendadas";

class MisCitas extends Component {
    constructor() {
        super();
        this.state = {
        };

        /* 
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);    
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        */
    };


    render() {
        return (
            <div>
                <NombrePrincipal titulo={titulo} />
                {/*Aca vendria a mostrar las citas de este alumno...   */}
                <FrmMisCitas /> 

            </div>
        );
    }
}
export default MisCitas;