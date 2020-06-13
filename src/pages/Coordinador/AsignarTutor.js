import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmAsignacionTutor from "../../components/Coordinador/FormAsignacion/FrmAsignacionTutor";

const AsignarTutor = () => {
  return (
    <div>
      <NombrePrincipal titulo="Asignación de Tutor" />
      <FrmAsignacionTutor />
    </div>
  );
};

export default AsignarTutor;
