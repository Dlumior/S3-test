import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormRegistroAlumno/FormularioRegistrarAlumno";
import FormularioImportarAlumnos from "../../components/Coordinador/FormRegistroAlumno/FormularioImportarAlumnos";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import ListadoDeAlumnos from "../../components/Coordinador/FormRegistroAlumno/ListadoDeAlumnos";
import InformacionRelevante from "../../components/Coordinador/FormRegistroAlumno/InformacionRelevante";

const titulo = "Registro de nuevos Alumnos";
class RegistrarAlumno extends React.Component {
  constructor() {
    super();
    this.state = {
      procesos: [
        {
          index: 0,
          titulo: "Registrar Alumno",
          proceso: FormularioRegistrarAlumno,
        },
        {
          index: 1,
          titulo: "Importar Alumnos",
          proceso: FormularioImportarAlumnos,
          paper: false,
        },
        { index: 2, titulo: "Listado de Alumnos", proceso: ListadoDeAlumnos },
        {
          index: 3,
          titulo: "Informacion historica",
          proceso: InformacionRelevante,
          paper: false,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <NombrePrincipal titulo={titulo} />
        <TabProceso procesos={this.state.procesos} paper={true} />
      </div>
    );
  }
}

export default RegistrarAlumno;
