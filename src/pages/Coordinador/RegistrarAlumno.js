import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormRegistroAlumno/FormularioRegistrarAlumno";
import FormularioImportarAlumnos from "../../components/Coordinador/FormRegistroAlumno/FormularioImportarAlumnos";


const titulo = "Registro de nuevos Alumnos";
class RegistrarAlumno extends React.Component {
  constructor() {
    super();
    this.state = {
      procesos: [
        { index:0,titulo: "Ingresar Alumnos", proceso:FormularioRegistrarAlumno },
        { index:1,titulo: "Importar Alumnos", proceso: FormularioImportarAlumnos },
      ],
    };
  }
  render() {
    return (
      <div>
        <NombrePrincipal titulo={titulo} />
        <TabProceso procesos={this.state.procesos} />
      </div>
    );
  }
}

export default RegistrarAlumno;

