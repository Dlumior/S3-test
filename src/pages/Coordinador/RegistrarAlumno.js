import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormRegistroAlumno/FormularioRegistrarAlumno";
import FormularioImportarAlumnos from "../../components/Coordinador/FormRegistroAlumno/FormularioImportarAlumnos";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import ListadoDeAlumnos from "../../components/Coordinador/FormRegistroAlumno/ListadoDeAlumnos";
import InformacionRelevante from "../../components/Coordinador/FormRegistroAlumno/InformacionRelevante";
import { getUser } from "../../Sesion/Sesion";
import ListaAlumnos from "../../components/Coordinador/ListaAlumnos/ListaAlumnos";

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
        {
          index: 2,
          titulo: "Listado de Alumnos",
          proceso: () => (
            <ListaAlumnos
              prog={getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs}
              idPrograma={
                getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA
              }
            />
          ),
        },
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
