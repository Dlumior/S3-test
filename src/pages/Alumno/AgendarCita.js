import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSolicitarTutorTipoII from "../../components/Alumno/FrmSolicitarTutorTipoII.js";
import FrmSolicitarCitaTutor_granito from "../../components/Alumno/FrmSolicitarCitaTutor_granito.js";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import CalendarioCitas from "../../components/Alumno/AgendarCita/CalendarioCitas";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { UserContext, getUser } from "../../Sesion/Sesion";
import { inicializarSesion } from "../../Sesion/actions/sesionAction";

class AgendarCita extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {
      procesos: [
        //regularTipo1: [0] <- (Tutor Individual - VARIABLE - Solicitado)
        {
          titulo: "Solicite una cita según las disponibilidades disponibles",
          procesos: [
            { index: 0, titulo: "Horarios Disponibles", proceso: CalendarioCitas },
            { index: 1, titulo: "Tutores", proceso: FrmSolicitarCitaTutor_granito },
          ],
        },
        //regularTipo2: [1] <- (Tutor Individual - FIJO - Solicitado)
        {
          titulo: "Escoja un tutor para todo el presente ciclo",
          procesos: [
            //El Frm de abajo debe salir en las primeras semanas de cada ciclo como "Matricula" de Campus Virtual
            //... y luego desaparecer 
            { index: 0, titulo: "Tutores", proceso: FrmSolicitarTutorTipoII },
          ],
        },
      ],
    };
    this.renderxTipoProceso = this.renderxTipoProceso.bind(this);
  }
  
  renderxTipoProceso() {
    if (this.props.multiProceso) {
      //switch(this.props.multiProceso)
      console.log("multiProceso: ", this.props.multiProceso);
    }
    return (      
      <div>        
        {/*Aca habria una especia de if para ver que formulario abrir de acuerdo al tipo de tutoria 
            <FormSolicitarTuror tipo = idTipo... +o->     */}
        {/** exacto y lo unico que se debe reemlazar seria los procesos que van a los tabs,
         *  btw tabbproceso si soporta no mostrar tabs XDDD*/}
        
        <NombrePrincipal titulo={this.state.procesos[0].titulo} />
        <TabProceso procesos={this.state.procesos[0].procesos} paper={false}/>

        {/*<FrmSolicitarTutorTipoII />*/}
        {/*//Tipo II : tutoria INDIVIDUAL, tutor FIJO y SELECCIONADO */}
      </div>
    );
  }
  render() {
  let yo =getUser(); 
  console.log("AGEN CITA> Alguien esta logueado",yo);
  console.log("AGEN CITA> Alguien esta rol",yo.usuario.ROLs[0].DESCRIPCION.toLowerCase());
    return this.renderxTipoProceso();
  }
}
export default compose(withRouter)(AgendarCita);