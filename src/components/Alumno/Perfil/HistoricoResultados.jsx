import React, { Component } from "react";
import { GET } from "./.././../../Conexion/Controller";
import MaterialTable from "material-table";
import { dateFnsLocalizer } from "react-big-calendar";
class HistoricoResultados extends Component {
  constructor() {
    super();
    this.state = {
      alumno: {},
      title1: "Resultados historicos del alumno",
      title2: `al ${new Date().toISOString().split("T")[0]}`,
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Nro", field: "nro" },
          { title: "Fecha", field: "fecha" },
          { title: "Tutor", field: "tutor" },
          { title: "Motivo", field: "motivo" },
          { title: "Compromisos", field: "compromisos" },
          { title: "Resultado", field: "resultado" },
        ],
        data: [
          // {
          //   nro: 1,
          //   fecha: "25/06/2021",
          //   motivo: "Academico",
          //   tutor: "YOPS",
          //   resultado: "Odia a los hooks",
          // },
          // {
          //   nro: 2,
          //   fecha: "26/06/2021",
          //   motivo: "Academico",
          //   tutor: "YOPS",
          //   resultado: "Sacara 40 en la PC2 de CGI",
          // },
          // {
          //   nro: 3,
          //   fecha: "27/06/2021",
          //   motivo: "Psicopedagogico",
          //   tutor: "YOPS",
          //   resultado: "saco 39 de 20 puntos en la PC2",
          // },
          // {
          //   nro: 4,
          //   fecha: "28/06/2021",
          //   motivo: "Personal",
          //   tutor: "YOPS",
          //   resultado: "Esta siendo atendido por la DAES",
          // },
          // {
          //   nro: 5,
          //   fecha: "28/06/2021",
          //   motivo: "Academico",
          //   resultado:
          //     "react classes  much better than hooks and you know it  ",
          // },
          // {
          //   nro: 6,
          //   fecha: "28/06/2021",
          //   motivo: "Academico",
          //   tutor: "YOPS",
          //   resultado: "Tengo sueñoooooooooooo",
          // },
          // {
          //   nro: 7,
          //   fecha: "28/06/2021",
          //   motivo: "Academico",
          //   tutor: "YOPS",
          //   resultado: "Las fotos son la travesura menor",
          // },
          // {
          //   nro: 8,
          //   fecha: "28/06/2021",
          //   motivo: "Academico",
          //   tutor: "YOPS",
          //   resultado: "Asistio a las asesorias",
          // },
          // {
          //   nro: 9,
          //   fecha: "28/06/2021",
          //   motivo: "Academico",
          //   tutor: "YOPS",
          //   resultado: "El sprint 4 estare de vacaciones XDDD",
          // },
          // {
          //   nro: 10,
          //   fecha: "29/06/2021",
          //   motivo: "Academico",
          //   resultado:
          //     "La expo de pruebas funcionales es un Mito (Gabriel, 2020)",
          // },
          // {
          //   nro: 11,
          //   fecha: "30/06/2021",
          //   motivo: "Academico",
          //   resultado:
          //     "Se dedicara a CGI y a mejorar la travesura de lo suploads",
          // },
          // {
          //   nro: 12,
          //   fecha: "01/07/2021",
          //   motivo: "SSJ",
          //   tutor: "YOPS",
          //   resultado: "KAMEEEEEE...",
          // },
          // {
          //   nro: 12,
          //   fecha: "01/07/2021",
          //   motivo: "SSJ",
          //   tutor: "YOPS",
          //   resultado: "HAMEEEEEE...",
          // },
          // {
          //   nro: 12,
          //   fecha: "01/07/2021",
          //   motivo: "SSJ",
          //   tutor: "YOPS",
          //   resultado: ".......",
          // },
          // {
          //   nro: 12,
          //   fecha: "01/07/2021",
          //   motivo: "SSJ",
          //   tutor: "YOPS",
          //   resultado: "HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA !",
          // },
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
  /*
COMPROMISOs: (2) […]
​​
0: {…}
​​​
DESCRIPCION: "aprobar pc3"
​​​
ESTADO: 0
​​​
ID_COMPROMISO: 37
​​​
ID_SESION: 87
​​​
<prototype>: Object { … }
​​
1: Object { ID_COMPROMISO: 38, ID_SESION: 87, DESCRIPCION: "examen parcial 18", … }
​​
length: 2
****************

  DESCRIPCION: "F"
​
ESTADO: "01-realizada_sin_cita"
​
FECHA: "2019-06-12"
​
HORA_FIN: "14:00:00"
​
HORA_INICIO: "13:00:00"
​
ID_PROCESO_TUTORIA: 41
​
ID_SESION: 87
​
ID_TUTOR: 271
​
LUGAR: "V777"
​
MOTIVO: "Expulsión"
​
RAZON_MANTENIMIENTO: null
​
RESULTADO: "El estudiante será eliminado"


tutor:
TUTOR: {…}
​​
ID_TUTOR: 271
​​
USUARIO: {…}
​​​
APELLIDOS: "Alegre"
​​​
CODIGO: "321357456"
​​​
CONTRASENHA: "$2b$10$c5YbMyx6yju9U7L9PrhLZuPTa/IT6/7s8u/H1eVFmrBy4p4JR4Jne"
​​​
CORREO: "mag.alegre@pucp.edu.pe"
​​​
DIRECCION: "av test2"
​​​
ID_USUARIO: 271
​​​
IMAGEN: Object { type: "Buffer", data: [] }
​​​
NOMBRE: "Maguito"
​​​
TELEFONO: "132456"
​​​
USUARIO: "mag.alegre@pucp.edu.pe"
   */
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
            const { FECHA, TUTOR, MOTIVO, COMPROMISOs, RESULTADO } = sesion;
            const { NOMBRE, APELLIDOS } = TUTOR.USUARIO;
            console.log("HAAA", COMPROMISOs);
            await resultados.push({
              nro: index,
              fecha: FECHA,
              tutor: `${NOMBRE} ${APELLIDOS}`,
              motivo: MOTIVO,
              compromisos: (
                <ol>
                  {COMPROMISOs.map((compromiso) => (
                    <li>{compromiso.DESCRIPCION}</li>
                  ))}
                </ol>
              ),
              resultado: RESULTADO,
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
          title={`${this.state.title1} ${this.state.alumno?.fullname}, ${this.state.title2}`}
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
