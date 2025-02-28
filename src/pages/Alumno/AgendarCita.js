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
import ListaComboBox from "../../components/Coordinador/Tutorias/ListaComboBox";
import NombrePrincipal_Alumno from "./NombrePrincipal_Alumno.jsx";

class AgendarCita extends Component {
  constructor() {
    super();

    this.state = {
      programa: undefined,
      procesos: [
        //regularTipo1: [0] <- (Tutor Individual - VARIABLE - Solicitado)
        {
          titulo: "Solicite una cita según las disponibilidades",
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
    this.obtenerPrograma = this.obtenerPrograma.bind(this);
    this.handleOnChangeProceso = this.handleOnChangeProceso.bind(this);
  }

  handleOnChangeProceso(proceso) {
    // //console.log("proceso seleccionado: ", proceso);
    // //aqui se o mando al componente padre
    // if (this.props.filtroProceso) {
    //   this.props.handleFiltroProceso(proceso[0]);
    // }
  }

  obtenerPrograma(_programa) {
    //console.log("xd", _programa);
    this.setState({ programa: _programa });
  }

  async renderxTipoProceso(idPrograma) {
    //console.log("XDD,", idPrograma);
    return (
      <div>
        <TabProceso
          procesos={[
            {
              index: 0,
              titulo: "",

              proceso: () =>
                idPrograma ? (
                  <CalendarioCitas
                    servicio={
                      "/api/disponibilidad/listarPrograma/" +
                      idPrograma +
                      //yo.usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA +
                      "/"
                    }
                    tipo="disponibilidad"
                    programa={idPrograma}
                  />
                ) : (
                  <></>
                ),
            },
          ]}
          paper={false}
        />
      </div>
    );
  }
  render() {
    //console.log("AGENDAR_CITA XXXXXXXX", this.props);

    return (
      <>
        <NombrePrincipal_Alumno
          titulo={this.state.procesos[0].titulo}
          usuario={getUser().usuario}
          obtenerPrograma={this.obtenerPrograma}
        />
        

        {this.state.programa ? 
          <TabProceso
            procesos={[
              {
                index: 0,
                titulo: "",
                proceso: () =>
                    <CalendarioCitas
                      servicio={
                        "/api/disponibilidad/listarPrograma/" +
                        this.state.programa +
                        //yo.usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA +
                        "/"
                      }
                      tipo="disponibilidad"
                      programa={this.state.programa}
                    />
              },
            ]}
            paper={false}
          />
         : 
          <></>
        }
      </>
    );
  }
}
export default compose(withRouter)(AgendarCita);
