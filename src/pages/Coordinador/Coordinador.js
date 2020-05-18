import React from "react";

import BarraNavegacion from "../../components/Coordinador/BarraNavegacion.js";
import Perfil from "./Perfil.js";*/

const Coordinador = () => {
  return (
    <div>
      {/* <RegistrarCoordinador /> */}
      <BarraNavegacion contenido={<Perfil />} />
    </div>
  );
};

export default Coordinador;
