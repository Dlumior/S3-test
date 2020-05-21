import React from "react";

// import Tabla from "../../components/Administrador/Tabla";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TablaCoordinador from "../../components/Administrador/TablaCoordinador";
import RegistrarCoordinador from "../../components/Administrador/RegistrarCoordinador";

const Coordinador = () => {
  return (
    <div>
      <NombrePrincipal titulo="Coordinadores" />

      <TablaCoordinador titulo="Coordinadores" />

      <RegistrarCoordinador/>

    </div>
  );
};

export default Coordinador;
