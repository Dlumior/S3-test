import React, { useState,Component } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmAsignacionTutor from "../../components/Coordinador/FormAsignacion/FrmAsignacionTutor";
import FrmHistorialAsignacion from "../../components/Coordinador/FormAsignacion/FrmHistorialAsignacion";

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
            procesos: [
                { index:0,titulo: "Registro", proceso:FrmAsignacionTutor },
                { index:1,titulo: "Historial", proceso:FrmHistorialAsignacion }
              ],
        };
    };


    render() {
        return (
            <div>
                <NombrePrincipal titulo="Asignación de Tutor" />
                <TabProceso  procesos={this.state.procesos} />
            </div>
        );
    }
}
export default AsignarTutor;