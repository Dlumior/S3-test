import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import Scroller from "../../components/Tutor/RegistrarDisponibilidad/Scroller";
import VistaMes from "../../components/Tutor/RegistrarDisponibilidad/VistaMes";
import EventsCalendar from "../../components/Tutor/RegistrarDisponibilidad/EventsCalendar";

const MiDisponibilidad = () => {
  return (
    <div>
      <NombrePrincipal titulo="Registrar Disponibilidad" />
      {/* <Scroller /> */}
      <VistaMes />       
    </div>
  );
};

export default MiDisponibilidad;
