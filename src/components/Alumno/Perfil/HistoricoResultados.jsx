import React, { Component } from "react";
import { GET } from "./.././../../Conexion/Controller";
import JMaterialTableSpanishSSJ from "jinssj-mat-table-spanish-noeditable";
//import MaterialTable from "material-table";
import { dateFnsLocalizer } from "react-big-calendar";
class HistoricoResultados extends Component {
  constructor() {
    super();
    this.state = {
      alumno: {},
      title1: "Resultados historicos",
      title2: `al ${new Date().toISOString().split("T")[0]}`,
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Fecha", field: "fecha" },
          { title: "Tutor", field: "tutor" },
          { title: "Proceso de Tutoria", field: "proceso" },
          { title: "Motivo", field: "motivo" },
          { title: "Resultado", field: "resultado" },
        ],
        data: [
          
        ],
      },
    };
  }
  
  async componentDidMount() {
    // si recibo los props como {idAlumno: ID_USUARIO, fullname: NOMBRE}
    // entonces todo OK y sera totalmente reutilizable
    const { idAlumno, fullname } = this.props.datosAlumno;
    if (!idAlumno || !fullname) {
      //sino BAIS!
      return;
    } else {
      const listaSesiones = await GET({
        servicio: "/api/listaSesionAlumno/"+idAlumno,
      });
      //console.log("sesioness",listaSesiones);
      //console.log("sesioness",idAlumno);

      let resultados=[];
      if (listaSesiones){
        for (let e of listaSesiones.data){
          //console.log("resultadoss",e.ALUMNOs);
          await resultados.push({
            fecha: e.FECHA,
            tutor: `${e.TUTOR.USUARIO.NOMBRE} ${e.TUTOR.USUARIO.APELLIDOS}`,
            motivo: e.MOTIVO,
            proceso:e.PROCESO_TUTORIum.NOMBRE,
            resultado: e.ALUMNOs[0].ALUMNO_X_SESION.RESULTADO,
          });
        }
        this.setState({
          datosTabla: {
            data: resultados,
            columns: this.state.datosTablaOffline.columns,
          },
        });
      }
      
    }
  }
  renderTabla(datosNuevos) {
    //console.log("***", datosNuevos);
    if (datosNuevos !== this.state.datosNuevos) {
      //asegurarme de no renderizar si no vale la pena
      return (
        <>
        <JMaterialTableSpanishSSJ
            columns={this.state.datosTabla.columns}
            data={this.state.datosTabla.data}
            title={`${this.state.title1} ${this.state.title2}`}
            exportar
          />
          {
            /**
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
          title={`${this.state.title1} ${this.state.title2}`}
          // lo de pasar a español si te lo dejo de tarea XDDDDD
        />

             */
          }
        
        </>
      );
    }
  }
  render() {
    return <div>{this.renderTabla(this.state.datosTabla)}</div>;
  }
}

export default HistoricoResultados;
