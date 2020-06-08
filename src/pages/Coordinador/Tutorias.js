import React from "react";

import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import FormNuevaTutoria from "../../components/Coordinador/Tutorias/FormNuevaTutoria";
import ListaTutorias from "../../components/Coordinador/Tutorias/ListaTutorias";
import FormularioNuevaTutoria from "../../components/Coordinador/Tutorias/FormularioNuevaTutoria";

const titulo = "Procesos de Tutoría";
class Tutorias extends React.Component {
  constructor() {
    super();
    this.state = {
      procesos: [
        {
          index: 0,
          titulo: "Registrar Nueva Tutoria",
          proceso: FormularioNuevaTutoria,
        },

        { index: 1, titulo: "Lista Tutorías", proceso: ListaTutorias },
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

export default Tutorias;
