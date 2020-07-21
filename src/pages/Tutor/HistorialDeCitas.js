import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import FrmMisCitas_Tutor from "../../components/Tutor/FrmMisCitas_Tutor";


const titulo = "Citas de mis Alumnos";

class HistorialDeCitas extends Component {
    constructor() {
        super();
        this.state = {
            procesos: [
                { index:0,titulo: "", proceso:FrmMisCitas_Tutor }
              ],
        };
    };


    render() {
        return (
            <div>
                <NombrePrincipal titulo={titulo} />
                {/*Aca vendria a mostrar las citas de este alumno...   */}
                <TabProceso  procesos={this.state.procesos} />
            </div>
        );
    }
}
export default HistorialDeCitas;