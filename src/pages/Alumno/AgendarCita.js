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
import NombrePrincipalSSJ from "../../components/Shared/NombrePrincipalSSJ";

class AgendarCita extends Component {
  constructor() {
    super();

    this.state = {
      procesos: [
        //regularTipo1: [0] <- (Tutor Individual - VARIABLE - Solicitado)
        {
          titulo: "Solicite una cita según las disponibilidades disponibles",
          procesos: [
            {
              index: 0,
              titulo: "Horarios Disponibles",

              //AQUI VENDRIA : ..."api/disponibildiad/...."
              //se tendria q dar la disponibildiades de los tutores que pertenecen
              //.. a los tipos de tutoria del programa del alumno
              //..
              //...(cabe resaltar que en la vista habra una especie de combobox
              //.... para que el alumno eliga el tipo de tutoria que quiera ver)

              //proceso: ()=><CalendarioCitas servicio={"/api/disponibilidad/listarDia/" +getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA } tipo="disponibilidad"/> },
              proceso: () => (
                <CalendarioCitas
                  servicio={
                    "/api/disponibilidad/listarDia/" +
                    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA
                  }
                  tipo="disponibilidad"
                />
              ),
            },
            {
              index: 1,
              titulo: "Tutores",
              proceso: FrmSolicitarCitaTutor_granito,
            },
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

  renderxTipoProceso(yo) {
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

        <NombrePrincipalSSJ titulo={this.state.procesos[0].titulo} component={()=><p>Descripcion de la tutoria</p>} />
        {/*<TabProceso procesos={this.state.procesos[0].procesos} paper={false}/>*/}

        <TabProceso
          procesos={[
              {index: 0,
              titulo: "",

              proceso: () => (
                <CalendarioCitas
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
        {/*<FrmSolicitarTutorTipoII />*/}
        {/*//Tipo II : tutoria INDIVIDUAL, tutor FIJO y SELECCIONADO */}
      </div>
    );
  }
  render() {
    console.log("AGENDAR_CITA XXXXXXXX", this.props);
    let yo = getUser();
    console.log("AGENDAR CITA> Alguien esta logueado", yo);
    console.log(
      "AGENDAR CITA> Alguien esta rol",
      yo.usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION.toLowerCase()
    );
    return this.renderxTipoProceso(yo);
  }
}
export default compose(withRouter)(AgendarCita);
