import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import ControlesTutoriaFija from "./ControlesTutoriaFija.js";
import { NdiasMes, mesesAnio } from "./Util.js";
import HorarioDelDiaTutoriaFija from "./HorarioDelDiaTutoriaFija.js";
import FrmSolicitarTutorTipoII from "../FrmSolicitarTutorTipoII";

const styles = {
  control: {
    textAlign: "center",
  },
  container: {
    marginLeft: "2%",
    marginRight: "2%",
  },
};

class CalendarioCitasTutoriaFija extends Component {
  constructor() {
    super();
    this.state = {
      Ndias: 6,
      fechaActual: new Date(),
      lunesActual: "",
      fechaControles: {},
      modoBatallador: false,
      _idProceso:0,

      estadoTitulo:"",
      estadoID:0,
    };
    this.saltarEnElTiempo = this.saltarEnElTiempo.bind(this);
    this.handleFiltroProceso = this.handleFiltroProceso.bind(this);
    this.handleFiltroTutor = this.handleFiltroTutor.bind(this);
    this.handleModoBatallador = this.handleModoBatallador.bind(this);
  }

  //_tutor : es un objeto con id y nombre
   handleFiltroTutor(_tutor){
      console.log("R2D2 ",_tutor);
      this.setState({estadoTitulo:_tutor.nombre});
        //ahora vamos a seterar id
      this.setState({estadoID:_tutor.id});

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



  renderDias = (lunesActual) => {
    if (!lunesActual) return;
    let fechaInicial = new Date(lunesActual);

    console.log("CAlendarGAAAAbyy xxx ",lunesActual);

    let fechasDias = [];
    for (let i = 0; i < 6; i++) {
      fechasDias.push(new Date(fechaInicial.setDate(fechaInicial.getDate())));
      fechaInicial.setDate(fechaInicial.getDate() + 1);
    }
    
    return (
      <>
      {console.log("ANTES DIA SEMANA xxx ",fechasDias)}
        {fechasDias.map((diaSemana) => (
          <Grid item md={2} xs={2}>
            {console.log("DIA_SEMANA xxx ",diaSemana)}
            <HorarioDelDiaTutoriaFija
              fecha={{
                fecha: diaSemana,
                servicio:
                  this.props.servicio + diaSemana.toISOString().split("T")[0],
                tipo: this.props.tipo,
              }}
            />
          </Grid>
        ))}
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



  // >>>>>>>>>>>>>>>> ACA SE DEBE FILTAR SOLO X PROCESOS DE TIPOS DE TUTORES FIJOS <<<<<<<<<<<

  handleFiltroProceso(idProceso){
    console.log("idProceso seleccionado: ", idProceso);

    //tenemos q etener un state parael id proceso
    //o manejar el mismo state de los filtros
    //le emtemos lunes actual.....


    this.setState({_idProceso:idProceso});




  }
  handleFiltroTutores(idTutores){
    console.log("idTutores seleccionado: ", idTutores);
      //tenemos q etener un state parael id proceso
    //o manejar el mismo state de los filtros
    //le emtemos lunes actual.......
  }
  render() {
    return (
      <div style={styles.container}>
        <ControlesTutoriaFija
          fecha={this.state.fechaControles}
          saltoEnElTiempo={this.saltarEnElTiempo}
          filtroProceso={true}
          filtroTutores={true}
          handleFiltroProceso={this.handleFiltroProceso}
          handleFiltroTutores={this.handleFiltroTutores}
          tutorNombre={this.state.estadoTitulo}
          modoBatallador={this.handleModoBatallador}
          tipo= {this.props.tipo}
        />

        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            meter lunes actual dentro de otro state llamado filtros
            y tmb agregar el filtro x Id de tutor a ese state
            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         */}

        {this.state.modoBatallador ? (
          <Grid container spacing={4} alignContent="center">
            {this.renderDias(this.state.lunesActual)}
          </Grid>
        ) : (
          <FrmSolicitarTutorTipoII  
            modoBatallador={this.handleModoBatallador}            
            frmIdProceso={this.state._idProceso} 
            handleFiltroTutor ={this.handleFiltroTutor} />
          //standbyCambiosJin
        )}



      </div>
    );
  }
}

export default CalendarioCitasTutoriaFija;
