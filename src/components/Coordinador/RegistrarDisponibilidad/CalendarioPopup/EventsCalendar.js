import React, { Component, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialogo from "../../../Tutor/RegistrarDisponibilidad/Dialogo";
import * as Conexion from "../../../../Conexion/Controller";
import { CircularProgress } from "@material-ui/core";
import Alertas from "../../../Coordinador/Alertas";
require("../../../Tutor/RegistrarDisponibilidad/calendario.css");
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

const style = {
  carga: {
    align: "right",
  },
};

class EventsCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutor: this.props.Tutor,
      modalIsOpen: false,
      fecha: "",
      fechaMostrar: "",
      horaInicio: "",
      idDisponibilidad: 0,
      enlace: "/api/disponibilidadporfacultad/",
      eventos: [],
      repeticion: 1,
      lugar: "",
      bandera: 0,
      modificar: 0,
      visible: 1,
      problemaBack: false,
      loading: true,
      diasAnticipacion: 0,
      facultad: this.props.facultad,
      alerta: {
        severity:"",
        mensaje: "",
        mensajeStrong: "",
        mostrar: false,
      },
    };
    this.actualizarMensaje = this.actualizarMensaje.bind(this);
  }

  async componentDidMount() {
    //console.log(this.state.tutor);
    let listaEventos = [];
    let listaDisponibilidad = await Conexion.GET({
      servicio: this.state.enlace + this.state.tutor.ID_USUARIO + "/" + this.state.facultad,
    });
    //console.log("disponibilidad", listaDisponibilidad);
    if (listaDisponibilidad) {
      if (!listaDisponibilidad.hasOwnProperty("error")) {
        await this.setState({ loading: false });
        for (let disp of listaDisponibilidad.data) {
          let evento = {
            title:
              disp.HORA_INICIO.substring(0, 5) +
              "-" +
              disp.HORA_FIN.substring(0, 5),
            start: new Date(disp.FECHA + " " + disp.HORA_INICIO),
            end: new Date(disp.FECHA + " " + disp.HORA_FIN),
            id: disp.ID_DISPONIBILIDAD,
            repeticion: 1,
            lugar: disp.LUGAR,
          };
          listaEventos.push(evento);
          this.setState({ problemaBack: false });
        }
        let politicas = await Conexion.GET({
          servicio: "/api/facultad/politicas/" + this.state.facultad,
        });
        //console.log("polit",politicas);
        if (politicas){
          this.setState({ diasAnticipacion: politicas.politicas.ANTICIPACION_DISPONIBILIDAD });
        }
        //console.log("veamossisale",this.state.diasAnticipacion);

      } else {
        this.setState({ problemaBack: true });
        let alerta = { ...this.state.alerta };
        alerta.mensaje = "Parece que algo anda mal";
        alerta.mensajeStrong = "actualice la página";
        this.setState({ alerta: alerta });
      }
    } else {
      this.setState({ problemaBack: true });
      let alerta = { ...this.state.alerta };
      alerta.mensaje = "Ocurrió un problema";
      alerta.mensajeStrong = "actualice la página";
      this.setState({ alerta: alerta });
    }
    this.setState({ eventos: listaEventos });
  }

  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.eventos != this.state.eventos) {
      return true;
    }
    if (nextState.bandera !== this.state.bandera) {
      return true;
    }
    return false;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.bandera !== prevState.bandera) {
      let listaEventos = [];
      let listaDisponibilidad = await Conexion.GET({
        servicio: this.state.enlace + this.state.tutor.ID_USUARIO + "/" + this.state.facultad,
      });
      //console.log("disponibilidad", listaDisponibilidad);
      if (listaDisponibilidad) {
        if (!listaDisponibilidad.hasOwnProperty("error")) {
          await this.setState({ loading: false });
          for (let disp of listaDisponibilidad.data) {
            let evento = {
              title:
                disp.HORA_INICIO.substring(0, 5) +
                "-" +
                disp.HORA_FIN.substring(0, 5),
              start: new Date(disp.FECHA + " " + disp.HORA_INICIO),
              end: new Date(disp.FECHA + " " + disp.HORA_FIN),
              id: disp.ID_DISPONIBILIDAD,
              repeticion: 1,
              lugar: disp.LUGAR,
            };
            listaEventos.push(evento);
            this.setState({ problemaBack: false });
          }
          let politicas = await Conexion.GET({
            servicio: "/api/facultad/politicas/" + this.state.facultad,
          });
          //console.log("polit",politicas);
          if (politicas){
            this.setState({ diasAnticipacion: politicas.politicas.ANTICIPACION_DISPONIBILIDAD });
          }
          //console.log("veamossisale",this.state.diasAnticipacion);
        } else {
          this.setState({ problemaBack: true });
          let alerta = { ...this.state.alerta };
          alerta.mensaje = "Parece que algo anda mal";
          alerta.mensajeStrong = "actualice la página";
          this.setState({ alerta: alerta });
        }
      } else {
        this.setState({ problemaBack: true });
        let alerta = { ...this.state.alerta };
        alerta.mensaje = "Parece que algo anda mal";
        alerta.mensajeStrong = "actualice la página";
        this.setState({ alerta: alerta });
      }
      this.setState({ eventos: listaEventos });
    }
  }

  handleSelectSlot = (slotInfo) => {
    //set model to true
    if(moment(slotInfo.start).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD")){  
      if(moment(slotInfo.start).format("YYYY-MM-DD") >= moment(new Date()).add(this.state.diasAnticipacion,"days").format("YYYY-MM-DD")){
        let alerta = { ...this.state.alerta };
        alerta.mostrar = false;
        this.setState({
          modalIsOpen: true,
          fechaMostrar: moment(slotInfo.start).format("dddd Do MMMM YYYY"),
          fecha: moment(slotInfo.start).format("YYYY-MM-DD"),
          horaInicio: moment(slotInfo.start).format("HH:mm"),
          horaFin: moment(slotInfo.end).format("HH:mm"),
          repeticion: 1,
          lugar: "",
          modificar: 0,
          visible: 1,
          alerta: alerta,
        });
      }else{
        this.setState({problema: true});
        let alerta = {...this.state.alerta};
        alerta.severity="warning";
        alerta.mostrar = true;
        alerta.mensaje = "Por politica de la facultad solo puede registrar/modificar su disponibilidad con mínimo "
        alerta.mensajeStrong = this.state.diasAnticipacion +(this.state.diasAnticipacion ===1?" día":" días") +" de anticipación"
        this.setState({alerta: alerta})
      }
    }else{
      this.setState({problema: true});
        let alerta = {...this.state.alerta};
        alerta.severity="error";
        alerta.mostrar = true;
        alerta.mensaje = "No puede registrar/modificar su disponibilidad en una fecha pasada"
        alerta.mensajeStrong = "Intente de nuevo"
        this.setState({alerta: alerta})
    }
  }

  handleSelectEvent = (event) => {
    //set model to true
    if(moment(event.start).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD")){  
      if(moment(event.start).format("YYYY-MM-DD") >= moment(new Date()).add(this.state.diasAnticipacion,"days").format("YYYY-MM-DD")){      
        let alerta = { ...this.state.alerta };
        alerta.mostrar = false;
        this.setState({
          modalIsOpen: true,
          fechaMostrar: moment(event.start).format("dddd Do MMMM YYYY"),
          fecha: moment(event.start).format("YYYY-MM-DD"),
          horaInicio: moment(event.start).format("HH:mm"),
          horaFin: moment(event.end).format("HH:mm"),
          idDisponibilidad: event.id,
          lugar: event.lugar,
          repeticion: event.repeticion,
          modificar: 1,
          visible: 0,
          alerta: alerta,
        });
      }else{
        this.setState({problema: true});
        let alerta = {...this.state.alerta};
        alerta.severity="warning";
        alerta.mostrar = true;
        alerta.mensaje = "Por politica de la facultad solo puede registrar/modificar su disponibilidad con mínimo "
        alerta.mensajeStrong = this.state.diasAnticipacion +(this.state.diasAnticipacion ===1?" día":" días") +" de anticipación"
        this.setState({alerta: alerta})
      }
    }else{
      this.setState({problema: true});
        let alerta = {...this.state.alerta};
        alerta.severity="error";
        alerta.mostrar = true;
        alerta.mensaje = "No puede registrar/modificar su disponibilidad en una fecha pasada"
        alerta.mensajeStrong = "Intente de nuevo"
        this.setState({alerta: alerta})
    } 
  };

  closeDialog = () => {
    // cerrar la ventana de registro/modificacion
    this.setState({
      modalIsOpen: false,
    });
  };

  actualizarBandera = () => {
    //para volver a jalar los datos de la base
    this.setState({ bandera: !this.state.bandera });
  };

  empezarCarga = () => {
    //aparece el simbolo de carga
    this.setState({ loading: true });
  };

  actualizarMensaje(mensaje, mensajeStrong) {
    //console.log(mensaje);
    this.setState({
      alerta: { mensaje: mensaje, mensajeStrong: mensajeStrong, mostrar: true },
    });
  }

  activarVisibilidad = () => {
    this.setState({ visible: 1 });
  };

  setAlerta = (alerta) => {
    this.setState({alerta:alerta})
  }

  renderModal = () => {
    if (!this.state.modalIsOpen) return;
    return (
      <div>
        <Dialogo
          datos={this.state}
          closeDialog={this.closeDialog}
          actualizarBandera={this.actualizarBandera}
          activarVisibilidad={this.activarVisibilidad}
          empezarCarga={this.empezarCarga}
          actualizarMensaje={(mensaje, mensajeStrong) =>
            this.actualizarMensaje(mensaje, mensajeStrong)
          }
          closeOnDocumentClick
        />
      </div>
    );
  };
  render() {
    return (
      <div style={{ height: `${410}px`, width: `${850}px` }} className="Big-calendar-container">
        {/*console.log("mostrar",this.state.alerta.mostrar)*/}
        {this.state.alerta.mostrar && (
          <Alertas
            severity={this.state.alerta.severity}
            titulo={"Observacion"}
            alerta={this.state.alerta}
          />
        )}
        {/*console.log("back",this.state.alerta.problemaBack)*/}
        {this.state.problemaBack && (
          <Alertas
            severity={"warning"}
            titulo={"Observacion"}
            alerta={this.state.alerta}
          />
        )}
        {/*console.log("mostrar",this.state.alerta.mostrar)*/}
        {this.state.loading && (
          <CircularProgress color="primary" style={style.carga} />
        )}
        <Calendar
          popup={true}
          localizer={localizer}
          events={this.state.eventos}
          views={["month", "week"]}
          min={new Date(0, 0, 0, 8, 0, 0)}
          max={new Date(0, 0, 0, 20, 0, 0)}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectEvent={(event) => this.handleSelectEvent(event)}
          onSelectSlot={(slotInfo) => this.handleSelectSlot(slotInfo)}
          messages={{
            next: "Sig",
            previous: "Ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            showMore: () => "Ver más",
          }}
        />
        {this.renderModal()}
      </div>
    );
  }
}

export default EventsCalendar;
