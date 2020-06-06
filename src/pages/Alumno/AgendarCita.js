import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSolicitarTutorTipoII from "../../components/Alumno/FrmSolicitarTutorTipoII.js";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import FormNuevaTutoria from "../../components/Coordinador/Tutorias/FormNuevaTutoria";
import CalendarioCitas from "../../components/Alumno/CalendarioCitas";

class AgendarCita extends Component {
  constructor() {
    super();
    this.state = {
      procesos: [
        //regularTipo1: [0]
        {
          titulo: "Solicitud de Cita",
          procesos: [
            { index: 0, titulo: "Horarios Disponibles", proceso: CalendarioCitas },
            { index: 1, titulo: "Tutores", proceso: FrmSolicitarTutorTipoII },
          ],
        },
        //regularTipo2: [1]
        {
          titulo: "Escoja un tutor para agendar una cita",
          procesos: [
            { index: 0, titulo: "Tutores", proceso: FrmSolicitarTutorTipoII },
          ],
        },
      ],
      
    };
    this.renderxTipoProceso=this.renderxTipoProceso.bind(this);
  }
  renderxTipoProceso() {
    if(this.props.multiProceso){
      //switch(this.props.multiProceso)
      console.log("multiProceso: ", this.props.multiProceso);
    }
    return (
      <div>
        <NombrePrincipal titulo={this.state.procesos[0].titulo} />
        {/*Aca habria una especia de if para ver que formulario abrir
            de acuerdo al tipo de tutoria 
            <FormSolicitarTuror tipo = idTipo... +o->
            */}
        {/** exacto y lo unico que se debe reemlazar seria los procesos que van a los tabs, btw tabbproceso si soporta no mostrar tabs XDDD*/}
        <TabProceso procesos={this.state.procesos[0].procesos} />
        {/*<FrmSolicitarTutorTipoII />*/}
        {/*//Tipo II : tutoria INDIVIDUAL, tutor FIJO y SELECCIONADO */}
      </div>
    );
  }
  render() {
    return this.renderxTipoProceso();
  }
}
export default AgendarCita;
//
