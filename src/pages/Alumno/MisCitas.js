import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmMisCitas from "../../components/Alumno/FrmMisCitas.js";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";


const titulo = "Mis Citas Agendadas";

class MisCitas extends Component {
    constructor() {
        super();
        this.state = {
            procesos: [
                { index:0,titulo: "", proceso:FrmMisCitas }
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
export default MisCitas;