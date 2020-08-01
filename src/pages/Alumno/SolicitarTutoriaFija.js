import React, { Component } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSolicitarTutorTipoII from "../../components/Alumno/FrmSolicitarTutorTipoII.js";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import CalendarioCitasTutoriaFija from "../../components/Alumno/AgendarCita/CalendarioCitasTutoriaFija";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { UserContext, getUser } from "../../Sesion/Sesion";
import { inicializarSesion } from "../../Sesion/actions/sesionAction";

/*
El presente archivo describe que  debe salir en las primeras semanas 
... de cada ciclo como "Matricula" de Campus Virtual
... y luego desaparecer
*/

class SolicitarTutoriaFija extends Component {
  constructor() {
    super();

    this.state = {
      procesos: [
        {
          titulo: "Escoja un tutor para todo el ciclo según la tutoría fija seleccionada ",
          procesos: [
            {
              index: 0,
              titulo: "Horarios disponibles",

              proceso: () => (
                <CalendarioCitasTutoriaFija
                  servicio={
                    "/api/disponibilidad/listarDia/" +
                    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA
                  }
                  tipo="disponibilidad"
                />
              ),
            },
          ],
        },    
          
      ],
    };
    this.renderxTipoProceso = this.renderxTipoProceso.bind(this);
  }

  renderxTipoProceso(yo) {
    if (this.props.multiProceso) {
      //switch(this.props.multiProceso)
      ////console.log("multiProceso: ", this.props.multiProceso);
    }
    return (
      <div>
        {/*Aca habria una especia de if para ver que formulario abrir de acuerdo al tipo de tutoria 
            <FormSolicitarTuror tipo = idTipo... +o->     */}
        {/** exacto y lo unico que se debe reemlazar seria los procesos que van a los tabs,
         *  btw tabbproceso si soporta no mostrar tabs XDDD*/}

        <NombrePrincipal titulo={this.state.procesos[0].titulo} />
        {/*<TabProceso procesos={this.state.procesos[0].procesos} paper={false}/>*/}

        <TabProceso
          procesos={[
              {index: 0,
              titulo: "",
              proceso: () => (
                <CalendarioCitasTutoriaFija
                  servicio={
                    "/api/disponibilidad/listarPrograma/" +
                    yo.usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA +
                    "/"
                  }
                  tipo="disponibilidad"
                />
              ),
            }
          ]}
          paper={false}
        />
      </div>
    );
  }
  render() {
    ////console.log("AGENDAR_CITA XXXXXXXX", this.props);
    let yo = getUser();
    return this.renderxTipoProceso(yo);
  }
}
export default compose(withRouter)(SolicitarTutoriaFija);
