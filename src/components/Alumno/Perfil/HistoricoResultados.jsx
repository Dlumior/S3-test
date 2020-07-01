import React, { Component } from "react";
import { GET } from "./.././../../Conexion/Controller";
import MaterialTable from "material-table";
import { dateFnsLocalizer } from "react-big-calendar";
class HistoricoResultados extends Component {
  constructor() {
    super();
    this.state = {
      title: `Resultados historicos de alumno al ${new Date().toISOString().split("T")[0]}`,
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Nro", field: "nro" },
          { title: "Fecha", field: "fecha" },
          { title: "Tutor", field: "tutor" },
          { title: "Motivo", field: "motivo" },
          { title: "Resultado", field: "resultado" },
        ],
        data: [
          {
            nro: 1,
            fecha: "25/06/2021",
            motivo: "Academico",
            tutor: "YOPS",
            resultado: "Odia a los hooks",
          },
          {
            nro: 2,
            fecha: "26/06/2021",
            motivo: "Academico",
            tutor: "YOPS",
            resultado: "Sacara 40 en la PC2 de CGI",
          },
          {
            nro: 3,
            fecha: "27/06/2021",
            motivo: "Psicopedagogico",
            tutor: "YOPS",
            resultado: "saco 39 de 20 puntos en la PC2",
          },
          {
            nro: 4,
            fecha: "28/06/2021",
            motivo: "Personal",
            tutor: "YOPS",
            resultado: "Esta siendo atendido por la DAES",
          },
          {
            nro: 5,
            fecha: "28/06/2021",
            motivo: "Academico",
            resultado:
              "react classes  much better than hooks and you know it  ",
          },
          {
            nro: 6,
            fecha: "28/06/2021",
            motivo: "Academico",
            tutor: "YOPS",
            resultado: "Tengo sueñoooooooooooo",
          },
          {
            nro: 7,
            fecha: "28/06/2021",
            motivo: "Academico",
            tutor: "YOPS",
            resultado: "Las fotos son la travesura menor",
          },
          {
            nro: 8,
            fecha: "28/06/2021",
            motivo: "Academico",
            tutor: "YOPS",
            resultado: "Asistio a las asesorias",
          },
          {
            nro: 9,
            fecha: "28/06/2021",
            motivo: "Academico",
            tutor: "YOPS",
            resultado: "El sprint 4 estare de vacaciones XDDD",
          },
          {
            nro: 10,
            fecha: "29/06/2021",
            motivo: "Academico",
            resultado:
              "La expo de pruebas funcionales es un Mito (Gabriel, 2020)",
          },
          {
            nro: 11,
            fecha: "30/06/2021",
            motivo: "Academico",
            resultado:
              "Se dedicara a CGI y a mejorar la travesura de lo suploads",
          },
          {
            nro: 12,
            fecha: "01/07/2021",
            motivo: "SSJ",
            tutor: "YOPS",
            resultado: "KAMEEEEEE...",
          },
          {
            nro: 12,
            fecha: "01/07/2021",
            motivo: "SSJ",
            tutor: "YOPS",
            resultado: "HAMEEEEEE...",
          },
          {
            nro: 12,
            fecha: "01/07/2021",
            motivo: "SSJ",
            tutor: "YOPS",
            resultado: ".......",
          },
          {
            nro: 12,
            fecha: "01/07/2021",
            motivo: "SSJ",
            tutor: "YOPS",
            resultado: "HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA !",
          },
        ],
      },
    };
  }
  async componentDidMount() {
    if (this.props.servicio || !this.props.servicio?.length === 0) {
      //en teoria el resultado ya incluye l id de alumno y proceso, yo recibo el id listo
      const listaResultados = await GET({ servicio: this.props.servicio });
      if (!listaResultados && !listaResultados.error) {
        // si no es null y no hubo error al recibir la data
        // debo hacer un parse para la material table
        // ya tengo los header (column), sollo falta la data
        let listaDataTabla = [];
        listaResultados.listaResultados.forEach((resultado, indice) => {
          listaDataTabla.push({
            nro: indice,
            fecha: resultado.FECHA,
            motivo: resultado.MOTIVO,
            resultado: resultado.RESULTADO,
          });
        });
        //terminando el bucle cambio el estado
        this.setState({
          datosTabla: {
            data: listaDataTabla,
            columns: this.state.datosTablaOffline.columns,
          },
        });
      }
    } else {
      //estamos en modo offline XD
      this.setState({
        datosTabla: this.state.datosTablaOffline,
      });
    }
  }
  renderTabla(datosNuevos) {
    if (datosNuevos !== this.state.datosNuevos) {
      //asegurarme de no renderizar si no vale la pena
      return (
        <MaterialTable
          columns={this.state.datosTabla.columns}
          data={this.state.datosTabla.data}
          options={{
            //selection: true,
            rowStyle: {
              backgroundColor: "#FFF",
            },
            headerStyle: {
              backgroundColor: "#3AAFA9",
              color: "#ffffff",
              fontSize: 14,
            },
          }}
          title={this.state.title}
          //ya que estas aqui, si me pasas el nombre del alumno como props estaria super xd
          // lo de pasar a español si te lo dejo de tarea XDDDDD
        />
      );
    }
  }
  render() {
    return <div>{this.renderTabla(this.state.datosTabla)}</div>;
  }
}

export default HistoricoResultados;
