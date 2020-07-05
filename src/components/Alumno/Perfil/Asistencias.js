import React, { Component } from "react";
import { GET } from "./.././../../Conexion/Controller";
import MaterialTable from "material-table";
import { dateFnsLocalizer } from "react-big-calendar";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
class Asistencias extends Component {
  constructor() {
    super();
    this.state = {
      alumno: {},
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Tutor", field: "tutor" },
          { title: "Tutoria", field: "tutoria" },
          { title: "Fecha", field: "fecha" },          
          { title: "Hora Inicio/Fin", field: "hora" },
          { title: "Asistencia", field: "asistencia" },
        ],
        data: [
          
        ],
      },
    };
  }
  obtenerSesionesXProceso = async (idPprocesoTutoria) => {
    const { idAlumno } = this.state.alumno;

    const listaProcesos = await GET({
      servicio: `/api/listaSesionAlumnoProcesoTutoria/${idAlumno}/${idPprocesoTutoria}`,
    });
    console.log("GOT: ", listaProcesos);
    return listaProcesos;
  };
 
  async componentDidMount() {
    // si recibo los props como {idAlumno: ID_USUARIO, fullname: NOMBRE}
    // entonces todo OK y sera totalmente reutilizable
    const { idAlumno, fullname } = this.props.datosAlumno;
    if (!idAlumno || !fullname) {
      //sino BAIS!
      return;
    } else {
      console.log("Recibi this.props.datosAlumno;: ", this.props.datosAlumno);
      const ALUMNO = await GET({ servicio: `/api/alumno/${idAlumno}` });
      console.log("Recibi ALUMNO: ", ALUMNO);
      let idPrograma = 0;
      if (ALUMNO.alumno) {
        idPrograma = ALUMNO.alumno.USUARIO.PROGRAMAs[0].ID_PROGRAMA;
      } else {
        //SIn alumno, BAIS
        return;
      }
      const alumno = {
        idAlumno: idAlumno,
        fullname: fullname,
        idPrograma: idPrograma,
      };
      this.setState({ alumno });
      console.log("Recibi alumno: ", alumno);
      const listaTutorias = await GET({
        servicio: `/api/tutoria/lista/${idPrograma}`,
      });
      console.log("Recibi listaTutorias: ", listaTutorias);

      //con las tutorias de su programa puedo chequear en cuales tiene sesiones
      if (!listaTutorias.tutoria[0]) {
        return;
      }
      console.log(
        "Recibi listaTutorias.tutoria[0]: ",
        listaTutorias.tutoria[0]
      );

      let resultados = [];
      let index = 0;
      await listaTutorias.tutoria.forEach(async (tutoria) => {
        const { ID_PROCESO_TUTORIA } = tutoria;
        const listaResultados = await this.obtenerSesionesXProceso(
          ID_PROCESO_TUTORIA
        );
        console.log("Recibi listaResultados: ", listaResultados.sesiones);
        if (listaResultados.sesiones != []) {
          const { sesiones } = listaResultados;
          await sesiones.forEach(async (sesion) => {
            index++;
            const { FECHA, TUTOR, PROCESO_TUTORIum, COMPROMISOs, ALUMNO_X_SESIONs,HORA_INICIO,HORA_FIN } = sesion;
            const { NOMBRE, APELLIDOS } = TUTOR.USUARIO;
            console.log("HAAA", COMPROMISOs);
            await resultados.push({
              fecha: FECHA,
              tutor: `${NOMBRE} ${APELLIDOS}`,
              hora: HORA_INICIO.length>5? 
                HORA_INICIO.slice(0,-3)+"/"+ HORA_FIN.slice(0,-3):
                HORA_INICIO+"/"+ HORA_FIN,
              tutoria: PROCESO_TUTORIum.NOMBRE,
              asistencia: 
                    <div>
                        {ALUMNO_X_SESIONs[0].ASISTENCIA_ALUMNO>0?
                        <CheckCircleRoundedIcon color="primary" fontSize="large"/>:
                        <CancelRoundedIcon color="error" fontSize="large"/>}
                    </div>
            });
            this.setState({
              datosTabla: {
                data: resultados,
                columns: this.state.datosTablaOffline.columns,
              },
            });
            //console.log("**Recibi sesion : ", resultados);
          });
        }
      });

      console.log("**Recibi resultados: ", resultados);

      //return;
      //en teoria el resultado ya incluye l id de alumno y proceso, yo recibo el id listo
      //const listaTutorias = await GET({servicio:"/api/tutoria"});
      //for each proceso......
    }
  }
  renderTabla(datosNuevos) {
    console.log("***", datosNuevos);
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
          title={""}
          // lo de pasar a español si te lo dejo de tarea XDDDDD
        />
      );
    }
  }
  render() {
    return <div>{this.renderTabla(this.state.datosTabla)}</div>;
  }
}

export default Asistencias;
