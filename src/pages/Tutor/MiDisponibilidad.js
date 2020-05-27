import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import Scroller from "../../components/Tutor/RegistrarDisponibilidad/Scroller";
import VistaMes from "../../components/Tutor/RegistrarDisponibilidad/VistaMes";

const MiDisponibilidad = () => {
  return (
    <div>
      <NombrePrincipal titulo="Registro de mi Disponibilidad" />
      <Scroller />
      <VistaMes />
    </div>
  );
};

export default MiDisponibilidad;
