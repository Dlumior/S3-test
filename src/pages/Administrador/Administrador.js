import React from "react";

import BarraNavegacion from "../../components/Administrador/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Facultades from "./Facultades.js";

const Administrador = () => {
  return (
    <div>
      <BarraNavegacion contenido={<Facultades />} />
    </div>
  );
};

export default Administrador;
