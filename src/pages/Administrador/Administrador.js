import React from "react";

import RegistrarAdministrador from "../../components/Administrador/RegistrarCoordinador.js";
import BarraNavegacion from "../../components/Administrador/BarraNavegacion.js";
import Perfil from "./Perfil.js";

const Administrador = () => {
  return (
    <div>
      {/* <RegistrarAdministrador /> */}
      <BarraNavegacion contenido={<Perfil />} />
    </div>
  );
};

export default Administrador;
