import React, { Component } from "react";
import DisponibilidadCard from "./DisponibilidadCard";
import { GET, POST } from "../../../Conexion/Controller";
import { Paper } from "@material-ui/core";
import SesionesCard from "../../Tutor/Sesiones/SesionesCard";
import Jloading from "../../Coordinador/FormRegistroAlumno/Jloading";
const estilos = {
  centerizable: {
    textAlign: "center",
  },
};
class ArregloHorarios extends Component {
  constructor() {
    super();
    this.state = {
      horarios: [],
      filtroTutores: [],
    };
    this.renderHorarios = this.renderHorarios.bind(this);
    this.refreshCalendarioCitas = this.refreshCalendarioCitas.bind(this);
  }
  async refreshCalendarioCitas(_servicio, _filtroTutores) {
    this.setState({ horarios: [] });
    if (_servicio) {
      let horarios = await GET({ servicio: _servicio });

      this.setState({ horarios: horarios });
    } else if (_filtroTutores) {
      await this.setState({ filtroTutores: _filtroTutores });
      /*console.log(
        "filtro holiiisss.... aha ha ha ha haaa",
        this.state.filtroTutores
      );*/

      if (this.state.filtroTutores === []) {
        //console.log("filtro vacio holiiisss.... aha ha ha ha haaa");
        let horarios = await GET({ servicio: this.props.servicio });
        this.setState({ horarios: horarios });
      } else {
        /*console.log(
          "filtro no vacio holiiisss.... aha ha ha ha haaa",
          this.state.filtroTutores
        );*/

        let horarios = await POST({
          servicio: this.props.servicio,
          request: { tutores: { tutores: this.props.filtroTutores } },
        });
        //console.log("horarios ",horarios);
        await this.setState({ horarios: horarios });
      }
    } else {
      //caso inicial
      let horarios = await GET({ servicio: this.props.servicio });
      await this.setState({ horarios: horarios });
    }
  }
  renderHorarios = (horarios) => {
    //console.log("***/ ", horarios);
    if (!horarios) {
      return;
    }
    if (horarios.data) {
      return (
        <div>
          {horarios.data.map((element, i) =>
            this.props.tipo === "disponibilidad" ? (
              <DisponibilidadCard
                refreshCalendarioCitas={this.refreshCalendarioCitas}
                disponibilidad={element}
                fexaForm={this.props.fexaForm}
                idPro={this.props.idPro}
                duracionPro={this.props.duracionPro}
                diseibol={this.props.diseibol}
              />
            ) : (
              <SesionesCard
                cita={element}
                refreshCalendarioCitas={this.refreshCalendarioCitas}
              />
            )
          )}
          {horarios.data.length === 0 ? (
            <Paper>
              <p style={estilos.centerizable}>Aun no hay horarios</p>
            </Paper>
          ) : (
            <></>
          )}
        </div>
      );
    }
  };
  async componentDidMount() {
    //console.log("POKEEEEEEMON ", this.props.servicio);
    if (!this.props.servicio) {
      //console.log("no habia servico");
      return;
    }
    this.refreshCalendarioCitas(undefined, undefined);
    //console.log("POKEMON GO: ", horarios);
  }
  /** NADIE TQUE AQUI O ELMO LOS BUSCARA
   * PORQUE SABE DONDE VIVEN
   *
   * MUAJAJAJAJJAJAJAJAJJAJAJA
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps.servicio !== this.props.servicio) {
      this.refreshCalendarioCitas(nextProps.servicio, undefined);
    }

    if (nextProps.filtroTutores !== this.props.filtroTutores) {
      //console.log("RIP n=>", nextProps.servicio);
      //console.log("RIP p=>", this.props.servicio);
      this.refreshCalendarioCitas(undefined, nextProps.filtroTutores);
    }
  }

  render() {
    //vacio y sin servicio (aun no llega)
    if (this.state.horarios.data) {
      return <>{this.renderHorarios(this.state.horarios)}</>;
    } else {
      return <Jloading mensaje={"Cargando Tutorias"} size={"lg"} base />;
    }
  }
}
export default ArregloHorarios;
