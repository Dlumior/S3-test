import React, { useState,Component } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSesionesGrupales from "../../components/Tutor/SesionesGrupales/FrmSesionesGrupales"

import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";


/*
const AsignarTutor = () => {
  return (
    <div>
      <NombrePrincipal titulo="Asignación de Tutor" />
      <FrmAsignacionTutor />
    </div>
  );
};
*/

class AsignarTutor extends Component {
    constructor() {
        super();
        this.state = {
            /*
            procesos: [
                { index:0,titulo: "Registro", proceso:FrmAsignacionTutor },
                { index:1,titulo: "Historial", proceso:FrmHistorialAsignacion }
              ],
            */
        };
    };


    render() {
        return (
            <div>
                <NombrePrincipal titulo="Sesiones Grupales" />
                <FrmSesionesGrupales/>
                {/*<TabProceso  procesos={this.state.procesos} />*/}
            </div>
        );
    }
}
export default AsignarTutor;