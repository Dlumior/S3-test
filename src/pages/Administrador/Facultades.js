import React from "react";

import Tabla from "../../components/Administrador/Tabla";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";

const Facultades = () => {
  return (
    <div>
      <NombrePrincipal titulo="Facultades" />
      <Tabla />
    </div>
  );
};

export default Facultades;
