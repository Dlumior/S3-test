import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormRegistroAlumno/FormularioRegistrarAlumno";
import FormularioImportarAlumnos from "../../components/Coordinador/FormRegistroAlumno/FormularioImportarAlumnos";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import ListadoDeAlumnos from "../../components/Coordinador/FormRegistroAlumno/ListadoDeAlumnos";
import InformacionRelevante from "../../components/Coordinador/FormRegistroAlumno/InformacionRelevante";
import { getUser } from "../../Sesion/Sesion";
import ListaAlumnos from "../../components/Coordinador/ListaAlumnos/ListaAlumnos";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

const titulo = "Registro de nuevos Alumnos";
class RegistrarAlumno extends React.Component {
  constructor() {
    super();
    this.state = {
      procesos: [
        {
          index: 0,
          titulo: "Alumnos",
          proceso: () => (
            <ListaAlumnos
              prog={getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs}
              idPrograma={
                getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA
              }
              ruta={this.props.history.location.pathname}
            />
          ),
        },
        {
          index: 1,
          titulo: "Importar Alumnos",
          proceso: FormularioImportarAlumnos,
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

export default compose(withRouter)(RegistrarAlumno);
