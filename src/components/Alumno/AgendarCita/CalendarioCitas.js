import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Controles from "./Controles";
import { NdiasMes, mesesAnio } from "./Util.js";
import HorarioDelDia from "./HorarioDelDia";
import FrmSolicitarCitaTutor_granito from "../FrmSolicitarCitaTutor_granito";
import { getUser } from "../../../Sesion/Sesion";

const styles = {
  control: {
    textAlign: "center",
  },
  container: {},
};
class CalendarioCitas extends Component {
  constructor() {
    super();
    this.state = {
      Ndias: 6,
      fechaActual: new Date(),
      lunesActual: "",
      fechaControles: {},
      modoBatallador: true,
      filtroIdProceso: 0,
      listaIdTutores: [],

      estadoTitulo: "",
      estadoID: 0,
    };
    this.saltarEnElTiempo = this.saltarEnElTiempo.bind(this);
    this.handleFiltroProceso = this.handleFiltroProceso.bind(this);
    this.handleFiltroTutores = this.handleFiltroTutores.bind(this);
    this.handleModoBatallador = this.handleModoBatallador.bind(this);
    this.handleFiltroTutor = this.handleFiltroTutor.bind(this);
  }
  /**
   * @param {number} salto es el valor de cambio de fecha y podria ser hacia el pasado o hacia el futuro
   */
  async saltarEnElTiempo(salto) {
    //funcion generica de viaje en el tiempo
    if (!salto) return;
    let lunesActual = new Date(this.state.lunesActual);
    this.setState({
      lunesActual: await new Date(
        lunesActual.setDate(lunesActual.getDate() + salto)
      ),
    });
    console.log("salto actual: ", this.state.lunesActual);
  }
  /**
   *
   * @param {Date} lunesActual el lunes de la semana actual
   */
  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         linea 61 agregar paramtero para la linea 82
        para manejar el filtro del id del tutor en el servicio 
       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    */
  renderDias = (lunesActual, listaIdTutores) => {
    if (!lunesActual) return;
    let fechaInicial = new Date(lunesActual);

    console.log("CAlendarGAAAAbyy xxx ", lunesActual);

    let fechasDias = [];
    for (let i = 0; i < 6; i++) {
      fechasDias.push(new Date(fechaInicial.setDate(fechaInicial.getDate())));
      fechaInicial.setDate(fechaInicial.getDate() + 1);
    }
    return (
      <>
        {console.log("ANTES DIA SEMANA xxx ", fechasDias)}
        <Grid container spacing={2}>
          {fechasDias.map((diaSemana) => (
            <Grid item md={2} xs={12}>
              {console.log(
                "DIA_SEMANA xxx ",
                this.props.servicio +
                this.state.filtroIdProceso +
                "/" +
                diaSemana.toISOString().split("T")[0]
              )}
              {console.log("QQQ: ", this.state.filtroIdProceso)}

              {this.state.filtroIdProceso?
               <HorarioDelDia
               idPro= {this.state.filtroIdProceso}
               fecha={{
                 fecha: diaSemana,
                 //>>>>>>>>>>>>>>>>>> ACA SE ESTA COLGANDO

                 servicio: this.state.estadoID
                   ? `/api/disponibilidad/listarPrograma/${
                   getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0]
                     .ID_PROGRAMA
                   }/${diaSemana.toISOString().split("T")[0]}/${
                   this.state.estadoID
                   }`
                   : this.props.servicio +
                   diaSemana.toISOString().split("T")[0],
                 tipo: this.props.tipo,
                 listaIdTutores: listaIdTutores,

               }}

             />
              :
              <></>}
             
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  async componentDidMount() {
    const fechaActual = this.state.fechaActual;
    let offset = 0;
    const lunes = 1;
    offset = fechaActual.getDay() - lunes;
    this.setState({
      fechaControles: {
        mes: mesesAnio[fechaActual.getMonth() + 1],
        semana: 1,
        fecha: fechaActual,
      },
    });

    console.log("CALENDARIO_CITAS>>> XXXXX ", this.props.servicio);

    this.setState({
      lunesActual: new Date(
        await fechaActual.setDate(fechaActual.getDate() - offset)
      ),
    });
  }
  handleModoBatallador(modoBatallador) {
    this.setState({ modoBatallador: modoBatallador });
  }

  //_tutor : es un objeto con id y nombre
  handleFiltroTutor(_tutor) {
    //console.log("R2D2 ", _tutor);
    this.setState({ estadoTitulo: _tutor.nombre });
    //ahora vamos a seterar id
    this.setState({ estadoID: _tutor.id });
  }

  handleFiltroProceso = async(idProceso)=> {
    console.log("idProceso seleccionado: ", idProceso);
    await this.setState({ filtroIdProceso: idProceso });
    //tenemos q etener un state parael id proceso
    //o manejar el mismo state de los filtros
    //le emtemos lunes actual.....
  }
  handleFiltroTutores = async (listaIdTutores) => {
    console.log("idTutores seleccionado: ", listaIdTutores);

    await this.setState({ listaIdTutores: listaIdTutores });
    //tenemos q etener un state parael id proceso
    //o manejar el mismo state de los filtros
    //le emtemos lunes actual.......
  };
  render() {
    return (
      <div style={styles.container}>
        <Controles
          fecha={this.state.fechaControles}
          saltoEnElTiempo={this.saltarEnElTiempo}
          filtroProceso={true}
          filtroTutores={true}
          handleFiltroProceso={this.handleFiltroProceso}
          handleFiltroTutores={this.handleFiltroTutores}
          tutorNombre={this.state.estadoTitulo}
          modoBatallador={this.handleModoBatallador}
          tipo={this.props.tipo}
          colorActivo={this.state.modoBatallador}
        />

        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            meter lunes actual dentro de otro state llamado filtros
            y tmb agregar el filtro x Id de tutor a ese state
            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         */}

        {this.state.modoBatallador ? (
          <Grid container alignContent="center">
            {this.props.tipo === "cita" ? (
              this.renderDias(this.state.lunesActual, this.state.listaIdTutores)
            ) : this.state.filtroIdProceso ? (
              this.renderDias(this.state.lunesActual, this.state.listaIdTutores)
            ) : (
                  <></>
                )}
          </Grid>
        ) : (
            <FrmSolicitarCitaTutor_granito
              modoBatallador={this.handleModoBatallador}
              handleFiltroTutor={this.handleFiltroTutor}
            />
          )}
      </div>
    );
  }
}

export default CalendarioCitas;
