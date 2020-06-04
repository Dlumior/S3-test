import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSolicitarTutorTipoII from "../../components/Alumno/FrmSolicitarTutorTipoII.js";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import FormNuevaTutoria from "../../components/Coordinador/Tutorias/FormNuevaTutoria";

const titulo = "Escoja un tutor para agendar una cita ";
class AgendarCita extends Component {
  constructor() {
    super();
    this.state = {
      titulosTutoria: [, "Escoja un tutor para agendar una cita"],
      procesos: [
        {
          regularTipo1: {
            titulo: "Solicitud de Cita",
            procesos: [
              { index: 0, titulo: "Horarios Disponibles", proceso: FormNuevaTutoria,},
              { index: 1, titulo: "Tutores", proceso: FrmSolicitarTutorTipoII },
            ],
          },
          regularTipo2: {
            titulo: "Escoja un tutor para agendar una cita",
            procesos: [
              { index: 0, titulo: "Tutores", proceso: FrmSolicitarTutorTipoII },
            ],
          },
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <NombrePrincipal titulo={titulo} />
        {/*Aca habria una especia de if para ver que formulario abrir
                de acuerdo al tipo de tutoria 
                <FormSolicitarTuror tipo = idTipo... +o->
                */}
        {/** exacto y lo unico que se debe reemlazar seria los procesos que van */}
        <TabProceso procesos={this.state.procesos.regularTipo2} />
        {/*<FrmSolicitarTutorTipoII />*/}
        {/*//Tipo II : tutoria INDIVIDUAL, tutor FIJO y SELECCIONADO */}
      </div>
    );
  }
}
export default AgendarCita;
