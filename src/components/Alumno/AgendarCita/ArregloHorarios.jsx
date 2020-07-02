import React, { Component } from "react";
import DisponibilidadCard from "./DisponibilidadCard";
import { GET, POST } from "../../../Conexion/Controller";
import { Paper } from "@material-ui/core";
import SesionesCard from "../../Tutor/Sesiones/SesionesCard";
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
  }
  renderHorarios = (horarios) => {
    console.log("***/ ", horarios);
    if (!horarios) {
      return;
    }
    if (horarios.data) {
      return (
        <div>
          {horarios.data.map((element, i) =>
            this.props.tipo === "disponibilidad" ? (
              <DisponibilidadCard
                disponibilidad={element}
                fexaForm={this.props.fexaForm}
                idPro={this.props.idPro}
              />
            ) : (
              <SesionesCard cita={element} />
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
    console.log("POKEEEEEEMON ", this.props.servicio);
    if (!this.props.servicio) {
      console.log("no habia servico");
      return;
    }
    const servicio = this.props.servicio;

    let horarios = await GET({ servicio: servicio });
    await this.setState({ horarios: horarios });
    console.log("POKEMON GO: ", horarios);
  }
  /** NADIE TQUE AQUI O ELMO LOS BUSCARA
   * PORQUE SABE DONDE VIVEN
   *
   * MUAJAJAJAJJAJAJAJAJJAJAJA
   */
  async componentWillReceiveProps(nextProps) {
    
    if (nextProps.servicio !== this.props.servicio) {
      let horarios = await GET({ servicio: nextProps.servicio });
      
      this.setState({ horarios: horarios });
    }
    if (nextProps.filtroTutores !== this.props.filtroTutores) {
      console.log("RIP n=>", nextProps.servicio);
      console.log("RIP p=>", this.props.servicio);
      await this.setState({ filtroTutores: nextProps.filtroTutores });
      console.log(
        "filtro holiiisss.... aha ha ha ha haaa",
        this.state.filtroTutores
      );

      if (this.state.filtroTutores === []) {
        console.log("filtro vacio holiiisss.... aha ha ha ha haaa");
        let horarios = await GET({ servicio: this.props.servicio });
        this.setState({ horarios: horarios });
      } else {
        console.log(
          "filtro no vacio holiiisss.... aha ha ha ha haaa",
          this.state.filtroTutores
        );

        let horarios = await POST({
          servicio: this.props.servicio,
          request: { tutores: { tutores: this.props.filtroTutores } },
        });
        console.log("horarios ",horarios);
        await this.setState({ horarios: horarios });
      }
    }
  }

  render() {
    return <>{this.renderHorarios(this.state.horarios)}</>;
  }
}
export default ArregloHorarios;
